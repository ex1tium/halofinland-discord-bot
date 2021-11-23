import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HaloDotApiMiddleware implements NestMiddleware {
  // constructor(private _logger: Logger) { }


  use(req: Request, res: Response, next: NextFunction) {

    const _logger = new Logger('HTTP HALO-DOT-API');

    _logger.warn('HaloDotApiMiddleWare HEADER: ', req.headers)
    // console.log()

    next();
  }
}
