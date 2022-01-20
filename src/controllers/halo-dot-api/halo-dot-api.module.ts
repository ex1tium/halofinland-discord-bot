import { DiscordCommandProvider } from '@discord-nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/globalExceptions';
import { HaloDotApiMiddleware } from 'src/middleware/halo-dot-api.middleware';
import { HaloDotApiService } from 'src/services/haloDotApi/halodotapi.service';
import { SharedModule } from 'src/shared/shared.module';
import { HaloDotApiController } from './halo-dot-api.controller';

@Module({
  imports: [
    SharedModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_configService: ConfigService) => ({
        // headers: {
        //   'Authorization': `Cryptum-Token ${_configService.get('haloDotToken')}`,
        //   'Content-Type': 'application/json',
        //   'Cryptum-API-Version': '2.3-alpha'
        // }
      }),
      inject: [ConfigService],
    }),
    HaloDotApiModule
    // HttpModule.register({
    //   headers: {
    //     'Authorization': 'Cryptum-Token HIDM6WWaSZUc15AhW8jAPc3kJoAlOizH63Kn3XGqn4gmHEgBxO3dfEj1oqbMe2Oq',
    //     'Cryptum-API-Version': 'Cryptum-API-Version: 2.3-alpha'
    //   }
    // })
  ],
  controllers: [HaloDotApiController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    HaloDotApiService]
})
export class HaloDotApiModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HaloDotApiMiddleware)
      .forRoutes(HaloDotApiController)
  }
}
