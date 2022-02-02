import { TransformPipe } from '@discord-nestjs/common';
import {
  DiscordCommand,
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { UserService } from 'src/services/user.service';
import { UpdateDto } from './update.dto';

@UsePipes(TransformPipe)
@SubCommand({
  name: 'update',
  description: 'Update your registered Xbox Gamer Tag',
})
/* This is a command that will update a user's gamertag. */
export class StatsUpdateSubCommand
  implements DiscordTransformedCommand<UpdateDto>
{
  private _logger: Logger = new Logger(StatsUpdateSubCommand.name);

  constructor(private _userService: UserService) {}

  async handler(@Payload() dto: UpdateDto, interaction: CommandInteraction) {
    try {
      const gamerTag = dto.gamertag;
      const userId = interaction.user.id;
      const userExists = await this._userService.user({
        discord_user_id: userId,
      });
      let embedReply: MessageEmbed;

      if (userExists) {
        this._userService.updateUser({
          where: {
            discord_user_id: userId,
          },
          data: {
            gamertag: gamerTag,
          },
        });

        embedReply = new MessageEmbed()
          .setColor('#DFFF00')
          .addFields(
            { name: `Old Gamertag`, value: `${userExists.gamertag}` },
            { name: `New Gamertag`, value: `${gamerTag}` },
          )
          .setTimestamp();
        const reply: InteractionReplyOptions = {
          embeds: [embedReply],
          ephemeral: true,
        };

        this._logger.verbose(JSON.stringify(dto));
        this._logger.verbose(interaction);

        return reply;
      }

      return 'use /stats reg :gamertag: command to register first';
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }
}
