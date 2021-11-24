import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HaloDotApiService {
  private readonly _logger = new Logger(HaloDotApiService.name);

  constructor() {

  }

  init() {

    this._logger.error('HALO DOT API SERVICE TEST')
    return 'initialized'

  }
}
