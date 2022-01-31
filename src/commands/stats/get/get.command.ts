import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger, UseFilters, ValidationPipe } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { CommandValidationFilter } from 'src/exception-filters/discord-command-validation';
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
import { UserService } from 'src/services/user.service';
import { GetDto } from './get.dto';

@UseFilters(CommandValidationFilter)
@UsePipes(TransformPipe, ValidationPipe)
@SubCommand({ name: 'get', description: 'Prints our your stats' })
export class StatsGetSubCommand implements DiscordTransformedCommand<GetDto> {

  private _logger: Logger = new Logger(StatsGetSubCommand.name)

  constructor(
    private _haloDotApi: HaloDotApiService,
    private _userService: UserService
  ) { }

  async handler(@Payload() dto: GetDto, interaction: CommandInteraction): Promise<any> {
    try {


      const defer = await interaction.deferReply({ fetchReply: true });
      // const reply = await interaction.fetchReply()
      this._logger.verbose(JSON.stringify(defer))

      // https://github.com/discordjs/discord.js/issues/7005
      const hasParam = !!dto.gamertag
      const userId = interaction.user.id

      let gamerTag: string;
      let embedReply: MessageEmbed;

      let replyMessage: InteractionReplyOptions;

      if (hasParam) {
        gamerTag = dto.gamertag;
        this._logger.debug(`gamerTag as param: ${gamerTag}`)


        const statsCSR = await this._haloDotApi.requestPlayerStatsCSR(gamerTag, 'open').catch((error) => {
          this._logger.error(error)
        })
        const statsRecord = await this._haloDotApi.requestPlayerServiceRecord(gamerTag).catch((error) => {
          this._logger.error(error)
        })

        if (statsCSR && statsCSR.data && statsRecord && statsRecord.data && !interaction.replied) {

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
            .setFooter({
              text: `Time played: ${statsRecord.data.time_played.human}. Wins: ${statsRecord.data.win_rate.toFixed(1)}%`,
            })
          // .setTimestamp()
          replyMessage = {
            embeds: [embedReply],
            fetchReply: true
          }

          console.log('1')

          if (interaction.deferred && !interaction.replied)
            await interaction.editReply(replyMessage).then((reply) => { this._logger.verbose(reply) }).catch((error) => {
              Promise.reject(error)
            })


        } else {
          let errorEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Error')
            .setDescription(`Stats not found for ${gamerTag}`)
          replyMessage = {
            embeds: [errorEmbed],
            fetchReply: true
          }

          console.log('2')

          // if (interaction.deferred && !interaction.replied)
          await interaction.editReply(replyMessage).then((reply) => { this._logger.verbose(reply) }).catch((error) => {
            Promise.reject(error)
          })

          // interaction.reply(replyMessage).then((reply) => {
          //   this._logger.debug(`reply: ${reply}`)
          // })
        }

      } else {
        const botUser = await this._userService.user({
          discord_user_id: userId,
        }).catch((error) => {
          this._logger.error(error)
        })

        if (botUser) {
          gamerTag = botUser.gamertag
          this._logger.debug(`gamerTag from botuser: ${gamerTag}`)

          // TODO write query against HaloDotApi
          const statsCSR = await this._haloDotApi.requestPlayerStatsCSR(gamerTag, 'open').catch((error) => {
            this._logger.error(error)
          })

          const statsRecord = await this._haloDotApi.requestPlayerServiceRecord(gamerTag).catch((error) => {
            this._logger.error(error)
          })

          if (statsCSR && statsCSR.data && statsRecord && statsRecord.data && !interaction.replied) {

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
              .setFooter({
                text: `Time played: ${statsRecord.data.time_played.human}. Wins: ${statsRecord.data.win_rate.toFixed(1)}%`,
              })            // .setTimestamp()

            replyMessage = {
              embeds: [embedReply],
              fetchReply: true
            }
            console.log('3')


            // if (interaction.deferred && !interaction.replied)
            //   return await interaction.editReply(replyMessage).then((reply) => { interaction.deleteReply() }).catch((error) => {
            //     Promise.reject(error)
            //   })


            if (interaction.deferred && !interaction.replied)
              await interaction.editReply(replyMessage).then((reply) => { this._logger.verbose(reply) }).catch((error) => {
                Promise.reject(error)
              })


            // interaction.reply(replyMessage).then((reply) => {
            //   this._logger.debug(`reply: ${reply}`)
            // }).finally(() => {
            //   // interaction.editReply('edit reply')
            // })

            // return await interaction.followUp(replyMessage)




          } else {
            let errorEmbed = new MessageEmbed()
              .setColor('#FF0000')
              .setTitle('Error')
              .setDescription(`Stats not found for ${gamerTag}`)
            replyMessage = {
              embeds: [errorEmbed],
              fetchReply: true
            }

            console.log('4')

            // if (interaction.deferred && !interaction.replied)
            //   return await interaction.editReply(replyMessage).then((reply) => { interaction.deleteReply() }).catch((error) => {
            //     Promise.reject(error)
            //   })

            if (interaction.deferred && !interaction.replied)
              await interaction.editReply(replyMessage).then((reply) => { this._logger.verbose(reply) }).catch((error) => {
                Promise.reject(error)
              })

            // interaction.reply(replyMessage).then((reply) => {
            //   this._logger.debug(`reply: ${reply}`)
            // })

          }

        } else {
          embedReply = new MessageEmbed()
            .setColor('#FF7F50')
            // .setDescription('Gamertag Updated')
            .addFields(
              { name: `Error`, value: `No Xbox Gametag registered for user` },
            )
          // .setTimestamp()
          replyMessage = {
            embeds: [embedReply],
            fetchReply: true
          }

          console.log('5')

          // if (interaction.deferred && !interaction.replied)
          //   return await interaction.editReply(replyMessage).then((reply) => { interaction.deleteReply() }).catch((error) => {
          //     Promise.reject(error)
          //   })
          if (interaction.deferred && !interaction.replied)
            await interaction.editReply(replyMessage).then((reply) => { this._logger.verbose(reply) }).catch((error) => {
              Promise.reject(error)
            })

          // interaction.reply(replyMessage).then((reply) => {
          //   this._logger.debug(`reply: ${reply}`)
          // })
        }
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