import { Param, Choice, ParamType } from '@discord-nestjs/core';

export class GetDto {
  @Param({ description: 'Xbox Gamer Tag', required: false })
  gamertag: string;
}