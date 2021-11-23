import { DiscordCommandProvider } from '@discord-nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HaloDotApiMiddleware } from 'src/middleware/halo-dot-api.middleware';
import { SharedModule } from 'src/shared/shared.module';
import { HaloDotApiController } from './halo-dot-api.controller';

@Module({
  imports: [
    SharedModule,
    HttpModule.register({
      // headers: {
      //   'Authorization': 'Cryptum-Token HIDM6WWaSZUc15AhW8jAPc3kJoAlOizH63Kn3XGqn4gmHEgBxO3dfEj1oqbMe2Oq',
      //   'Cryptum-API-Version': 'Cryptum-API-Version: 2.3-alpha'
      // }
    })
  ],
  controllers: [HaloDotApiController],
  providers: []
})
export class HaloDotApiModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HaloDotApiMiddleware)
      .forRoutes(HaloDotApiController)
  }
}
