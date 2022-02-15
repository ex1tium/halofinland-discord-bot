import {
  Controller,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Once } from '@discord-nestjs/core';
import { TwitterService } from './services/twitter.service';
import { Subscription } from 'rxjs';
import { DiscordApiService } from './services/discord-api.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  private readonly _logger = new Logger(AppController.name);
  private _subMap = new Map<string, Subscription>();

  constructor(
    private _twitterService: TwitterService,
    private _discordApiService: DiscordApiService,
  ) { }

  onModuleInit() { }

  @Once('ready')
  async onReady() {
    /* The below code is initializing the TwitterService. */
    await this._twitterService
      .init()
      .catch((error) => {
        this._logger.error(error);
      })
      .then(() => { });

    /* The _subMap is a map of the
    subscriptions. The _subMap.set() method adds a subscription to the map. */
    this._subMap.set(
      'newTweets',
      /* Subscribing to the newTweets$ observable. */
      this._twitterService.newTweets$.subscribe((newTweets) => {
        if (newTweets) {
          this._logger.verbose(
            `Found ${newTweets.length} new tweets from @HaloSupport`,
          );
        }
      }),
    );


    /* The `registerNewCommand` method is used to register a new command with the Discord API. The first
    parameter is the name of the command, the second parameter is a description of the command, and
    the third parameter is the type of the command. The `constructStatsCommand` method is used
    to construct stats the command. */

    // Doesn't have to be ran every startup. Only if changes are made
    // TODO write commandline argument for running this command?

    // await this._discordApiService
    //   .registerNewCommand(
    //     'stats',
    //     'Commands for interacting with Halo Stats API',
    //     'sub_command',
    //     await this._discordApiService.constructStatsCommand(),
    //   )
    //   .then((value) => {
    //     // this._logger.verbose(`Registered command: ${JSON.stringify(value)}`)
    //   })
    //   .catch((error) => {
    //     this._logger.error(`registerNewCommand ${error}`);
    //   });

    // await this._discordApiService.getGuildCommands().then((value) => {
    //   // this._logger.verbose(`getGuildCommands ${JSON.stringify(value)}`);
    // }).catch((error) => {
    //   this._logger.error(`getGuildCommands ${error}`);
    // })

    // await this._discordApiService.getGlobalCommands()
    //   .then((value) => {
    //     // this._logger.verbose(`getGlobalCommands ${JSON.stringify(value)}`)
    //   })
    //   .catch((error) => {
    //     this._logger.error(`getGlobalCommands ${error}`);
    //   });


    /* Deleting all commands from the command list. */
    // await this._discordApiService.
    //   deleteAllCommands().catch((error) => {
    //     this._logger.error(`deleteAllCommands ${error}`);
    //   })


    this._logger.log('Bot was started!');
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
