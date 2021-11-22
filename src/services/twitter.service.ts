import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ETwitterStreamEvent, TweetStream, TweetV2, TweetV2SingleResult, TwitterApi, TwitterApiv2 } from 'twitter-api-v2';

import { BehaviorSubject, from, Observable } from 'rxjs';
import { PrismaService } from './prisma.service';
import { Cron } from '@nestjs/schedule';
import { DiscordClientProvider } from '@discord-nestjs/core';
import { TextChannel, MessageEmbed } from 'discord.js';
import { format } from 'date-fns'

@Injectable()
export class TwitterService {
  private readonly _logger = new Logger(TwitterService.name);
  private _client: TwitterApi;

  // private _stream: TweetStream<TweetV2>;
  // private _stream$: Observable<TweetV2>;
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
    const user = await this._client.v2.user('1093614084807741440');
    this._logger.verbose(`twitter client: ${JSON.stringify(user)}`)
    // this._stream = await this._client.sampleStream();
    const rwClient = this._client.readWrite;
    this._logger.verbose(`rwClient: ${JSON.stringify(rwClient)}`)



    const find = await this._prismaService.tweet.findMany()
    this._logger.verbose(`find tweets: ${JSON.stringify(find)}`)

    this.pollHaloSupportTweets();



    // '911368720440496208'

  }

  // get tweetStream() {
  //   return this._stream$;
  // }

  get newTweets$() {
    return this._haloSupportTweets.asObservable();
  }

  next(tweets: TweetV2[]) {
    this._haloSupportTweets.next([...tweets]);
  }

  async sendChannel(channelId: string, tweet: TweetV2) {
    const channel = await this._discordProvider.getClient().channels.fetch(channelId) as TextChannel
    channel.send({ embeds: [this.constructEmbedTweetMessage(tweet)] })

    // this._logger.debug(`_discordProvider channel: ${JSON.stringify(channel)}`)

  }

  constructEmbedTweetMessage(tweet: TweetV2) {
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
  }

  @Cron('5 * * * *')
  async pollHaloSupportTweets() {
    const search = await this._client.v2.search('from:HaloSupport ("patch" OR "release" OR "update" OR "problem" OR "issue")', {
      "tweet.fields": ['created_at', 'id', 'author_id', 'source'],
    });

    this._logger.debug('search', JSON.stringify(search))
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

        // console.log('found', found)

        if (!found) {
          this.recordTweet(tweet);
          newTweets.push(tweet)
          this.sendChannel('911189130543788062', tweet)
        }


      }
    }

    this.next(newTweets)
    return newTweets

  }

  async recordTweet(tweetData: TweetV2) {
    const record = await this._prismaService.tweet.create({
      data: {
        id: tweetData.id,
        text: tweetData.text,
        author_id: tweetData.author_id,
        created_at: tweetData.created_at
      }
    })

    return record;
  }

  async upsertTweet(tweetData: TweetV2) {
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
  }
}
