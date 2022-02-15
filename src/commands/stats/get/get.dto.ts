import { Param, Choice, ParamType } from '@discord-nestjs/core';

export enum QueueType {
  OPEN_CROSSPLAY = 'open_crossplay',
  SOLO_DUO_CONTROLLER = 'solo-duo_controller',
  SOLO_DUO_MNK = 'solo-duo_mnk',
}

export enum StatsPeriod {
  CURRENT = 'current',
  SEASON = 'season',
  ALL_TIME = 'all_time',
}


export enum OnlySelf {
  no = 'no',
  yes = 'yes',
}

export class GetDto {
  @Param({ description: '(Optional) Enter Xbox Gamertag to pull stats for Halo Infinite', required: false })
  gamertag: string;

  @Choice(OnlySelf)
  @Param({ description: 'Show only for yourself?', required: true, type: ParamType.STRING })
  onlyself: OnlySelf;

  @Choice(QueueType)
  @Param({ description: 'Select from Open Crossplay, Solo-Duo Controller or Solo-Duo Keyboard and Mouse', required: true, type: ParamType.STRING })
  queue: QueueType;

  @Choice(StatsPeriod)
  @Param({ description: 'Select Period to show stats from. Can choose from Current, Season, All time', required: true, type: ParamType.STRING })
  period: StatsPeriod;
}
