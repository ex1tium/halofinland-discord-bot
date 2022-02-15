import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ETwitterStreamEvent,
  TweetStream,
  TweetV2,
  TweetV2SingleResult,
  TwitterApi,
  TwitterApiv2,
  UserV2,
  UserV2Result,
} from 'twitter-api-v2';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { PrismaService } from './prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiscordClientProvider } from '@discord-nestjs/core';
import { TextChannel, MessageEmbed } from 'discord.js';
import { format } from 'date-fns';

@Injectable()
export class TwitterService {
  private readonly _logger = new Logger(TwitterService.name);
  private _client: TwitterApi;

  private _haloSupportTweets: BehaviorSubject<TweetV2[]> = new BehaviorSubject(
    null,
  );

  private _twitterAllowedSearchAuthorIds: string[] = [];
  private _twitterUsers: UserV2[] = [];

  /**
   * It creates a new instance of the TwitterApi class.
   * @param {ConfigService} _configService - ConfigService
   * @param {PrismaService} _prismaService - The PrismaService is used to interact with the database.
   * @param {DiscordClientProvider} _discordProvider - DiscordClientProvider
   */
  constructor(
    private _configService: ConfigService,
    private _prismaService: PrismaService,
    private _discordProvider: DiscordClientProvider,
  ) {
    this._twitterAllowedSearchAuthorIds = this._configService
      .get('twitterAllowedSearchAuthorIds')
      .split(', ');

    // console.debug('twitterAllowedSearchAuthorIds', this.twitterAllowedSearchAuthorIds)

    this._client = new TwitterApi(
      this._configService.get('twitterBearerToken'),
    );

    // this._logger.debug(`twitter client:  ${JSON.stringify(this._client)}`);
  }

