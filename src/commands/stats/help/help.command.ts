import { TransformPipe } from '@discord-nestjs/common';
import {
  DiscordTransformedCommand,
  Payload,
  SubCommand,
  UsePipes,
} from '@discord-nestjs/core';
import { Logger, UseFilters, ValidationPipe } from '@nestjs/common';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { CommandValidationFilter } from 'src/exception-filters/discord-command-validation';
import { StatsHelpDto } from './help.dto';

@UseFilters(CommandValidationFilter)
@UsePipes(TransformPipe, ValidationPipe)
@SubCommand({ name: 'help', description: 'Shows bot commands and helpful information' })
/* This is a command that will display helpful message! */
export class StatsHelpSubCommand
  implements DiscordTransformedCommand<StatsHelpDto>
{
  private _logger: Logger = new Logger('StatsRegSubCommand');

  constructor() { }

  async handler(
    @Payload() dto: StatsHelpDto,
    interaction?: CommandInteraction,
  ) {
    try {
      if (dto.lang == 'fi') {
        const embedHelpFi = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Ohjeet')
          .setDescription(
            'Ohjeistus alikomennoille /stats. ?:parametri: tarkoittaa että se on valinnainen.',
          )
          .addFields(
            { name: 'help :lang:', value: 'Tulostaa tämän viestin' },
            {
              name: 'reg :gamertag: :allowlogging:',
              value: 'Rekisteröi Xbox gamertägisi',
            },
            { name: 'update', value: 'Päivitä tilastot' },
            {
              name: 'get ?:gamertag:',
              value:
                'Tulostaa käyttäjän Halo Infinite tilastot tai hakee käyttäjän tilastot gamertagille',
            },
          )
          .setFooter({
            text: 'https://github.com/ex1tium/halofinland-discord-bot',
          })
          .setTimestamp();

        return interaction
          .reply({
            embeds: [embedHelpFi],
            ephemeral: true,
          })
          .catch((error) => {
            Promise.reject(error);
          });
      } else {
        const embedHelpEn = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Help')
          .setDescription(
            'Help for subcommands of /stats. ?:param: means its optional.',
          )
          .addFields(
            {
              name: 'help :lang:',
              value: 'Prints this message in chosen language',
            },
            {
              name: 'reg :tag: :allowlogging:',
              value: 'Registers your Xbox gamertag for stats',
            },
            { name: 'update', value: 'Updates latest stats from API' },
            { name: 'get', value: 'Prints your stats or stats for gamertag' },
          )
          .setFooter({
            text: 'https://github.com/ex1tium/halofinland-discord-bot',
          })
          .setTimestamp();

        return interaction
          .reply({
            embeds: [embedHelpEn],
            ephemeral: true,
          })
          .catch((error) => {
            Promise.reject(error);
          });
      }
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }
}
