import { Param, Choice } from '@discord-nestjs/core';

enum Language {
  FI = 'fi',
  EN = 'en',
}

export class StatsHelpDto {
  @Param({ description: 'Select language', required: true })
  @Choice(Language)
  lang: Language;
}
