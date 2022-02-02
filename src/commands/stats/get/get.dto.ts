import { Param, Choice, ParamType } from '@discord-nestjs/core';

// enum PublicStats {
//   true,
//   false,
// }

export class GetDto {
  @Param({ description: 'Xbox Gamer Tag', required: false })
  gamertag: string;
  // @Choice(PublicStats)
  // isPublic: PublicStats;
}
