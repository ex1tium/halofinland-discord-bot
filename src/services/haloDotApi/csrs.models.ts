declare module CsrsModels {

  export interface Current {
    value: number;
    measurement_matches_remaining: number;
    tier: string;
    tier_start: number;
    sub_tier: number;
    next_tier: string;
    next_tier_start: number;
    next_sub_tier: number;
    initial_measurement_matches: number;
    tier_image_url: string;
  }

  export interface Season {
    value: number;
    measurement_matches_remaining: number;
    tier: string;
    tier_start: number;
    sub_tier: number;
    next_tier: string;
    next_tier_start: number;
    next_sub_tier: number;
    initial_measurement_matches: number;
    tier_image_url: string;
  }

  export interface AllTime {
    value: number;
    measurement_matches_remaining: number;
    tier: string;
    tier_start: number;
    sub_tier: number;
    next_tier: string;
    next_tier_start: number;
    next_sub_tier: number;
    initial_measurement_matches: number;
    tier_image_url: string;
  }

  export interface Response {
    current: Current;
    season: Season;
    all_time: AllTime;
  }

  export interface QueueGroups {
    queue: 'open' | 'solo-duo';
    input: 'crossplay' | 'controller' | 'mnk';
    response: Response;
  }

  export interface Additional {
    gamertag: string;
    season: number;
  }

  export interface CsrsRootObject {
    data: QueueGroups[];
    additional: Additional;
  }


}

