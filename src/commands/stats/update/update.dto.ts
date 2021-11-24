import { Param, Choice, ParamType } from '@discord-nestjs/core';

export class UpdateDto {
  @Param({ description: 'Xbox Gamer Tag', required: true })
  gamertag: string;
}