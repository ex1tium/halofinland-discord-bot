import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
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

      const statsCSR = await this._haloDotApi.requestPlayerStatsCSR(gamerTag, 'open')
      const statsRecord = await this._haloDotApi.requestPlayerServiceRecord(gamerTag)

      if (statsCSR.data && statsRecord.data) {

        embedReply = new MessageEmbed()
          .setColor('#CCCCFF')
          .setThumbnail(statsCSR.data[0].response.current.tier_image_url)
          .setTitle(gamerTag)
          .setDescription(statsCSR.data[0].response.current.tier)
          .addFields(
            { name: `Kills`, value: ` ${statsRecord.data.summary.kills}`, inline: true },
            { name: `Deaths`, value: ` ${statsRecord.data.summary.deaths}`, inline: true },
            { name: `Assists`, value: ` ${statsRecord.data.summary.assists}`, inline: true },
          )
          .addFields(
            { name: `KDA`, value: ` ${statsRecord.data.kda.toFixed(1)}`, inline: true },
            { name: `KDR`, value: ` ${statsRecord.data.kdr.toFixed(1)}`, inline: true },
            { name: `Matches Played`, value: ` ${statsRecord.data.matches_played}`, inline: true },
          )
          .setFooter(`Time played: ${statsRecord.data.time_played.human}. Wins: ${statsRecord.data.win_rate.toFixed(1)}%`)
        // .setTimestamp()
        reply = {
          embeds: [embedReply]
        }

        return reply;
      } else {
        let errorEmbed = new MessageEmbed()
          .setColor('#FF0000')
          .setTitle('Error')
          .setDescription(`Stats not found for ${gamerTag}`)
        reply = {
          embeds: [errorEmbed]
        }
        return reply
      }

    } else {
      const botUser = await this._userService.user({
        discordUserId: userId,
      })

      if (botUser) {
        gamerTag = botUser.gamerTag

        // TODO write query against HaloDotApi
        const statsCSR = await this._haloDotApi.requestPlayerStatsCSR(gamerTag, 'open')
        // .catch(err => {
        //   console.error('catch error: ', err)
        // })
        const statsRecord = await this._haloDotApi.requestPlayerServiceRecord(gamerTag)
        // .catch(err => {
        //   console.error('catch error: ', err)
        // })

        if (statsCSR.data && statsRecord.data) {

          embedReply = new MessageEmbed()
            .setColor('#CCCCFF')
            .setThumbnail(statsCSR.data[0].response.current.tier_image_url)
            .setTitle(gamerTag)
            .setDescription(statsCSR.data[0].response.current.tier)
            .addFields(
              { name: `Kills`, value: ` ${statsRecord.data.summary.kills}`, inline: true },
              { name: `Deaths`, value: ` ${statsRecord.data.summary.deaths}`, inline: true },
              { name: `Assists`, value: ` ${statsRecord.data.summary.assists}`, inline: true },
            )
            .addFields(
              { name: `KDA`, value: ` ${statsRecord.data.kda.toFixed(1)}`, inline: true },
              { name: `KDR`, value: ` ${statsRecord.data.kdr.toFixed(1)}`, inline: true },
              { name: `Matches Played`, value: ` ${statsRecord.data.matches_played}`, inline: true },
            )
            .setFooter(`Time played: ${statsRecord.data.time_played.human}. Wins: ${statsRecord.data.win_rate.toFixed(1)}%`)
          // .setTimestamp()

          reply = {
            embeds: [embedReply]
          }

          return reply;
        } else {
          let errorEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Error')
            .setDescription(`Stats not found for ${gamerTag}`)
          reply = {
            embeds: [errorEmbed]
          }
          return reply
        }

      } else {
        embedReply = new MessageEmbed()
          .setColor('#FF7F50')
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