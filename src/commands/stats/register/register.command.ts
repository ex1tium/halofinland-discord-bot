import { TransformPipe } from '@discord-nestjs/common';
import { DiscordCommand, DiscordTransformedCommand, Payload, SubCommand, UsePipes } from '@discord-nestjs/core';
import { Logger } from '@nestjs/common';
import {
  CommandInteraction,
  InteractionReplyOptions,
  MessageEmbed,
} from 'discord.js';
import { PrismaService } from 'src/services/prisma.service';
import { TwitterService } from 'src/services/twitter.service';
import { UserService } from 'src/services/user.service';
import { RegisterDto } from './register.dto';

@UsePipes(TransformPipe)
@SubCommand({ name: 'reg', description: 'Register your Xbox Gamer tag' })
export class StatsRegSubCommand implements DiscordTransformedCommand<RegisterDto> {

  private _logger: Logger = new Logger('StatsRegSubCommand')

  constructor(private _userService: UserService) { }

  // constructor(private _twitterService: TwitterService) { }


  async handler(@Payload() dto: RegisterDto, interaction: CommandInteraction) {

    const gamerTag = dto.gamertag
    const userId = interaction.user.id
    const userExists = await this._userService.user({
      discordUserId: userId,
    })

    let wasUpdated = false;


    this._logger.warn(`userExists: ${userExists}`)

    if (userExists) {
      this._userService.updateUser({
        where: {
          discordUserId: userId,
        },
        data: {
          gamerTag: gamerTag
        }
      })

      wasUpdated = true
    } else {
      this._userService.createUser({
        discordUserId: userId,
        gamerTag: gamerTag
      })
    }

    // this._logger.verbose(dto.gamertag)

    // this._logger.verbose(JSON.stringify(dto))
    // this._logger.verbose(interaction.user)

    // this._logger.debug(`userId: ${userId}`)

    let embedReply: MessageEmbed;
    if (wasUpdated) {
      embedReply = new MessageEmbed()
        .setColor('#FF0000')
        // .setDescription('Gamertag Updated')
        .addFields(
          { name: `Old Gamertag`, value: `${userExists.gamerTag}` },
          { name: `New Gamertag`, value: `${gamerTag}` },
        )
        // .setTimestamp()

    } else {
      embedReply = new MessageEmbed()
        // .setColor('#FF0000')
        // .setDescription('Gamertag Saved')
        .addFields(
          // { name: `Old Gamertag`, value: `${userExists.gamerTag}` },
          { name: `Registered Xbox Gamertag`, value: `${gamerTag}` },
        )
        // .setTimestamp()
    }



    const reply = {
      embeds: [embedReply]
    }


    return reply;
  }
}