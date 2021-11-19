/* registration.command.ts */

import { RegistrationDto } from './registration.dto';
import { Command, UsePipes, Payload, DiscordTransformedCommand } from '@discord-nestjs/core';
import { TransformPipe } from '@discord-nestjs/common';
import { CommandInteraction } from 'discord.js';

@Command({
  name: 'reg',
  description: 'User registration',
})
@UsePipes(TransformPipe)
export class BaseInfoCommand implements DiscordTransformedCommand<RegistrationDto>
{
  handler(@Payload() dto: RegistrationDto, interaction: CommandInteraction): string {
    return `User was registered with name: ${dto.name}, age ${dto.age} and city ${dto.city}`;
  }
}
