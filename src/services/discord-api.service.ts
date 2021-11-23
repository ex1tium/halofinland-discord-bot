
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefineDiscordCommand } from 'src/models/sub-command-options.model';

@Injectable()
export class DiscordApiService {

  private _logger: Logger = new Logger(DiscordApiService.name)

  discordUrl: string;
  botToken: string;

  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService,
  ) {
    this.botToken = this._configService.get('token')
    this.discordUrl = `https://discord.com/api/v8/applications/${this._configService.get('applicationId')}/guilds/${this._configService.get('guildID')}/commands`

    console.log('discordAPI url for commands:', this.discordUrl)
    console.log('discordAPI token:', this.botToken)

  }

  registerNewCommand(name: string, description: string, type?: number, options?: DefineDiscordCommand[]) {

    const data: DefineDiscordCommand = {
      "name": name,
      "description": description,
    }

    if (type) {
      data.type = type;
    }

    if (options) {
      data.options = options;
    }

    this._logger.warn(data)


    const post = this._httpService.post(
      this.discordUrl,
      data, {
      headers: {
        'Authorization': `Bot ${this.botToken}`
      }
    })

    return post.pipe().subscribe((data) => {
      // console.log('registerCommand response', data)
    })

  }
}
