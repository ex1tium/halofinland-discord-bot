import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HaloDotApiMiddleware implements NestMiddleware {
  private _logger = new Logger(HaloDotApiMiddleware.name);
  // constructor(private _logger: Logger) { }


  use(req: Request, res: Response, next: NextFunction) {

    // const

    this._logger.warn('HaloDotApiMiddleWare HEADER: ', req.headers)
    // console.log()

    next();
  }
}
