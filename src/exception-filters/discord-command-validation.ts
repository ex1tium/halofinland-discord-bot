import {
  DiscordArgumentMetadata,
  DiscordExceptionFilter,
  Catch,
} from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MessageEmbed } from 'discord.js';

/* We catch all validation errors and send a message to the user with the error details. */
@Catch(ValidationError)
export class CommandValidationFilter implements DiscordExceptionFilter {
  private _logger: Logger = new Logger('StatsRegSubCommand');

  async catch(
    exceptionList: ValidationError[],
    metadata: DiscordArgumentMetadata<'interactionCreate'>,
  ): Promise<void> {
    const [interaction] = metadata.context;

    const embeds = exceptionList.map((exception) =>
      new MessageEmbed().addFields(
        Object.values(exception.constraints).map((value) => ({
          name: exception.property,
          value,
        })),
      ),
    );

    if (interaction.isCommand())
      await interaction.reply({ embeds }).catch((error) => {
        this._logger.error(error, error && error.stack ? error.stack : null);
      });
  }
}
