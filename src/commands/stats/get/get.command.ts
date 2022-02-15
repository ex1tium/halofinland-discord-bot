import { TransformPipe } from '@discord-nestjs/common';
import {
  DiscordCommand,
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
import { PlayerCSRSResponse } from 'src/services/haloDotApi/csrs.models';
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
import { InfinitePlayerMultiplayerServiceRecordResult } from 'src/services/haloDotApi/service-record.models';
import { UserService } from 'src/services/user.service';
import { GetDto, OnlySelf, QueueType, StatsPeriod } from './get.dto';

@UseFilters(CommandValidationFilter)
@UsePipes(TransformPipe, ValidationPipe)
@SubCommand({ name: 'get', description: 'Query your stats if registered or use :gamertag: to query' })
export class StatsGetSubCommand implements DiscordTransformedCommand<GetDto> {
  private _logger: Logger = new Logger(StatsGetSubCommand.name);

  constructor(
    private _haloDotApi: HaloDotApiService,
    private _userService: UserService,
  ) { }

  async handler(
    @Payload() dto: GetDto,
    interaction: CommandInteraction,
  ): Promise<any> {
    try {
      if (interaction) {

        // this._logger.verbose(JSON.stringify(defer));

        // https://github.com/discordjs/discord.js/issues/7005
        const hasParam = !!dto.gamertag;
        const userId = interaction.user.id;

        const queueType = dto.queue
        const statsPeriod = dto.period
        const onlySelf = dto.onlyself

        await interaction.deferReply({
          fetchReply: true, ephemeral: onlySelf === OnlySelf.yes ? true : false,
        });

        this._logger.warn(`onlySelf: ${onlySelf}`);

        let gamerTag: string;
        let embedReply: MessageEmbed;

        let replyMessage: InteractionReplyOptions;

        if (hasParam) {
          gamerTag = dto.gamertag;
          this._logger.debug(`gamerTag as param: ${gamerTag}`);

          const statsCSRS = await this._haloDotApi
            .requestPlayerStatsCSRS(gamerTag)
            .catch((error) => {
              this._logger.error(error);
            });

          const statsRecord = await this._haloDotApi
            .requestPlayerServiceRecord(gamerTag)
            .catch((error) => {
              this._logger.error(error);
            });

          if (
            statsCSRS &&
            statsCSRS.data &&
            statsRecord &&
            statsRecord.data &&
            !interaction.replied
          ) {

            embedReply = await this.buildBaseMessage(gamerTag, statsRecord)
            embedReply = await this.buildQueryStatsMessage(queueType, statsPeriod, statsCSRS, embedReply)

            // log embed reply
            this._logger.debug(`embedReply: ${JSON.stringify(embedReply)}`);

            // .setTimestamp()
            replyMessage = {
              embeds: [embedReply],
              ephemeral: onlySelf === OnlySelf.yes ? true : false,
              fetchReply: true,
            };

            // log reply message
            this._logger.debug(`replyMessage: ${JSON.stringify(replyMessage)}`);

            if (interaction.deferred && !interaction.replied)
              await interaction
                .editReply(replyMessage)
                .then((reply) => {
                  this._logger.verbose(reply);
                })
                .catch((error) => {
                  Promise.reject(error);
                });
          } else {
            let errorEmbed = new MessageEmbed()
              .setColor('#FF0000')
              .setTitle('Error')
              .setDescription(`Stats not found for ${gamerTag}`);

            replyMessage = {
              embeds: [errorEmbed],
              ephemeral: onlySelf === OnlySelf.yes ? true : false,
              fetchReply: true,
            };

            if (interaction.deferred && !interaction.replied)
              await interaction
                .editReply(replyMessage)
                .then((reply) => {
                  this._logger.verbose(reply);
                })
                .catch((error) => {
                  Promise.reject(error);
                });
          }
        } else {
          const botUser = await this._userService
            .user({
              discord_user_id: userId,
            })
            .catch((error) => {
              this._logger.error(error);
            });

          if (botUser) {
            gamerTag = botUser.gamertag;
            this._logger.debug(`gamerTag from botuser: ${gamerTag}`);

            // TODO write query against HaloDotApi
            const statsCSRS = await this._haloDotApi
              .requestPlayerStatsCSRS(gamerTag)
              .catch((error) => {
                this._logger.error(error);
              });

            const statsRecord = await this._haloDotApi
              .requestPlayerServiceRecord(gamerTag)
              .catch((error) => {
                this._logger.error(error);
              });

            // this._logger.log(`statsCSRS: ${JSON.stringify(statsCSRS)}`);
            // this._logger.log(`statsRecord: ${JSON.stringify(statsRecord)}`);

            if (
              statsCSRS &&
              statsCSRS.data &&
              statsRecord &&
              statsRecord.data &&
              !interaction.replied
            ) {
              embedReply = await this.buildBaseMessage(gamerTag, statsRecord)
              embedReply = await this.buildQueryStatsMessage(queueType, statsPeriod, statsCSRS, embedReply)

              replyMessage = {
                embeds: [embedReply],
                ephemeral: onlySelf === OnlySelf.yes ? true : false,
                fetchReply: true,
              };

              // log reply message
              this._logger.debug(`replyMessage: ${JSON.stringify(replyMessage)}`);


              if (interaction.deferred && !interaction.replied)
                await interaction
                  .editReply(replyMessage)
                  .then((reply) => {
                    this._logger.verbose(reply);
                  })
                  .catch((error) => {
                    Promise.reject(error);
                  });
            } else {
              let errorEmbed = new MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Error')
                .setDescription(`Stats not found for ${gamerTag}`);
              replyMessage = {
                embeds: [errorEmbed],
                ephemeral: onlySelf === OnlySelf.yes ? true : false,
                fetchReply: true,
              };

              if (interaction.deferred && !interaction.replied)
                await interaction
                  .editReply(replyMessage)
                  .then((reply) => {
                    this._logger.verbose(reply);
                  })
                  .catch((error) => {
                    Promise.reject(error);
                  });
            }
          } else {
            embedReply = new MessageEmbed().setColor('#FF7F50').addFields({
              name: `Error`,
              value: `No Xbox Gametag registered for user`,
            });

            replyMessage = {
              embeds: [embedReply],
              ephemeral: onlySelf === OnlySelf.yes ? true : false,
              fetchReply: true,
            };

            // log reply message
            this._logger.debug(`replyMessage: ${JSON.stringify(replyMessage)}`);


            console.log('5');

            if (interaction.deferred && !interaction.replied)
              await interaction
                .editReply(replyMessage)
                .then((reply) => {
                  this._logger.verbose(reply);
                })
                .catch((error) => {
                  Promise.reject(error);
                });
          }
        }
      }

    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  async buildBaseMessage(gamerTag: string, statsServiceRecord: InfinitePlayerMultiplayerServiceRecordResult) {
    try {
      const embedReply = new MessageEmbed()
        .setColor('#CCCCFF')
        // .setThumbnail(statsCSRS.data[0].response.current.tier_image_url)
        .setTitle(gamerTag)
        // .setDescription(`${statsCSRS.data[0].response.current.tier} ${statsCSRS.data[0].response.current.sub_tier} - ${statsCSRS.data[0].response.current.value} CSR`)
        .addField('Service Record Summary', '\u200B')
        .addFields(
          {
            name: `Kills`,
            value: ` ${statsServiceRecord.data.core.summary.kills}`,
            inline: true,
          },
          {
            name: `Deaths`,
            value: ` ${statsServiceRecord.data.core.summary.deaths}`,
            inline: true,
          },
          {
            name: `Assists`,
            value: ` ${statsServiceRecord.data.core.summary.assists}`,
            inline: true,
          },
        )
        .addFields(
          {
            name: `KDA`,
            value: ` ${statsServiceRecord.data.core.kda.toFixed(1)}`,
            inline: true,
          },
          {
            name: `KDR`,
            value: ` ${statsServiceRecord.data.core.kdr.toFixed(1)}`,
            inline: true,
          },
          {
            name: `Matches Played`,
            value: ` ${statsServiceRecord.data.matches_played}`,
            inline: true,
          },
        )
        .addFields(
          {
            name: `Accuracy`,
            value: ` ${statsServiceRecord.data.core.shots.accuracy.toFixed(1)}%`,
            inline: true,
          },
          {
            name: `AVG Damage Dealt`,
            value: ` ${statsServiceRecord.data.core.damage.average}`,
            inline: true,
          },
          {
            name: `Medals`,
            value: ` ${statsServiceRecord.data.core.summary.medals}`,
            inline: true,
          },
        )
        // .addFields(
        //   {
        //     name: `Current Tier`,
        //     value: `${statsCSRS.data[0].response.current.tier} ${statsCSRS.data[0].response.current.sub_tier} - ${statsCSRS.data[0].response.current.value}`,
        //     inline: true,
        //   },
        //   {
        //     name: `Next Tier`,
        //     value: ` ${statsCSRS.data[0].response.current.next_tier} ${statsCSRS.data[0].response.current.next_sub_tier} (${statsCSRS.data[0].response.current.next_tier_start})`,
        //     inline: true,
        //   },
        //   {
        //     name: `Points to Next Tier`,
        //     value: ` ${statsCSRS.data[0].response.current.next_tier_start - statsCSRS.data[0].response.current.value}`,
        //     inline: true,
        //   },
        // )
        // .addFields(
        //   {
        //     name: `Peak Rating`,
        //     value: ` ${statsCSRS.data[0].response.all_time.tier} ${statsCSRS.data[0].response.all_time.sub_tier} -  ${statsCSRS.data[0].response.all_time.value} `,
        //     inline: true,
        //   }
        // )
        .setFooter({
          text: `Time played: ${statsServiceRecord.data.time_played.human
            }. Wins: ${statsServiceRecord.data.win_rate.toFixed(1)}%`,
        });

      return embedReply;
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }

  }

  async buildQueryStatsMessage(queueType: QueueType, statsPeriod: StatsPeriod, playerCSRS: PlayerCSRSResponse, messageEmbed: MessageEmbed) {
    try {


      // function constructs embeddedMessage based on stats period and takes array number as argument
      const constructEmbeddedMessage = (embedMessage: MessageEmbed, statsPeriod: StatsPeriod, statsArrayNumber: number) => {
        embedMessage.addFields(
          {
            name: `Current Tier`,
            value: `${playerCSRS.data[statsArrayNumber]?.response?.current.tier} ${playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].sub_tier} - ${playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].value && playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].value !== -1 ? playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].value : 0}`,
            inline: true,
          },
          {
            name: `Next Tier`,
            value: ` ${playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].next_tier} ${playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].next_sub_tier} (${playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].next_tier_start})`,
            inline: true,
          },
          {
            name: `Points to Next Tier`,
            value: ` ${playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].next_tier_start - playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].value && playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].value !== -1 ? playerCSRS.data[statsArrayNumber]?.response?.[statsPeriod].value : 0}`,
            inline: true,
          },
        )
          .addFields(
            {
              name: `Peak Rating`,
              value: ` ${playerCSRS.data[statsArrayNumber]?.response?.all_time.tier} ${playerCSRS.data[statsArrayNumber]?.response?.all_time.sub_tier} -  ${playerCSRS.data[statsArrayNumber]?.response?.all_time.value && playerCSRS.data[statsArrayNumber]?.response?.all_time.value !== -1 ? playerCSRS.data[statsArrayNumber]?.response?.all_time.value : 0} `,
              inline: true,
            }
          )
        return embedMessage;
      }


      switch (queueType) {
        case QueueType.OPEN_CROSSPLAY:

          messageEmbed
            .setThumbnail(playerCSRS.data[0]?.response?.current.tier_image_url)
            .setDescription(`Open Crossplay: ${playerCSRS.data[0]?.response?.current.tier} ${playerCSRS.data[0]?.response?.current.sub_tier} - ${playerCSRS.data[0]?.response?.current.value && playerCSRS.data[0]?.response?.current.value !== -1 ? playerCSRS.data[0]?.response?.current.value : 0} CSR`)
            .addField('\u200B', '\u200B')
            .addField('Ranked Tiers for Open Crossplay', '\u200B')

          messageEmbed = constructEmbeddedMessage(messageEmbed, statsPeriod, 0)

          break;


        case QueueType.SOLO_DUO_CONTROLLER:

          messageEmbed
            .setThumbnail(playerCSRS.data[1]?.response?.current.tier_image_url)
            .setDescription(`Solo-Duo Controller: ${playerCSRS.data[1]?.response?.current.tier} ${playerCSRS.data[1]?.response?.current.sub_tier} - ${playerCSRS.data[1]?.response?.current.value && playerCSRS.data[1]?.response?.current.value !== -1 ? playerCSRS.data[1]?.response?.current.value : 0} CSR`)
            // .addField('\u200B', '\u200B')
            .addField('\u200B', '\u200B')
            .addField('Ranked Tiers for Solo-Duo Controller', '\u200B')

          messageEmbed = constructEmbeddedMessage(messageEmbed, statsPeriod, 1)

          break;


        case QueueType.SOLO_DUO_MNK:
          messageEmbed
            .setThumbnail(playerCSRS.data[2]?.response?.current.tier_image_url)
            .setDescription(`Solo-Duo MNK: ${playerCSRS.data[2]?.response?.current.tier} ${playerCSRS.data[2]?.response?.current.sub_tier} - ${playerCSRS.data[2]?.response?.current.value && playerCSRS.data[2]?.response?.current.value !== -1 ? playerCSRS[2]?.response?.current.value : 0} CSR`)
            // .addField('\u200B', '\u200B')
            .addField('\u200B', '\u200B')
            .addField('Ranked Tiers for Solo-Duo Mouse and Keyboard', '\u200B')

          messageEmbed = constructEmbeddedMessage(messageEmbed, statsPeriod, 2)

          break;

        default:
          return messageEmbed
        // break;
      }

      return messageEmbed;
    } catch (error) {
      if (error) {
        return Promise.reject(this._logger.error(error));
      }
    }
  }
}
