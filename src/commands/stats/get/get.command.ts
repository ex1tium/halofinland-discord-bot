import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { HaloDotApiService } from 'src/services/halodotapi.service';
import { UserService } from 'src/services/user.service';
import { GetDto } from './get.dto';

@UsePipes(TransformPipe)
@SubCommand({ name: 'get', description: 'Prints our your stats' })
export class StatsGetSubCommand implements DiscordTransformedCommand<GetDto> {

  private _logger: Logger = new Logger(StatsGetSubCommand.name)

  constructor(
    private _haloDotApi: HaloDotApiService,
    private _userService: UserService
  ) { }

  async handler(@Payload() dto: GetDto, interaction: CommandInteraction) {

    const hasParam = !!dto.gamertag
    const userId = interaction.user.id

    let gamerTag: string;
    let embedReply: MessageEmbed;

    let reply: { embeds: MessageEmbed[]; };

    if (hasParam) {
      gamerTag = dto.gamertag;

      // TODO write query against HaloDotApi

    } else {
      const botUser = await this._userService.user({
        discordUserId: userId,
      })

      if (botUser) {
        gamerTag = botUser.gamerTag

        // TODO write query against HaloDotApi

        embedReply = new MessageEmbed()
          .setColor('#FF0000')
          // .setDescription('Gamertag Updated')
          .addFields(
            { name: `TODO`, value: `Query stats` },
          )
        // .setTimestamp()
        reply = {
          embeds: [embedReply]
        }

        return reply;

      } else {
        embedReply = new MessageEmbed()
          .setColor('#FF0000')
          // .setDescription('Gamertag Updated')
          .addFields(
            { name: `Error`, value: `No Xbox Gametag registered for user` },
          )
        // .setTimestamp()
        reply = {
          embeds: [embedReply]
        }

        return reply;
      }

    }


    this._logger.verbose(JSON.stringify(dto))
    this._logger.verbose(interaction)

    return reply;
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