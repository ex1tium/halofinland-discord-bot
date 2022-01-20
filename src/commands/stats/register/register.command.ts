import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
import { PrismaService } from 'src/services/prisma.service';
import { TwitterService } from 'src/services/twitter.service';
import { UserService } from 'src/services/user.service';
import { RegisterDto } from './register.dto';

@UsePipes(TransformPipe)
@SubCommand({ name: 'reg', description: 'Register your Xbox Gamer tag' })
export class StatsRegSubCommand implements DiscordTransformedCommand<RegisterDto> {

  private _logger: Logger = new Logger('StatsRegSubCommand')

  constructor(
    private _userService: UserService
  ) { }

  // constructor(private _twitterService: TwitterService) { }


  async handler(@Payload() dto: RegisterDto, interaction: CommandInteraction) {

    try {

      const gamerTag = dto.gamertag;
      const allowLogging = dto.allowlogging;
      this._logger.warn(`allowLogging: ${allowLogging}`)

      const userId = interaction.user.id
      const userExists = await this._userService.user({
        discordUserId: userId,
      })

      let wasUpdated = false;


      this._logger.warn(`userExists: ${userExists}`)

      if (userExists && userExists.discordUserId) {
        this._userService.updateUser({
          where: {
            discordUserId: userId,
          },
          data: {
            gamerTag: gamerTag,
            allowStatsLogging: allowLogging ? 1 : 0
          }
        })

        wasUpdated = true
      } else {
        this._userService.createUser({
          discordUserId: userId,
          gamerTag: gamerTag,
          allowStatsLogging: allowLogging ? 1 : 0
        })
      }

      // this._logger.verbose(dto.gamertag)

      // this._logger.verbose(JSON.stringify(dto))
      // this._logger.verbose(interaction.user)

      // this._logger.debug(`userId: ${userId}`)

      let embedReply: MessageEmbed;
      if (wasUpdated) {
        embedReply = new MessageEmbed()
          .setColor('#DFFF00')
          // .setDescription('Gamertag Updated')
          .addFields(
            { name: `Old Gamertag`, value: `${userExists.gamerTag}` },
            { name: `New Gamertag`, value: `${gamerTag}` },
            { name: `Logging`, value: `${allowLogging ? 'enabled' : 'disabled'}` },
          )
        // .setTimestamp()

      } else {
        embedReply = new MessageEmbed()
          .setColor('#40E0D0')
          // .setDescription('Gamertag Saved')
          .addFields(
            // { name: `Old Gamertag`, value: `${userExists.gamerTag}` },
            { name: `Registered Xbox Gamertag`, value: `${gamerTag}` },
            { name: `Logging`, value: `${allowLogging ? 'enabled' : 'disabled'}` },

          )
        // .setTimestamp()
      }

      const reply = {
        embeds: [embedReply]
      }

      return reply;
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }
}