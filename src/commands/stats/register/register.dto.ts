import { Param, Choice, ParamType } from '@discord-nestjs/core';

export class RegisterDto {
  @Param({ description: 'Xbox Gamer Tag', required: true })
  gamertag: string;
}