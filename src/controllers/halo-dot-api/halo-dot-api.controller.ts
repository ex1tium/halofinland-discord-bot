import { On, Command, DiscordCommandProvider } from '@discord-nestjs/core';
import { HttpService } from '@nestjs/axios';
import { Controller, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Message } from 'discord.js';
import { lastValueFrom } from 'rxjs';
import { MessageFromUserGuard } from 'src/guards/message-fom-user.guard';
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
import { AxiosResponse } from "axios";


@Controller('halo-dot-api')
export class HaloDotApiController {
  private readonly _logger = new Logger(HaloDotApiController.name);
  private _allowedChannelIds: string[] = ['911368720440496208'];
  private _haloDotApiInfiniteBaseUrl: string;

  constructor(
    private _haloDotApiService: HaloDotApiService,
    private _http: HttpService,
    private _configService: ConfigService
  ) {

    this._haloDotApiInfiniteBaseUrl = `https://cryptum.halodotapi.com/games/hi/`

    // this._haloDotApiService.getMotd().then((motd) => {
    //   motd.unsubscribe();
    // })
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  testService() {
    // this._haloDotApiService.init().then((res) => {
    //   this._logger.log(`res.status: ${res.status}`)
    //   this._logger.log(`res.data:`, res.data)
    //   this._logger.log(`res.headers:`, res.headers)

    // })
  }

  runCommand() {

  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // @Cron(CronExpression.EVERY_5_MINUTES)
  async testQuery() {
    try {
      // const response = await this.getMotdAsync()
      const responseCsr = await this._haloDotApiService.requestPlayerStatsCSR('ex1tium1306', 'open')
      if (responseCsr) {
        // this._logger.log('responseCsr.data: ',JSON.s responseCsr.data);
        this._logger.warn('responseCsr', responseCsr);
      }

      const responseServiceRecord = await this._haloDotApiService.requestPlayerServiceRecord('ex1tium1306')
      if (responseServiceRecord) {
        this._logger.warn('responseServiceRecord', responseServiceRecord);
      }


    } catch (error) {
      if (error && error.response) {
        this._logger.error(error?.response?.data);
      }
    }
  }
}
