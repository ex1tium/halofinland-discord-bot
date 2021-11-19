import { Controller, Get, Logger, OnModuleInit } from '@nestjs/common';
import { On, Once, UseGuards, UsePipes } from '@discord-nestjs/core';
import { Message } from 'discord.js';
import { AppService } from './app.service';
import { MessageFromUserGuard } from './guards/message-fom-user.guard';
import { MessageToUpperPipe } from './pipes/message-to-upper.pipe';
// Client, ClientProvider, 
@Controller()
export class AppController implements OnModuleInit {
  private readonly logger = new Logger(AppController.name);

  allowedChannelIds: string[] = ['911368720440496208'];

  constructor(private readonly appService: AppService) {
    // console.log(this.discordProvider.getClient().channels)

  }

  onModuleInit() {
    // console.log(this.discordProvider.getClient())
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

    // const invite = this.discordProvider.getClient().generateInvite({
    //   // scopes: 
    // });
    // console.log(invite)
  }


}
