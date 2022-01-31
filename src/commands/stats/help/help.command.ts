import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { CommandValidationFilter } from 'src/exception-filters/discord-command-validation';
import { StatsHelpDto } from './help.dto';

@UseFilters(CommandValidationFilter)
@UsePipes(TransformPipe, ValidationPipe)
@SubCommand({ name: 'help', description: 'READ ME' })
export class StatsHelpSubCommand implements DiscordTransformedCommand<StatsHelpDto> {

  private _logger: Logger = new Logger('StatsRegSubCommand')

  constructor() { }

  async handler(@Payload() dto: StatsHelpDto, interaction?: CommandInteraction) {
    try {
      this._logger.verbose('HELP COMMAND', dto.lang)

      // this._logger.verbose(JSON.stringify(dto))
      this._logger.verbose(interaction)

      if (dto.lang == 'fi') {
        const embedHelpFi = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Ohjeet')
          // .setURL('https://discord.js.org/')
          // .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
          .setDescription('Ohjeistus alikomennoille /stats. ?:parametri: tarkoittaa että se on valinnainen.')
          // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
          .addFields(
            { name: 'help :lang:', value: 'Tulostaa tämän viestin' },
            { name: 'reg :gamertag: :allowlogging:', value: 'Rekisteröi Xbox gamertägisi' },
            { name: 'update', value: 'Päivitä tilastot' },
            { name: 'get ?:gamertag:', value: 'Tulostaa käyttäjän Halo Infinite tilastot tai hakee käyttäjän tilastot gamertagille' },
          )
          .setFooter({
            text: 'Bug reports and feature requests 🅴🆇 𝟭 🆃🅸🆄🅼#2753'
          })
          // .setImage('https://i.imgur.com/AfFp7pu.png') //TODO Statsi kuva?
          .setTimestamp()

        return interaction.reply({
          embeds: [embedHelpFi],
          ephemeral: true
        }).catch((error) => {
          Promise.reject(error)
        })
      } else {
        const embedHelpEn = new MessageEmbed()
          .setColor('#0099ff')
          .setTitle('Help')
          // .setURL('https://discord.js.org/')
          // .setAuthor('Some name', 'https://i.imgur.com/AfFp7pu.png', 'https://discord.js.org')
          .setDescription('Help for subcommands of /stats. ?:param: means its optional.')
          // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
          .addFields(
            { name: 'help :lang:', value: 'Prints this message in chosen language' },
            { name: 'reg :tag: :allowlogging:', value: 'Registers your Xbox gamertag for stats' },
            { name: 'update', value: 'Updates latest stats from API' },
            { name: 'get', value: 'Prints your stats or stats for gamertag' },
          )
          .setFooter({
            text: 'Bugi raportit ja kehitysehdotukset 🅴🆇 𝟭 🆃🅸🆄🅼#2753'
          })
          // .setImage('https://i.imgur.com/AfFp7pu.png') //TODO Statsi kuva?
          .setTimestamp()

        return interaction.reply({
          embeds: [embedHelpEn],
          ephemeral: true
        }).catch((error) => {
          Promise.reject(error)
        })
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