  /**
   * It searches for users with the given IDs and returns them.
   * @returns The twitter users.
   */
  async init() {
    try {
      this._twitterUsers = [];
      let foundError: boolean = false;
      const notFoundUserIds: string[] = [];

      for (const twitterUserId of this._twitterAllowedSearchAuthorIds) {
        const user = await this._client.v2.user(twitterUserId);

        if (user.data && !user.errors) {
          this._logger.verbose(`twitter user: ${JSON.stringify(user)}`);
          this._twitterUsers.push(user.data);
        } else if (user.errors) {
          foundError = true;
          notFoundUserIds.push(user.errors[0].value);
        }
      }

      await this.pollHaloSupportTweets().catch((error) => {
        this._logger.error(error);
      });

      // this._logger.verbose(`twitter users: ${JSON.stringify(this._twitterUsers)}`);

      if (foundError) {
        return Promise.reject(
          `User with IDs ${notFoundUserIds} not a valid Twitter User`,
        );
      } else {
        return this._twitterUsers;
      }
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * It returns an observable that emits the tweets that are currently in the store.
   * @returns An Observable of tweets.
   */
  get newTweets$() {
    return this._haloSupportTweets.asObservable();
  }

  /**
   * It takes in an array of tweets and emits a new array of tweets
   * @param {TweetV2[]} tweets - TweetV2[]
   */
  next(tweets: TweetV2[]) {
    this._haloSupportTweets.next([...tweets]);
  }

  /**
   * It sends a message to a Discord channel.
   * @param {string} channelId - The ID of the channel to send the message to.
   * @param {TweetV2} tweet - TweetV2
   * @returns Nothing.
   */
  async sendChannel(channelId: string, tweet: TweetV2) {
    try {
      const channel = (await this._discordProvider
        .getClient()
        .channels.fetch(channelId)) as TextChannel;
      const createMessage = await this.constructEmbedTweetMessage(tweet).catch(
        (error) => {
          this._logger.error(error);
        },
      );

      if (createMessage) {
        return channel.send({ embeds: [createMessage] });
      } else {
        return Promise.reject(
          `Problem sending message to channel ${channel.name}.`,
        );
      }
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * It constructs a message embed for a tweet.
   * @param {TweetV2} tweet - TweetV2
   * @returns A promise.
   */
  async constructEmbedTweetMessage(tweet: TweetV2) {
    try {
      if (this._twitterUsers.some((user) => user.id === tweet.author_id)) {
        const tweetAuthor = this._twitterUsers.filter(
          (user) => user.id === tweet.author_id,
        )[0];

        const embedTweet = new MessageEmbed()
          .setURL(`https://twitter.com/i/web/status/${tweet.id}`)
          .setAuthor({
            name: `@${tweetAuthor.username}`,
            iconURL: null,
            url: `https://twitter.com/${tweetAuthor.username}`,
          })
          .addFields(
            {
              name: 'Tweet',
              value: tweet.text,
            },
            {
              name: 'Actions',
              value: `[Open Tweet](https://twitter.com/i/web/status/${tweet.id})`,
            },
          )
          .setTimestamp(new Date(tweet.created_at))
          .setFooter({
            text: format(new Date(tweet.created_at), 'HH:mm'),
          });
        // .setURL(`https://twitter.com/i/web/status/${tweet.id}`)
        return embedTweet;
      } else {
        Promise.reject(
          'Could not find details for tweet author. Author twitter ID is not included in .env configuration TWITTER_ALLOWED_SEARCH_AUTHOR_IDS. Details for these users are loaded in init() function of TwitterService',
        );
      }
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * It searches for tweets that contain the words "patch", "release", "update", "problem", or "issue"
   * and then checks to see if the tweet is from a user that we have allowed to tweet. If it is, it then
   * checks to see if the tweet is already in our database. If it is not, it then adds the tweet to our
   * database and then sends a message to the channels that we have configured
   */
  async pollHaloSupportTweets() {
    try {
      const search = await this._client.v2.search(
        'from:HaloSupport ("patch" OR "release" OR "update" OR "problem" OR "issue")',
        {
          'tweet.fields': ['created_at', 'id', 'author_id', 'source'],
        },
      );

      this._logger.debug('searching for new tweets');

      // this._logger.debug('search', JSON.stringify(search))
      const newTweets: TweetV2[] = [];

      const sortData = search.data.data.sort((a, b) => {
        return (
          new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
        );
      });

      for (let i = 0; i < sortData.length; i++) {
        const tweet = sortData[i];

        if (
          this._twitterAllowedSearchAuthorIds.some(
            (id) => id == tweet.author_id,
          )
        ) {
          const found = await this._prismaService.tweet.findUnique({
            where: {
              tweet_id: tweet.id,
            },
          });

          if (!found) {
            await this.recordTweet(tweet);
            newTweets.push(tweet);

            const supportTweetChannelIds: string[] = this._configService
              .get('supportTweetChannelIds')
              .split(', ');

            for (let i = 0; i < supportTweetChannelIds.length; i++) {
              const channelId = supportTweetChannelIds[i];

              await this.delay(500);
              this.sendChannel(channelId, tweet);
            }

            // console.log('found new tweet', tweet);
          }
        }
      }
      this.next(newTweets);
      return newTweets;
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * Create a new tweet record in the database
   * @param {TweetV2} tweetData - TweetV2
   */
  async recordTweet(tweetData: TweetV2) {
    try {
      const record = await this._prismaService.tweet.create({
        data: {
          tweet_id: tweetData.id,
          text: tweetData.text,
          created_at: tweetData.created_at,
          author_id: tweetData.author_id,
        },
      });

      return record;
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * Upsert a tweet
   * @param {TweetV2} tweetData - TweetV2
   */
  async upsertTweet(tweetData: TweetV2) {
    try {
      const tweet = await this._prismaService.tweet.upsert({
        where: {
          tweet_id: tweetData.id,
        },
        update: {},
        create: {
          tweet_id: tweetData.id,
          text: tweetData.text,
          author_id: tweetData.author_id,
          created_at: tweetData.created_at,
        },
      });

      // this._logger.verbose(`tweet: ${JSON.stringify(tweet)}`)
      return tweet;
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * Delay(ms: number) => Promise<void>
   * @param {number} ms - number
   * @returns Nothing.
   */
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
