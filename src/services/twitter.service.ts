import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ETwitterStreamEvent, TweetStream, TweetV2, TweetV2SingleResult, TwitterApi, TwitterApiv2 } from 'twitter-api-v2';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { PrismaService } from './prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DiscordClientProvider } from '@discord-nestjs/core';
import { TextChannel, MessageEmbed } from 'discord.js';
import { format } from 'date-fns'

@Injectable()
export class TwitterService {
  private readonly _logger = new Logger(TwitterService.name);
  private _client: TwitterApi;

  private _haloSupportTweets: BehaviorSubject<TweetV2[]> = new BehaviorSubject(null);

  private _twitterAllowedSearchAuthorIds: string[] = [];

  constructor(
    private _configService: ConfigService,
    private _prismaService: PrismaService,
    private _discordProvider: DiscordClientProvider
  ) {

    this._twitterAllowedSearchAuthorIds = JSON.parse(this._configService.get('twitterAllowedSearchAuthorIds'))
    // console.debug('twitterAllowedSearchAuthorIds', this.twitterAllowedSearchAuthorIds)

    this._client = new TwitterApi(this._configService.get('twitterBearerToken'));

    this._logger.debug(`twitter client:  ${JSON.stringify(this._client)}`)

  }

  async init() {
    try {
      const user = await this._client.v2.user('1093614084807741440');
      this._logger.verbose(`twitter client: ${JSON.stringify(user)}`)

    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }

  }


  get newTweets$() {
    return this._haloSupportTweets.asObservable();
  }

  next(tweets: TweetV2[]) {
    this._haloSupportTweets.next([...tweets]);
  }

  async sendChannel(channelId: string, tweet: TweetV2) {

    try {
      const channel = await this._discordProvider.getClient().channels.fetch(channelId) as TextChannel
      const createMessage = await this.constructEmbedTweetMessage(tweet)

      if (createMessage) {
        return channel.send({ embeds: [createMessage] })
      } else {
        throw new Error(`Problem sending message to channel ${channel.name}.`)
      }
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }

  }

  async constructEmbedTweetMessage(tweet: TweetV2) {
    try {
      const embedTweet = new MessageEmbed()
        // .setTitle('Tweet')
        .setURL(`https://twitter.com/i/web/status/${tweet.id}`)
        .setAuthor('From @HaloSupport', null, `https://twitter.com/HaloSupport`)
        // .setDescription('New Tweet')
        .addFields(
          {
            name: 'Tweet', value: tweet.text
          },
          {
            name: 'Actions', value: `[Open Tweet](https://twitter.com/i/web/status/${tweet.id})`
          }
        )
        .setTimestamp(new Date(tweet.created_at))
        .setFooter(format(new Date(tweet.created_at), 'HH:mm'))
      // .setURL(`https://twitter.com/i/web/status/${tweet.id}`)
      return embedTweet;
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  // @Cron(CronExpression.EVERY_5_MINUTES)
  async pollHaloSupportTweets() {
    try {
      const search = await this._client.v2.search('from:HaloSupport ("patch" OR "release" OR "update" OR "problem" OR "issue")', {
        "tweet.fields": ['created_at', 'id', 'author_id', 'source'],
      });

      this._logger.debug('searching for new tweets')

      // this._logger.debug('search', JSON.stringify(search))
      const newTweets: TweetV2[] = [];

      const sortData = search.data.data.sort((a, b) => {
        return new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
      })

      for (let i = 0; i < sortData.length; i++) {
        const tweet = sortData[i];

        if (this._twitterAllowedSearchAuthorIds.some(id => id == tweet.author_id)) {
          const found = await this._prismaService.tweet.findUnique({
            where: {
              id: tweet.id
            }
          })


          if (!found) {
            this.recordTweet(tweet);
            newTweets.push(tweet)
            this.sendChannel('911189130543788062', tweet)
            console.log('found new tweet', tweet)

          }


        }
      }
      this.next(newTweets)
      return newTweets
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }


  }

  async recordTweet(tweetData: TweetV2) {

    try {
      const record = await this._prismaService.tweet.create({
        data: {
          id: tweetData.id,
          text: tweetData.text,
          author_id: tweetData.author_id,
          created_at: tweetData.created_at
        }
      })

      return record;
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  async upsertTweet(tweetData: TweetV2) {
    try {
      const tweet = await this._prismaService.tweet.upsert({
        where: {
          id: tweetData.id
        },
        update: {

        },
        create: {
          id: tweetData.id,
          text: tweetData.text,
          author_id: tweetData.author_id,
          created_at: tweetData.created_at
        }
      })

      // this._logger.verbose(`tweet: ${JSON.stringify(tweet)}`)
      return tweet;
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }

  }
}
