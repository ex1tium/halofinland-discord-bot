// import { PlayService } from '../services/play.serivce';
import { Command } from '@discord-nestjs/core';
import { DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { ToJsonResponse } from 'src/models/interaction-toJSON.model';
import { HalodotapiService } from 'src/services/halodotapi.service';

@Command({
  name: 'test',
  description: 'test a command',
})
export class TestCommand implements DiscordCommand {
  constructor(
    // private readonly _haloDotApi: HalodotapiService
  ) { }

  handler(interaction: CommandInteraction): string {
    const isCommand = interaction.isCommand()
    // console.log('isCommand', isCommand)

    console.log('interaction.options', interaction.options)
    // {
    //   _group: null,
    //   _subcommand: null,
    //   _hoistedOptions: [ { name: 'animal', type: 'STRING', value: 'animal_dog' } ]
    // }

    const toJson = interaction.toJSON() as ToJsonResponse;
    console.log('interaction.toJSON', toJson)
    console.log('interaction.toString', interaction.toString())
    console.log('interaction.member', interaction.member)
    // console.log('interaction.token', interaction.token)
    // console.log('interaction.user', interaction.user)
    // console.log('interaction.user', interaction.reply('testing reply'))

    // {
    //   type: 'APPLICATION_COMMAND',
    //   id: '912663389724090379',
    //   applicationId: '911328079207624746',
    //   channelId: '911368720440496208',
    //   guildId: '910901692227256330',
    //   user: '181093139690422272',
    //   member: '181093139690422272',
    //   version: 1,
    //   memberPermissions: 2199023255551n,
    //   commandId: '912494585433952346',
    //   commandName: 'test',
    //   deferred: false,
    //   replied: false,
    //   ephemeral: null
    // }

    // console.log('interaction.command', interaction.command) 


    // return this._haloDotApi.init();
    return ''
  }
}


