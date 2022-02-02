import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';

/**
 *  The HaloDotApiService class is a class that is responsible for making requests to the HaloDotApi.
 *
 * @export
 * @class HaloDotApiService
 */
@Injectable()
export class HaloDotApiService {
  private readonly _logger = new Logger(HaloDotApiService.name);

  private _haloDotApiInfiniteBaseUrl: string;
  private _headers: {
    Authorization: string;
    'Content-Type': string;
    'Cryptum-API-Version': string;
  };

  constructor(
    private _http: HttpService,
    private _configService: ConfigService,
  ) {
    this._haloDotApiInfiniteBaseUrl = `https://cryptum.halodotapi.com/games/hi/`;
    this._headers = {
      Authorization: `Cryptum-Token ${this._configService.get('haloDotToken')}`,
      'Content-Type': 'application/json',
      'Cryptum-API-Version': '2.3-alpha',
    };
  }

  /**
   * It makes a request to the HaloDotApi and returns the response.
   */
  async init(): Promise<void | AxiosResponse<any, any>> {
    try {
      this._logger.debug(
        `haloDotApiBaseUrl: ${this._haloDotApiInfiniteBaseUrl}`,
      );
      const url = 'https://cryptum.halodotapi.com/';
      // const req =
      return await lastValueFrom(this._http.get(url));
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * It returns an Observable of an AxiosResponse.
   * @returns An Observable of type AxiosResponse<any, any>
   */
  getMotd(): Observable<AxiosResponse<any, any>> {
    const url = this._haloDotApiInfiniteBaseUrl + 'motd';
    this._logger.debug(`url: ${url}`);
    const request = this._http.get<any>(url, {});
    return request;
  }

  /**
   * It returns the CSRs for a player.
   * @param {string} gamertag - The gamertag of the player you want to get the CSRs for.
   * @param {'open' | 'solo-duo'} [queue] - The queue to get stats for.
   */
  async requestPlayerStatsCSR(gamertag: string, queue?: 'open' | 'solo-duo') {
    try {
      let returnValue: CsrsModels.CsrsRootObject;

      const url =
        this._haloDotApiInfiniteBaseUrl + `stats/players/${gamertag}/csrs`;
      const request = await lastValueFrom(
        this._http.get<any>(url, {
          headers: this._headers,
        }),
      );
      if (request && request.status === 200) {
        returnValue = request.data as CsrsModels.CsrsRootObject;
      }
      return returnValue;
    } catch (error) {
      // throw new Error(error);
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }

  /**
   * It makes a request to the Halo API to get the Service Record for a player.
   * @param {string} gamertag - The gamertag of the player you want to get the service record for.
   */
  async requestPlayerServiceRecord(gamertag: string) {
    try {
      let returnValue: ServiceRecordsModels.ServiceRecord | undefined;

      const url =
        this._haloDotApiInfiniteBaseUrl +
        `stats/players/${gamertag}/service-record/global`;
      // this._logger.warn(`url: ${url}`)
      const request = await lastValueFrom(
        this._http.get<any>(url, {
          headers: this._headers,
        }),
      );
      if (request && request.status == 200) {
        returnValue = request.data as ServiceRecordsModels.ServiceRecord;
      }
      return returnValue;
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
  }
}
