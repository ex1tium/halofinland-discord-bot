import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';
import { PlayerCSRSResponse } from './csrs.models';
import { InfinitePlayerMultiplayerServiceRecordResult } from './service-record.models';

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
  private _apiVersion: string;
  private _headers: {
    Authorization: string;
    Accept: string
  };

  constructor(
    private _http: HttpService,
    private _configService: ConfigService,
  ) {
    // this._haloDotApiInfiniteBaseUrl = `https://halo.api.stdlib.com/infinite@0.3.8/`;
    this._haloDotApiInfiniteBaseUrl = `https://halo.api.stdlib.com/infinite`;
    this._apiVersion = '0.3.8'

    this._headers = {
      Authorization: `Bearer ${this._configService.get('autocodeToken')}`,
      Accept: 'application/json',
    };
  }


  /**
   * It makes a request to the Halo API and returns the last value from the response.
   * @returns The last value from the promise chain.
   */
  async init(): Promise<void | AxiosResponse<any, any>> {
    try {
      this._logger.debug(
        `haloDotApiBaseUrl: ${this._haloDotApiInfiniteBaseUrl}`,
      );
      const url = this._haloDotApiInfiniteBaseUrl;
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
   * It makes a request to the Halo API to get the CSR stats for a player.
   * @param {string} gamertag - The gamertag of the player you want to get the CSRs for.
   */
  async requestPlayerStatsCSR(gamertag: string) {
    try {
      let returnValue: PlayerCSRSResponse;
      const url = `${this._haloDotApiInfiniteBaseUrl}@${this._apiVersion}/stats/csrs/`

      const axiosRequestConfig = {
        headers: this._headers,
        params: {
          // gamertag: encodeURIComponent(gamertag)
          gamertag: gamertag
        }
      }

      // this._logger.verbose(`axiosRequestConfig: ${JSON.stringify(axiosRequestConfig)}`)
      // this._logger.verbose(url)

      const request = await lastValueFrom(
        this._http.get<any>(url, axiosRequestConfig),
      );

      if (request && request.status === 200) {
        returnValue = request.data as PlayerCSRSResponse;
        this._logger.verbose(`PlayerCSRSResponse: ${JSON.stringify(request.data)}`)
      } else {
        return Promise.reject(`Request failed with status: ${request.status}`);
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



  /**
   * It returns a Promise that resolves to an InfinitePlayerMultiplayerServiceRecordResult.
   * @param {string} gamertag - The gamertag of the player you want to get the service record for.
   */
  async requestPlayerServiceRecord(gamertag: string) {
    try {
      let returnValue: InfinitePlayerMultiplayerServiceRecordResult | undefined;

      const url = `${this._haloDotApiInfiniteBaseUrl}@${this._apiVersion}/stats/service-record/multiplayer/`

      const axiosRequestConfig = {
        headers: this._headers,
        params: {
          // gamertag: encodeURIComponent(gamertag)
          gamertag: gamertag

        }
      }

      // this._logger.verbose(`axiosRequestConfig: ${JSON.stringify(axiosRequestConfig)}`)
      // this._logger.warn(`url: ${url}`)

      const request = await lastValueFrom(
        this._http.get<any>(url, axiosRequestConfig),
      );

      if (request && request.status == 200) {
        returnValue = request.data as InfinitePlayerMultiplayerServiceRecordResult
        // this._logger.verbose(`InfinitePlayerMultiplayerServiceRecordResult: ${JSON.stringify(request.data)}`)
      } else {
        return Promise.reject(`Request failed with status: ${request.status}`);
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
