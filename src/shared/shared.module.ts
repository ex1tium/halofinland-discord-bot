import { DiscordCommandProvider, DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordApiService } from 'src/services/discord-api.service';
import { DiscordConfigService } from 'src/services/discord-config.service';
import { PrismaService } from 'src/services/prisma.service';
import { TwitterService } from 'src/services/twitter.service';
import { UserService } from 'src/services/user.service';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DiscordConfigService,
    }),
  ],
  providers: [TwitterService, PrismaService, UserService, DiscordCommandProvider],
  exports: [TwitterService, PrismaService, UserService, DiscordCommandProvider]
})
export class SharedModule { }
