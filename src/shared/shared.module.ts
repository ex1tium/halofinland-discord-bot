import { DiscordCommandProvider, DiscordModule } from '@discord-nestjs/core';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { Intents, Message } from 'discord.js';
import { AllExceptionsFilter } from 'src/exception-filters/globalExceptions';
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
import { PrismaService } from 'src/services/prisma.service';
import { TwitterService } from 'src/services/twitter.service';
import { UserService } from 'src/services/user.service';

/* The DiscordModule is a wrapper around the Discord.js library. It provides a way to register commands
and events.

The DiscordModule.forRootAsync method is used to register the Discord.js client. It takes an array
of options. The first option is the token for the Discord bot. The second option is an array of file
paths to register commands from. The third option is an object that contains the Discord.js client
options. The Discord.js client options are used to set the intents for the bot. The intents are used
to determine what events the bot will listen */

@Module({
  imports: [
    HttpModule,
    DiscordModule.forRootAsync({
      imports: [ConfigModule, SharedModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('token'),
        commands: ['**/**/*.command.js'],
        autoRegisterGlobalCommands: true,
        discordClientOptions: {
          intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Intents.FLAGS.GUILD_INTEGRATIONS,
            Intents.FLAGS.GUILD_WEBHOOKS,
            Intents.FLAGS.GUILD_INVITES,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
          ],
        },
        allowGuilds: JSON.parse(configService.get('allowGuilds')),
        registerCommandOptions: [
          {
            forGuild: configService.get('guildID'),
            allowFactory: (message: Message) =>
              !message.author.bot && message.content === '!deploy',
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    TwitterService,
    PrismaService,
    UserService,
    HaloDotApiService,
    DiscordCommandProvider,
  ],
  exports: [
    TwitterService,
    PrismaService,
    UserService,
    HaloDotApiService,
    DiscordCommandProvider,
  ],
})
export class SharedModule { }
