// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
// import { Request, Response } from 'express';

// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   private logger = new Logger(HttpExceptionFilter.name)

//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     this.logger.error(exception);

//     response
//       .status(status)
//       .json({
//         statusCode: status,
//         success: false,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         message: (status === HttpStatus.INTERNAL_SERVER_ERROR) ? 'Sorry we are experiencing technical problems.' : '',
//       });
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private _logger: Logger = new Logger('StatsRegSubCommand')

  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      error: JSON.stringify(exception)
    };

    this._logger.error(`AllExcepetionsFilter error response: ${JSON.stringify(ctx.getResponse())}`)

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
