import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { RegisterDto } from './register.dto';

@UsePipes(TransformPipe)
@SubCommand({ name: 'reg', description: 'Register your Xbox Gamer tag' })
export class StatsRegSubCommand implements DiscordTransformedCommand<RegisterDto> {

  private _logger: Logger = new Logger('StatsRegSubCommand')

  constructor() { }

  handler(@Payload() dto: RegisterDto, interaction: CommandInteraction): string {

    this._logger.verbose(dto.tag)

    this._logger.verbose(JSON.stringify(dto))
    this._logger.verbose(interaction)

    return `Registered Xbox gamertex`;
  }
}



// // import { EmailDto } from '../../dto/email.dto';
// import { TransformPipe } from '@discord-nestjs/common';
// import {
//   Payload,
//   // SubCommand,
//   DiscordTransformedCommand,
//   UsePipes,
// } from '@discord-nestjs/core';

// @UsePipes(TransformPipe)
// @SubCommand({ name: 'email', description: 'Register by email' })
// export class EmailSubCommand implements DiscordTransformedCommand<EmailDto> {
//   handler(@Payload() dto: EmailDto): string {
//     return `Success register user: ${dto.email}, ${dto.name}, ${dto.age}, ${dto.city}`;
//   }
// }