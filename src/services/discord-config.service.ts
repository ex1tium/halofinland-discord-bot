
import { Injectable } from '@nestjs/common';
// import {
//   DiscordModuleOption,
//   DiscordOptionsFactory,
// } from '@discord-nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DiscordOptionsFactory, DiscordModuleOption } from '@discord-nestjs/core';
// TransformPipe, ValidationPipe
// import { Intents } from 'discord.js';
import { Intents } from 'discord.js';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  constructor(
    private readonly _configService: ConfigService
  ) {
  }

  createDiscordOptions(): any {
    const options = {
      commands: ['**/*.command.js'],
      discordClientOptions: {
        intents: //All current intents
          [
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
      allowGuilds: JSON.parse(this._configService.get('allowGuilds')),

      // usePipes: [TransformPipe, ValidationPipe],
      useGuards: [],
      token: this._configService.get('token'),

    }

    console.log('discord options', options)
    return options;
  }
}