import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
// TransformPipe, ValidationPipe
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config from '../environment/config'
// import { DiscordConfigService } from './services/discord-config.service';
import { TwitterService } from './services/twitter.service';
import { PrismaService } from './services/prisma.service';
import { UserService } from './services/user.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { HaloDotApiModule } from './controllers/halo-dot-api/halo-dot-api.module';
import { SharedModule } from './shared/shared.module';
import { HalodotapiService } from './services/halodotapi.service';
import { DiscordApiService } from './services/discord-api.service';
// import { DiscordApiService } from './services/discord-api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./environment/.env'],
      isGlobal: true,
      load: [config],
    }),
    HttpModule,
    ScheduleModule.forRoot(),
    HaloDotApiModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, HalodotapiService, DiscordApiService],
})
export class AppModule { }
