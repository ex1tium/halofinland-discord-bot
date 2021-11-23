/* registration.command.ts */

import { StatsDto } from './stats.dto';
import { Command, UsePipes, Payload, DiscordTransformedCommand, UseGroup, DiscordCommand } from '@discord-nestjs/core';
import { TransformPipe } from '@discord-nestjs/common';
import { CommandInteraction, InteractionReplyOptions, MessageEmbed } from 'discord.js';
import { StatsRegSubCommand } from './register/register.command';
import { StatsHelpSubCommand } from './help/help.command';
import { StatsGetSubCommand } from './get/get.command';
import { StatsUpdateSubCommand } from './update/update.command';

@Command({
  name: 'stats',
  description: 'Stats provided by HaloDotAPI',
  include: [
    // UseGroup(
    //   { name: 'reg', description: 'Register Xbox Gamer Tag' },
    // ),
    StatsGetSubCommand,
    StatsUpdateSubCommand,
    StatsRegSubCommand,
    StatsHelpSubCommand

  ],
})
export class StatsBaseCommand { }

// implements DiscordCommand {
//   handler(interaction: CommandInteraction): InteractionReplyOptions {
//     // console.log(JSON.stringify(interaction));
//     // console.log(`User was registered with name: ${dto.name}`)

//     // const { user } = interaction;

//     const embed = new MessageEmbed().setTitle('stats')


//     return {
//       embeds: [embed],
//     };
//     // return `Stats test command`;
//   }
// }
