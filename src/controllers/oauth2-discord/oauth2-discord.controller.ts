import {
  Controller,
  Get,
  Request,
  Req,
  Logger,
  Body,
  Res,
  Response,
  HttpStatus,
} from '@nestjs/common';

/**
 *  Used for Discord oAuth2 callback. Return simple HTTP OK message for authentication purposes when inviting bot to join server
 *
 * @export
 * @class Oauth2DiscordController
 */
@Controller('oauth2-discord')
export class Oauth2DiscordController {
  private _logger: Logger = new Logger(Oauth2DiscordController.name);

  @Get()
  async callbackForDiscordOauth2(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() body: Body,
  ) {
    if (request) {
      // const requestJson = await request.json();
      this._logger.verbose(`request json: ${JSON.stringify(request.body)}`);
    }

    if (response) {
      // const responseJson = await response.json();
      this._logger.verbose(`request json: ${JSON.stringify(response.body)}`);
    }

    if (body) {
      // const bodyJson = await body.json();
      this._logger.verbose(`request json: ${JSON.stringify(body.body)}`);
    }

    return HttpStatus.OK;
  }
}
