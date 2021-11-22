import { Controller, Get, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { On, Once, UseGuards, UsePipes, DiscordClientProvider } from '@discord-nestjs/core';
import { Message } from 'discord.js';
import { AppService } from './app.service';
import { MessageFromUserGuard } from './guards/message-fom-user.guard';
import { MessageToUpperPipe } from './pipes/message-to-upper.pipe';
import { TwitterService } from './services/twitter.service';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
// Client, ClientProvider, 
@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(AppController.name);
  private _subMap = new Map<string, Subscription>();

  allowedChannelIds: string[] = ['911368720440496208'];

  constructor(
    private readonly _appService: AppService,
    private _twitterService: TwitterService,
    private _userService: UserService
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

  @On('messageCreate')
  @UseGuards(MessageFromUserGuard)
  // @UsePipes(MessageToUpperPipe)
  async onMessage(message: Message): Promise<void> {
    console.log(message);
    this.logger.log(`Incoming message: ${message.content}`);
    if (this.allowedChannelIds.some(id => id == message.channelId)) {
      await message.reply('Message processed successfully');
    }
  }


  @Once('ready')
  async onReady() {
    this.logger.log('Bot was started!');

    this._twitterService.init();

    this._subMap.set('newTweets', this._twitterService.newTweets$.subscribe((newTweets) => {
      console.error('newTweets', newTweets);

      if (newTweets) {

      }
    }))



    // const invite = this.discordProvider.getClient().generateInvite({
    //   // scopes: 
    // });
    // console.log(invite)
  }


  onModuleDestroy() {

  }

}
