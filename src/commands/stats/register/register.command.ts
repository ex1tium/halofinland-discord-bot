import { TransformPipe } from '@discord-nestjs/common';
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { Logger, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { CommandValidationFilter } from 'src/exception-filters/discord-command-validation';
import { UserService } from 'src/services/user.service';
import { RegisterDto } from './register.dto';

@UseFilters(CommandValidationFilter)
@UsePipes(TransformPipe, ValidationPipe)
@SubCommand({ name: 'reg', description: 'Register your Xbox Gamer tag' })
/* This is a command that allows users to register their gamertag and whether or not they want to be
logged. */
export class StatsRegSubCommand
  implements DiscordTransformedCommand<RegisterDto>
{
  private _logger: Logger = new Logger('StatsRegSubCommand');

  constructor(private _userService: UserService) { }

  async handler(@Payload() dto: RegisterDto, interaction: CommandInteraction) {
    try {

      const defer = await interaction.deferReply({ fetchReply: true });

      const gamerTag = dto.gamertag;
      const allowLogging = dto.allowlogging;
      this._logger.warn(`allowLogging: ${allowLogging}`);

      const userId = interaction.user.id;
      const userExists = await this._userService.user({
        discord_user_id: userId,
      });

      let wasUpdated = false;

      this._logger.warn(`userExists: ${JSON.stringify(userExists)}`);
      this._logger.warn(`userId: ${JSON.stringify(userId)}`);

      if (userExists && userExists.discord_user_id) {
        await this._userService.updateUser({
          where: {
            discord_user_id: userId,
          },
          data: {
            gamertag: gamerTag,
            allow_stats_logging: allowLogging ? 1 : 0,
          },
        }).catch((error) => {
          this._logger.error(error);
        });

        wasUpdated = true;
      } else {
        await this._userService.createUser({
          discord_user_id: userId,
          gamertag: gamerTag,
          allow_stats_logging: allowLogging ? 1 : 0,
        }).catch((error) => {
          this._logger.error(error);
        });
      }

      let embedReply: MessageEmbed;

      if (wasUpdated) {
        embedReply = new MessageEmbed().setColor('#DFFF00').addFields(
          { name: `Old Gamertag`, value: `${userExists.gamertag}` },
          { name: `New Gamertag`, value: `${gamerTag}` },
          {
            name: `Logging`,
            value: `${allowLogging ? 'enabled' : 'disabled'}`,
          },
        );
      } else {
        embedReply = new MessageEmbed().setColor('#40E0D0').addFields(
          { name: `Registered Xbox Gamertag`, value: `${gamerTag}` },
          {
            name: `Logging`,
            value: `${allowLogging ? 'enabled' : 'disabled'}`,
          },
        );
      }

      const reply: InteractionReplyOptions = {
        embeds: [embedReply],
        ephemeral: true,
      };

      if (interaction.deferred && !interaction.replied)
        await interaction
          .editReply(reply)
          .then((reply) => {
            this._logger.verbose(reply);
          })
          .catch((error) => {
            Promise.reject(error);
          });
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }
}
