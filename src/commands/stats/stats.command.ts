import { Command } from '@discord-nestjs/core';

import { StatsRegSubCommand } from './register/register.command';
import { StatsHelpSubCommand } from './help/help.command';
import { StatsGetSubCommand } from './get/get.command';
import { StatsUpdateSubCommand } from './update/update.command';
/**
 *  Base /stats command. Base commands cannot do anything by themselves if they have sub commands in  include array.
 *
 * @export
 * @class StatsBaseCommand
 */
@Command({
  name: 'stats',
  description: 'Stats provided by HaloDotAPI',
  include: [
    StatsGetSubCommand,
    StatsUpdateSubCommand,
    StatsRegSubCommand,
    StatsHelpSubCommand,
  ],
})
export class StatsBaseCommand {}
