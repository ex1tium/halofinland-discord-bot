export interface CSRDetails {
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
};

export interface PlayerCSRSResponse {
  data: Array<{
    queue: "open" | "solo-duo";
    input: "controller" | "mnk" | "crossplay";
    response: {
      current: CSRDetails;
      season: CSRDetails;
      all_time: CSRDetails;
    };
  }>;
  additional: {
    gamertag: string;
  };
};