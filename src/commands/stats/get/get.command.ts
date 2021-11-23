import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { GetDto } from './get.dto';

@UsePipes(TransformPipe)
@SubCommand({ name: 'get', description: 'Prints our your stats' })
export class StatsGetSubCommand implements DiscordTransformedCommand<GetDto> {

  private _logger: Logger = new Logger(StatsGetSubCommand.name)

  constructor() { }

  handler(@Payload() dto: GetDto, interaction: CommandInteraction): string {


    this._logger.verbose(JSON.stringify(dto))
    this._logger.verbose(interaction)

    return `Print out stats`;
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