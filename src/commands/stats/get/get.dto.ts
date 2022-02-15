import { Param, Choice, ParamType } from '@discord-nestjs/core';

enum QueueType {
  OPEN_CROSSPLAY = 'open_crossplay',
  SOLO_DUO_CONTROLLER = 'solo-duo_controller',
  SOLO_DUO_MNK = 'solo-duo_mnk',
}

// enum InputType {
//   CROSSPLAY = 'crossplay',
//   CONTROLLER = 'controller',
//   MNK = 'mnk',
// }

export class GetDto {
  @Param({ description: '(Optional) Enter Xbox Gamertag to pull stats for Halo Infinite', required: false })
  gamertag: string;

  // @Choice(QueueType)
  // @Param({ description: 'Select from Open Crossplay, Solo-Duo Controller or Solo-Duo Keyboard and Mouse', required: false, type: ParamType.STRING })
  // queue: QueueType;
}
