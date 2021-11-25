
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { DefineDiscordCommand } from 'src/models/sub-command-options.model';
import { AxiosResponse } from "axios";

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

  async getCommands(): Promise<false | AxiosResponse<any, any>> {
    try {
      const get = await lastValueFrom(this._httpService.get(
        this.discordUrl,
        {
          headers: {
            'Authorization': `Bot ${this.botToken}`
          }
        }
      ))

      if (get.status == 200) {
        this._logger.debug(`REGISTERED COMMANDS: `, JSON.stringify(get.data))
        return get;
      }
    } catch (error) {
      return error;
    }

  }

  async deleteCommand(commandId: string): Promise<false | AxiosResponse<any, any>> {
    const deleteCommand = await lastValueFrom(this._httpService.delete(
      this.discordUrl + `/${commandId}`,
      {
        headers: {
          'Authorization': `Bot ${this.botToken}`
        }
      }
    ))

    if (deleteCommand.status == 200) {
      this._logger.debug(`DELETE COMMAND: `, JSON.stringify(deleteCommand.data))

      return deleteCommand;
    } else {
      return false;
    }
  }
}
