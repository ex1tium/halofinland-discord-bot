import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
/* This middleware logs the request body. */
// https://docs.nestjs.com/middleware
export class ExampleMiddleWare implements NestMiddleware {
  constructor(private _logger: Logger) {
    this._logger = new Logger(ExampleMiddleWare.name);
  }

  use(req: Request, res: Response, next: NextFunction) {
    this._logger.warn('ExampleMiddleWare request body: ', req.body);
    next();
  }
}
