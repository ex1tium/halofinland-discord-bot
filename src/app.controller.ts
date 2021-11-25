import { Controller, Get, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { On, Once, UseGuards, UsePipes, DiscordClientProvider, DiscordCommandProvider } from '@discord-nestjs/core';
import { Message } from 'discord.js';
import { AppService } from './app.service';
import { MessageFromUserGuard } from './guards/message-fom-user.guard';
import { MessageToUpperPipe } from './pipes/message-to-upper.pipe';
import { TwitterService } from './services/twitter.service';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { DiscordApiService } from './services/discord-api.service';
import { DefineDiscordCommand } from './models/sub-command-options.model';
// Client, ClientProvider, 
@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppController.name);
  private _subMap = new Map<string, Subscription>();

  allowedChannelIds: string[] = ['911368720440496208'];

  constructor(
    private readonly _appService: AppService,
    private _twitterService: TwitterService,
    private _userService: UserService,
    private _discordCommandProvider: DiscordCommandProvider,
    private _discordApiService: DiscordApiService

  ) {
    // console.log(this.discordProvider.getClient().channels)

  }

  onModuleInit() {
    // console.log(this.discordProvider.getClient())

    // this._userService.users({}).then((users) => {
    //   console.log('users', users)
    // })
  }

  // @Client()
  // discordProvider: ClientProvider;

  // @On('messageCreate')
  // @UseGuards(MessageFromUserGuard)
  // // @UsePipes(MessageToUpperPipe)
  // async onMessage(message: Message): Promise<void> {
  //   console.log(message);
  //   this.logger.log(`Incoming message: ${message.content}`);
  //   if (this.allowedChannelIds.some(id => id == message.channelId)) {
  //     await message.reply('Message processed successfully');
  //   }
  // }


  @Once('ready')
  async onReady() {
    this.logger.log('Bot was started!');

    this._twitterService.init();

    this._subMap.set('newTweets', this._twitterService.newTweets$.subscribe((newTweets) => {
      console.error('newTweets', newTweets);

      if (newTweets) {

      }
    }))

    // 1 is type SUB_COMMAND'
    // 2 is type SUB_COMMAND_GROUP
    const statsSubCommands: DefineDiscordCommand[] =
      [
        {
          "name": "reg",
          "description": "Register your Xbox Gamer tag",
          "type": 1,
          "options": [
            {
              "name": "gamertag",
              "description": "Enter Xbox Gamertag",
              "type": 3,
              "required": true
            },
            {
              "name": "allowlogging",
              "description": "Allow your stats to be logged in a database every 24 hours.",
              "type": 3,
              "required": true,
              "choices": [
                {
                  "name": "Yes",
                  "value": "1"
                },
                {
                  "name": "No",
                  "value": "0"
                },
              ]
            },
          ]
        },
        {
          "name": "update",
          "description": "Update your registered Xbox Gamer Tag",
          "type": 1,
          "options": [
            {
              "name": "gamertag",
              "description": "Enter Xbox Gamertag",
              "type": 3,
              "required": true
            },

          ]
        },
        {
          "name": "get",
          "description": "Query your stats or use :gamertag: to query",
          "type": 1,
          "options": [
            {
              "name": "gamertag",
              "description": "(Optional) Enter Xbox Gamertag to pull stats for Halo Infinite",
              "type": 3,
              "required": false
            },

          ]
        },
        {
          "name": "help",
          "description": "READ ME",
          "type": 1,
          "options": [
            {
              "name": "lang",
              "description": "Select language",
              "type": 3,
              "required": true,
              "choices": [
                {
                  "name": "Suomeksi",
                  "value": "fi"
                },
                {
                  "name": "In English",
                  "value": "en"
                },
              ]
            },

          ]
        },
        // {
        //   "name": "role",
        //   "description": "Get or edit permissions for a role",
        //   "type": 2,
        //   "options": [
        //     {
        //       "name": "get",
        //       "description": "Get permissions for a role",
        //       "type": 1
        //     },
        //     {
        //       "name": "edit",
        //       "description": "Edit permissions for a role",
        //       "type": 1
        //     }
        //   ]
        // }

        // {
        //   name: 'reg',
        //   description: 'Enter your Xbox Gamer Tag',
        //   type: 1,
        //   required: true
        // }
      ]
    // this._subMap.set('stats_command', this._discordApiService.registerNewCommand('stats', 'Halo Infinite stats commands', 1, statsSubCommands))
    // const result = await this._discordApiService.getCommands();
    // this._discordApiService.deleteCommand('912494585433952346');
    // this._discordApiService.getCommands();


    // this._subMap.set('test_command', this._discordApiService.registerNewCommand('test', 'testing command', 1, null))




    // const invite = this.discordProvider.getClient().generateInvite({
    //   // scopes: 
    // });
    // console.log(invite)
  }


  onModuleDestroy() {

    this._subMap.forEach(sub => sub.unsubscribe())

  }

}
