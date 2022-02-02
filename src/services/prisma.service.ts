import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
/* When the server starts, connect to the database. */
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * It connects to the database.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * When the server is shutting down, close the application
   * @param {INestApplication} app - INestApplication
   */
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
