declare module ServiceRecordsModels {

  export interface Vehicles {
    destroys: number;
    hijacks: number;
  }

  export interface Summary {
    kills: number;
    deaths: number;
    assists: number;
    betrayals: number;
    suicides: number;
    vehicles: Vehicles;
    medals: number;
  }

  export interface Damage {
    taken: number;
    dealt: number;
    average: number;
  }

  export interface Shots {
    fired: number;
    landed: number;
    missed: number;
    accuracy: number;
  }

  export interface Kills {
    melee: number;
    grenades: number;
    headshots: number;
    power_weapons: number;
  }

  export interface Assists {
    emp: number;
    driver: number;
    callouts: number;
  }

  export interface Matches {
    wins: number;
    losses: number;
    left: number;
    draws: number;
  }

  export interface Breakdowns {
    kills: Kills;
    assists: Assists;
    matches: Matches;
  }

  export interface TimePlayed {
    seconds: number;
    human: string;
  }

  export interface Data {
    summary: Summary;
    damage: Damage;
    shots: Shots;
    breakdowns: Breakdowns;
    kda: number;
    kdr: number;
    total_score: number;
    matches_played: number;
    time_played: TimePlayed;
    win_rate: number;
  }

  export interface Additional {
    gamertag: string;
  }

  export interface ServiceRecord {
    data: Data;
    additional: Additional;
  }

}

