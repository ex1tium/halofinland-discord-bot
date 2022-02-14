
export interface InfinitePlayerMultiplayerServiceRecordResult {
  data: ServiceRecord;
  additional: Additional;
}

export interface Additional {
  gamertag: string;
  filter: string;
}

export interface ServiceRecord {
  core: Core;
  matches_played: number;
  time_played: TimePlayed;
  win_rate: number;
}

export interface Core {
  summary: Summary;
  damage: Damage;
  shots: Shots;
  breakdowns: Breakdowns;
  kda: number;
  kdr: number;
  total_score: number;
}

export interface Breakdowns {
  kills: Kills;
  assists: Assists;
  matches: Matches;
  medals: Medal[];
}

export interface Assists {
  emp: number;
  driver: number;
  callouts: number;
}

export interface Kills {
  melee: number;
  grenades: number;
  headshots: number;
  power_weapons: number;
}

export interface Matches {
  wins: number;
  losses: number;
  left: number;
  draws: number;
}

export interface Medal {
  id: number;
  name: string;
  count: number;
  image_urls: ImageUrls;
}

export interface ImageUrls {
  small: string;
  medium: string;
  large: string;
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

export interface Summary {
  kills: number;
  deaths: number;
  assists: number;
  betrayals: number;
  suicides: number;
  vehicles: Vehicles;
  medals: number;
}

export interface Vehicles {
  destroys: number;
  hijacks: number;
}

export interface TimePlayed {
  seconds: number;
  human: string;
}
