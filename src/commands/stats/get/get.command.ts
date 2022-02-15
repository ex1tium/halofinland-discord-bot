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
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
import { UserService } from 'src/services/user.service';
import { GetDto } from './get.dto';

@UseFilters(CommandValidationFilter)
@UsePipes(TransformPipe, ValidationPipe)
@SubCommand({ name: 'get', description: 'Prints our your stats' })
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
      await interaction.deferReply({ fetchReply: true });
      // this._logger.verbose(JSON.stringify(defer));

      // https://github.com/discordjs/discord.js/issues/7005
      const hasParam = !!dto.gamertag;
      const userId = interaction.user.id;

      let gamerTag: string;
      let embedReply: MessageEmbed;

      let replyMessage: InteractionReplyOptions;

      if (hasParam) {
        gamerTag = dto.gamertag;
        this._logger.debug(`gamerTag as param: ${gamerTag}`);

        const statsCSR = await this._haloDotApi
          .requestPlayerStatsCSR(gamerTag)
          .catch((error) => {
            this._logger.error(error);
          });
        const statsRecord = await this._haloDotApi
          .requestPlayerServiceRecord(gamerTag)
          .catch((error) => {
            this._logger.error(error);
          });

        if (
          statsCSR &&
          statsCSR.data &&
          statsRecord &&
          statsRecord.data &&
          !interaction.replied
        ) {
          embedReply = new MessageEmbed()
            .setColor('#CCCCFF')
            .setThumbnail(statsCSR.data[0].response.current.tier_image_url)
            .setTitle(gamerTag)
            .setDescription(statsCSR.data[0].response.current.tier)
            .addFields(
              {
                name: `Kills`,
                value: ` ${statsRecord.data.core.summary.kills}`,
                inline: true,
              },
              {
                name: `Deaths`,
                value: ` ${statsRecord.data.core.summary.deaths}`,
                inline: true,
              },
              {
                name: `Assists`,
                value: ` ${statsRecord.data.core.summary.assists}`,
                inline: true,
              },
            )
            .addFields(
              {
                name: `KDA`,
                value: ` ${statsRecord.data.core.kda.toFixed(1)}`,
                inline: true,
              },
              {
                name: `KDR`,
                value: ` ${statsRecord.data.core.kdr.toFixed(1)}`,
                inline: true,
              },
              {
                name: `Matches Played`,
                value: ` ${statsRecord.data.matches_played}`,
                inline: true,
              },
            )
            .addFields(
              {
                name: `Accuracy`,
                value: ` ${statsRecord.data.core.shots.accuracy.toFixed(1)}%`,
                inline: true,
              },
              {
                name: `AVG Damage Dealt`,
                value: ` ${statsRecord.data.core.damage.average}`,
                inline: true,
              },
              {
                name: `Medals`,
                value: ` ${statsRecord.data.core.summary.medals}`,
                inline: true,
              },
            )
            .addFields(
              {
                name: `Current Tier`,
                value: `${statsCSR.data[0].response.current.tier} ${statsCSR.data[0].response.current.sub_tier} - ${statsCSR.data[0].response.current.value}`,
                inline: true,
              },
              {
                name: `Points to Next Tier`,
                value: ` ${statsCSR.data[0].response.current.next_tier_start - statsCSR.data[0].response.current.value}`,
                inline: true,
              },
              {
                name: `All-Time Best Rank`,
                value: ` ${statsCSR.data[0].response.all_time.tier} ${statsCSR.data[0].response.all_time.sub_tier} -  ${statsCSR.data[0].response.all_time.value} `,
                inline: true,
              },
            )
            .setFooter({
              text: `Time played: ${statsRecord.data.time_played.human
                }. Wins: ${statsRecord.data.win_rate.toFixed(1)}%`,
            });
          // .setTimestamp()
          replyMessage = {
            embeds: [embedReply],
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
        } else {
          let errorEmbed = new MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Error')
            .setDescription(`Stats not found for ${gamerTag}`);

          replyMessage = {
            embeds: [errorEmbed],
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
          const statsCSR = await this._haloDotApi
            .requestPlayerStatsCSR(gamerTag)
            .catch((error) => {
              this._logger.error(error);
            });

          const statsRecord = await this._haloDotApi
            .requestPlayerServiceRecord(gamerTag)
            .catch((error) => {
              this._logger.error(error);
            });

          this._logger.log(`statsCSR: ${JSON.stringify(statsCSR)}`);
          this._logger.log(`statsRecord: ${JSON.stringify(statsRecord)}`);

          if (
            statsCSR &&
            statsCSR.data &&
            statsRecord &&
            statsRecord.data &&
            !interaction.replied
          ) {
            embedReply = new MessageEmbed()
              .setColor('#CCCCFF')
              .setThumbnail(statsCSR.data[0].response.current.tier_image_url)
              .setTitle(gamerTag)
              .setDescription(statsCSR.data[0].response.current.tier)
              .addFields(
                {
                  name: `Kills`,
                  value: ` ${statsRecord.data.core.summary.kills}`,
                  inline: true,
                },
                {
                  name: `Deaths`,
                  value: ` ${statsRecord.data.core.summary.deaths}`,
                  inline: true,
                },
                {
                  name: `Assists`,
                  value: ` ${statsRecord.data.core.summary.assists}`,
                  inline: true,
                },
              )
              .addFields(
                {
                  name: `KDA`,
                  value: ` ${statsRecord.data.core.kda.toFixed(1)}`,
                  inline: true,
                },
                {
                  name: `KDR`,
                  value: ` ${statsRecord.data.core.kdr.toFixed(1)}`,
                  inline: true,
                },
                {
                  name: `Matches Played`,
                  value: ` ${statsRecord.data.matches_played}`,
                  inline: true,
                },
              )
              .addFields(
                {
                  name: `Accuracy`,
                  value: ` ${statsRecord.data.core.shots.accuracy.toFixed(1)}%`,
                  inline: true,
                },
                {
                  name: `AVG Damage Dealt`,
                  value: ` ${statsRecord.data.core.damage.average}`,
                  inline: true,
                },
                {
                  name: `Medals`,
                  value: ` ${statsRecord.data.core.summary.medals}`,
                  inline: true,
                },
              )
              .addFields(
                {
                  name: `Current Tier`,
                  value: `${statsCSR.data[0].response.current.tier} ${statsCSR.data[0].response.current.sub_tier} - ${statsCSR.data[0].response.current.value}`,
                  inline: true,
                },
                {
                  name: `Points to Next Tier`,
                  value: ` ${statsCSR.data[0].response.current.next_tier_start - statsCSR.data[0].response.current.value}`,
                  inline: true,
                },
                {
                  name: `All-Time Best Rank`,
                  value: ` ${statsCSR.data[0].response.all_time.tier} ${statsCSR.data[0].response.all_time.sub_tier} -  ${statsCSR.data[0].response.all_time.value} `,
                  inline: true,
                },
              )
              .setFooter({
                text: `Time played: ${statsRecord.data.time_played.human
                  }. Wins: ${statsRecord.data.win_rate.toFixed(1)}%`,
              }); // .setTimestamp()

            replyMessage = {
              embeds: [embedReply],
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
          } else {
            let errorEmbed = new MessageEmbed()
              .setColor('#FF0000')
              .setTitle('Error')
              .setDescription(`Stats not found for ${gamerTag}`);
            replyMessage = {
              embeds: [errorEmbed],
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
            fetchReply: true,
          };

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
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }
}
