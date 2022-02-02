import {
  Controller,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  Once,
} from '@discord-nestjs/core';
import { TwitterService } from './services/twitter.service';
import { Subscription } from 'rxjs';
import { DefineDiscordCommand } from './models/sub-command-options.model';
import { DiscordApiService } from './services/discord-api.service';
import { Cron, CronExpression } from '@nestjs/schedule';


@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  private readonly _logger = new Logger(AppController.name);
  private _subMap = new Map<string, Subscription>();

  allowedChannelIds: string[] = ['911368720440496208'];

  constructor(
    private _twitterService: TwitterService,
    private _discordApiService: DiscordApiService,
  ) {
  }

  onModuleInit() {

  }

  @Once('ready')
  onReady() {

    /* The below code is initializing the TwitterService. */
    this._twitterService.init().catch((error) => {
      this._logger.error(error);
    }).then(() => {

    })

    /* The _subMap is a map of the
    subscriptions. The _subMap.set() method adds a subscription to the map. */
    this._subMap.set(
      'newTweets',
      /* Subscribing to the newTweets$ observable. */
      this._twitterService.newTweets$.subscribe((newTweets) => {
        if (newTweets) {
          this._logger.verbose(`Found ${newTweets.length} new tweets from @HaloSupport`);
        }
      }),
    );

    this._logger.log('Bot was started!');



    // this._subMap.set('stats_command', this._discordApiService.registerNewCommand('stats', 'Halo Infinite stats commands', 1, statsSubCommands))
    // const result = await this._discordApiService.getCommands();
    // this._discordApiService.deleteCommand('912494585433952346');

    // this._discordApiService.getCommands().catch((error) => {
    //   this._logger.error(error);
    // })

    // this._subMap.set('test_command', this._discordApiService.registerNewCommand('test', 'testing command', 1, null))

    // this._discordApiService.registerNewCommand('stats', 'Halo Infinite stats commands', 1, statsSubCommands)

    // const invite = this.discordProvider.getClient().generateInvite({
    //   // scopes:
    // });
    // console.log(invite)
  }

  /* This is a cron expression that will run every 5 minutes. */
  @Cron(CronExpression.EVERY_5_MINUTES)
  async pollLatestTweetsFromHaloSupport() {
    try {
      return await this._twitterService.pollHaloSupportTweets();
    } catch (error) {
      this._logger.error(error);
    }
  }

  /**
   * It unsubscribes from all the subscriptions that were created in the onModuleInit function.
   */
  onModuleDestroy() {
    this._subMap.forEach((sub) => sub.unsubscribe());
  }
}
