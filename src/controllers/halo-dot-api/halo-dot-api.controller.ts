import { On, Command, DiscordCommandProvider } from '@discord-nestjs/core';
import { Controller, Logger, UseGuards } from '@nestjs/common';
import { Message } from 'discord.js';
import { MessageFromUserGuard } from 'src/guards/message-fom-user.guard';

@Controller('halo-dot-api')
export class HaloDotApiController {
  private readonly logger = new Logger(HaloDotApiController.name);
  allowedChannelIds: string[] = ['911368720440496208'];

  constructor(

  ) {
  }
}
