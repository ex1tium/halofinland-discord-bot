import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
// TransformPipe, ValidationPipe
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from '../environment/config'
import { DiscordConfigService } from './services/discord-config.service';
import { TwitterService } from './services/twitter.service';
import { PrismaService } from './services/prisma.service';
import { UserService } from './services/user.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./environment/.env'],
      isGlobal: true,
      load: [config],
    }),
    ScheduleModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DiscordConfigService,
    }),
    // DiscordModule.forRootAsync({
    //   useFactory: () => ({
    //     token: '',
    //     commandPrefix: '!',
    //     allowGuilds: [''],
    //     denyGuilds: [''],
    //     allowCommands: [
    //       {
    //         name: 'some',
    //         channels: [''],
    //         users: [''],
    //         channelType: [''],
    //       },
    //     ],
    //     webhook: {
    //       webhookId: 'your_webhook_id',
    //       webhookToken: 'your_webhook_token',
    //     },
    //     usePipes: [TransformPipe, ValidationPipe],
    //     // and other discord options
    //   }),
    // }),
  ],
  controllers: [AppController],
  providers: [AppService, TwitterService, PrismaService, UserService],
  // providers: [AppService, TwitterService, UserService],
})
export class AppModule { }
