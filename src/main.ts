import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/globalExceptions';
// import { HttpExceptionFilter } from './globalExceptions';
// import process, { kill } from 'process';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);

}

bootstrap();

process.on('uncaughtException', (error) => {

  // POSSIBLY BAD IDEA. PREVENT APP FROM CRASHING IF THIS LISTENER IS ON.
  console.error(`possible fatal error: ${error}`);


  // TRIED TO MANUALLY CRASH APP AFTER this listener has triggered. Doesn't work as hoped?
  // process.kill(process.pid, 'SIGKILL')

  // process.kill(process.pid, 'SIGTERM')
  // process.exit(process.exitCode)

  // process.abort()
});
