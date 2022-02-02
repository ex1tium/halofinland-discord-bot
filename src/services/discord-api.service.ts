import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, take } from 'rxjs';
import { DefineDiscordCommand } from 'src/models/sub-command-options.model';
import { AxiosResponse } from 'axios';

@Injectable()
export class DiscordApiService {
  private _logger: Logger = new Logger(DiscordApiService.name);

  discordUrl: string;
  botToken: string;

  /**
   * It sets the bot token and the discord url.
   * @param {HttpService} _httpService - HttpService
   * @param {ConfigService} _configService - The config service is used to get the bot token and
   * application ID.
   */
  constructor(
    private _httpService: HttpService,
    private _configService: ConfigService,
  ) {
    this.botToken = this._configService.get('token');
    this.discordUrl = `https://discord.com/api/v8/applications/${this._configService.get(
      'applicationId',
    )}/guilds/${this._configService.get('guildID')}/commands`;

    // console.log('discordAPI url for commands:', this.discordUrl);
    // console.log('discordAPI token:', this.botToken);
  }



  /**
   * It takes in a name, description, and type, and then sends a post request to the Discord API with
   * the data to register a new command for the bot. Required appropriate scope and permission.
   * @param {string} name - The name of the command.
   * @param {string} description - The description of the command.
   * @param {'sub_command' | 'sub_command_group'} [type] - The type of command.
   * @param {DefineDiscordCommand[]} [options] - An array of objects that define the options for the
   * command.
   * @returns The response from the post request.
   */
  async registerNewCommand(
    name: string,
    description: string,
    type?: 'sub_command' | 'sub_command_group',
    options?: DefineDiscordCommand[],
  ): Promise<any> {
    try {
      const data: DefineDiscordCommand = {
        name: name,
        description: description,
      };

      if (type) {
        data.type = type === 'sub_command' ? 1 : type === 'sub_command_group' ? 2 : null;

        if (data.type === null) {
          return Promise.reject('Check type parameter');
        }
      }

      if (options) {
        data.options = options;
      }

      // this._logger.warn(data);

      const post = this._httpService.post(this.discordUrl, data, {
        headers: {
          Authorization: `Bot ${this.botToken}`,
        },
      });

      const result = await lastValueFrom(post)


      if (result.status === 200) {
        return result.data
      } else {
        return Promise.reject(`Error registering new command. HttpStatus: ${result.status}`)
      }
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * It creates a list of commands that can be used in the bot.
   * @returns An array of objects that represent the commands.
   */
  async constructStatsCommand() {
    // 1 is type SUB_COMMAND'
    // 2 is type SUB_COMMAND_GROUP
    const statsSubCommands: DefineDiscordCommand[] = [
      {
        name: 'reg',
        description: 'Register your Xbox Gamer tag',
        type: 1,
        options: [
          {
            name: 'gamertag',
            description: 'Enter Xbox Gamertag',
            type: 3,
            required: true,
          },
          {
            name: 'allowlogging',
            description:
              'Allow your stats to be logged in a database every 24 hours.',
            type: 3,
            required: true,
            choices: [
              {
                name: 'Yes',
                value: '1',
              },
              {
                name: 'No',
                value: '0',
              },
            ],
          },
        ],
      },
      {
        name: 'update',
        description: 'Update your registered Xbox Gamer Tag',
        type: 1,
        options: [
          {
            name: 'gamertag',
            description: 'Enter Xbox Gamertag',
            type: 3,
            required: true,
          },
        ],
      },
      {
        name: 'get',
        description: 'Query your stats or use :gamertag: to query',
        type: 1,
        options: [
          {
            name: 'gamertag',
            description:
              '(Optional) Enter Xbox Gamertag to pull stats for Halo Infinite',
            type: 3,
            required: false,
          },
        ],
      },
      {
        name: 'help',
        description: 'READ ME',
        type: 1,
        options: [
          {
            name: 'lang',
            description: 'Select language',
            type: 3,
            required: true,
            choices: [
              {
                name: 'Suomeksi',
                value: 'fi',
              },
              {
                name: 'In English',
                value: 'en',
              },
            ],
          },
        ],
      },
    ];

    return statsSubCommands
  }

  /**
   * It gets the commands that are registered with the bot.
   * @returns The response from the API.
   */
  async getCommands(): Promise<void | AxiosResponse<any, any>> {
    try {
      const get = await lastValueFrom(
        this._httpService.get(this.discordUrl, {
          headers: {
            Authorization: `Bot ${this.botToken}`,
          },
        }),
      );

      if (get.status == 200) {
        this._logger.debug(`REGISTERED COMMANDS: `, JSON.stringify(get.data));
        return get;
      } else {
        Promise.reject(`API responded with status ${get.status}`)
      }
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * It deletes a command from the bot.
   * @param {string} commandId - The ID of the command you want to delete.
   * @returns The response from the API.
   */
  async deleteCommand(
    commandId: string,
  ): Promise<void | AxiosResponse<any, any>> {
    try {
      const deleteCommand = await lastValueFrom(
        this._httpService.delete(this.discordUrl + `/${commandId}`, {
          headers: {
            Authorization: `Bot ${this.botToken}`,
          },
        }),
      );

      if (deleteCommand.status == 200) {
        this._logger.debug(
          `DELETE COMMAND: `,
          JSON.stringify(deleteCommand.data),
        );

        return deleteCommand;
      } else {
        return null;
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
