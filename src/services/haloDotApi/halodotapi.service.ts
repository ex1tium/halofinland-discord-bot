import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from "axios";
import { lastValueFrom, Observable } from 'rxjs';
@Injectable()
export class HaloDotApiService {
  private readonly _logger = new Logger(HaloDotApiService.name);

  private _haloDotApiInfiniteBaseUrl
  private _headers;


  constructor(
    private _http: HttpService,
    private _configService: ConfigService
  ) {
    this._haloDotApiInfiniteBaseUrl = `https://cryptum.halodotapi.com/games/hi/`;
    this._headers = {
      'Authorization': `Cryptum-Token ${this._configService.get('haloDotToken')}`,
      'Content-Type': 'application/json',
      'Cryptum-API-Version': '2.3-alpha'
    }
  }

  async init(): Promise<void | AxiosResponse<any, any>> {
    try {
      this._logger.debug(`haloDotApiBaseUrl: ${this._haloDotApiInfiniteBaseUrl}`)
      const url = 'https://cryptum.halodotapi.com/'
      // const req =
      return await lastValueFrom(this._http.get(url));
    } catch (error) {
      if (error && error.stack) {
        return Promise.reject(this._logger.error(error.stack));
      } else {
        return Promise.reject(this._logger.error(error));
      }
    }
    // this._http.get()

  }

  getMotd(): Observable<AxiosResponse<any, any>> {
    const url = this._haloDotApiInfiniteBaseUrl + 'motd';
    this._logger.debug(`url: ${url}`)
    const request = this._http.get<any>(url, {

    })
    return request;
  }

  async requestPlayerStatsCSR(gamertag: string, queue: 'open' | 'solo-duo') {
    try {
      let returnValue: CsrsModels.CsrsRootObject;

      const url = this._haloDotApiInfiniteBaseUrl + `stats/players/${gamertag}/csrs`;
      const request = await lastValueFrom(this._http.get<any>(url, {
        headers: this._headers
      }))
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

  async requestPlayerServiceRecord(gamertag: string) {
    try {
      let returnValue: ServiceRecordsModels.ServiceRecord | undefined;

      const url = this._haloDotApiInfiniteBaseUrl + `stats/players/${gamertag}/service-record/global`;
      // this._logger.warn(`url: ${url}`)
      const request = await lastValueFrom(this._http.get<any>(url, {
        headers: this._headers
      }))
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

  // async getMotdAsync(): Promise<AxiosResponse<any, any>> {
  //   const url = this._haloDotApiInfiniteBaseUrl + 'motd';
  //   this._logger.warn(`url: ${url}`)

  //   const headers = {
  //     'Authorization': `Cryptum-Token ${this._configService.get('haloDotToken')}`,
  //     'Content-Type': 'application/json',
  //     'Cryptum-API-Version': 'Cryptum-API-Version: 2.3-alpha'
  //   }
  //   this._logger.debug(`headers: ${JSON.stringify(headers)}`)
  //   const request = lastValueFrom(this._http.get<any>(url, {
  //     headers
  //   }))
  //   return request;
  // }
}


// declare module namespace {

// export interface Current {
//   value: number;
//   measurement_matches_remaining: number;
//   tier: string;
//   tier_start: number;
//   sub_tier: number;
//   next_tier: string;
//   next_tier_start: number;
//   next_sub_tier: number;
//   initial_measurement_matches: number;
//   tier_image_url: string;
// }

// export interface Season {
//   value: number;
//   measurement_matches_remaining: number;
//   tier: string;
//   tier_start: number;
//   sub_tier: number;
//   next_tier: string;
//   next_tier_start: number;
//   next_sub_tier: number;
//   initial_measurement_matches: number;
//   tier_image_url: string;
// }

// export interface AllTime {
//   value: number;
//   measurement_matches_remaining: number;
//   tier: string;
//   tier_start: number;
//   sub_tier: number;
//   next_tier: string;
//   next_tier_start: number;
//   next_sub_tier: number;
//   initial_measurement_matches: number;
//   tier_image_url: string;
// }

// export interface Response {
//   current: Current;
//   season: Season;
//   all_time: AllTime;
// }

// export interface QueueGroups {
//   queue: 'open' | 'solo-duo';
//   input: 'crossplay' | 'controller' | 'mnk';
//   response: Response;
// }

// export interface Additional {
//   gamertag: string;
//   season: number;
// }

// export interface CsrsRootObject {
//   data: QueueGroups[];
//   additional: Additional;
// }

// }

