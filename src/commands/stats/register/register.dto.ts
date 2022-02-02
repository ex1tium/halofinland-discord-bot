import { Param, Choice, ParamType } from '@discord-nestjs/core';

export class RegisterDto {
  @Param({ description: 'Xbox Gamer Tag', required: true })
  gamertag: string;
  @Param({ description: 'Allow logging to a database', required: true })
  allowlogging: string;
}
