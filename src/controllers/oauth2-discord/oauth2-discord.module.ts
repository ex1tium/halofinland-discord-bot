import { Module } from '@nestjs/common';
import { Oauth2DiscordController } from './oauth2-discord.controller';

@Module({
  controllers: [Oauth2DiscordController]
})
export class Oauth2DiscordModule {}
