export interface InfinitePlayerAppearanceResult {
  data: Data;
  additional: Additional;
}

export interface Additional {
  gamertag: string;
}

export interface Data {
  emblem_url: string;
  backdrop_image_url: string;
  service_tag: string;
}
