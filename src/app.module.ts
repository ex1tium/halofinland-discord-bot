import { Module } from '@nestjs/common';
// TransformPipe, ValidationPipe
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '../environment/config'
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { HaloDotApiModule } from './controllers/halo-dot-api/halo-dot-api.module';
import { SharedModule } from './shared/shared.module';
import { DiscordApiService } from './services/discord-api.service';
import { AllExceptionsFilter } from './globalExceptions';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./environment/.env'],
      isGlobal: true,
      load: [config],
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        // timeout: 15,
        // maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    HaloDotApiModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService, DiscordApiService],
})
export class AppModule { }
