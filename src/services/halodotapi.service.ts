import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HalodotapiService {
  private readonly _logger = new Logger(HalodotapiService.name);

  constructor() {

  }

  init() {

    this._logger.error('HALO DOT API SERVICE TEST')
    return 'initialized'

  }
}
