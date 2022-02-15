import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../environment/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { SharedModule } from './shared/shared.module';
import { DiscordApiService } from './services/discord-api.service';
import { AllExceptionsFilter } from './exception-filters/globalExceptions';
import { APP_FILTER } from '@nestjs/core';
import { Oauth2DiscordModule } from './controllers/oauth2-discord/oauth2-discord.module';

/* We import the ConfigModule, which will load the environment variables from the .env file. We then
import the HttpModule, which will configure the timeout and max redirects for the HTTP client. We
then import the ScheduleModule, which will configure the cron jobs. We then import the
Oauth2DiscordModule, which will configure the Discord OAuth2 callback. Finally, we import the
SharedModule, which will configure the shared services. */
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./environment/.env'],
      isGlobal: true,
      load: [config],
    }),

    /* This is a factory function that will return an object with the timeout and max redirects
    configured. The `useFactory` function will be called when the module is loaded. The `inject`
    property will inject the ConfigService into the factory function. */
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        timeout: 60000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    Oauth2DiscordModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    DiscordApiService,
  ],
})
export class AppModule { }
