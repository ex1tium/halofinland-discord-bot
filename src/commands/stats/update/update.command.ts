import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { UserService } from 'src/services/user.service';
import { UpdateDto } from './update.dto';

@UsePipes(TransformPipe)
@SubCommand({ name: 'update', description: 'Update your registered Xbox Gamer Tag' })
export class StatsUpdateSubCommand implements DiscordTransformedCommand<UpdateDto> {

  private _logger: Logger = new Logger(StatsUpdateSubCommand.name)

  constructor(private _userService: UserService) { }

  async handler(@Payload() dto: UpdateDto, interaction: CommandInteraction) {

    const gamerTag = dto.gamertag
    const userId = interaction.user.id
    const userExists = await this._userService.user({
      discordUserId: userId,
    })
    let embedReply: MessageEmbed;

    if (userExists) {
      this._userService.updateUser({
        where: {
          discordUserId: userId,
        },
        data: {
          gamerTag: gamerTag
        }
      })

      embedReply = new MessageEmbed()
        .setColor('#FF0000')
        // .setDescription('Gamertag Updated')
        .addFields(
          { name: `Old Gamertag`, value: `${userExists.gamerTag}` },
          { name: `New Gamertag`, value: `${gamerTag}` },
        )
        .setTimestamp()
      const reply = {
        embeds: [embedReply]
      }

      this._logger.verbose(JSON.stringify(dto))
      this._logger.verbose(interaction)

      return reply;
    }

    return 'use /stats reg :gamertag: command to register first'
  }
}
