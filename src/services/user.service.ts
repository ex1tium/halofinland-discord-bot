import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  BotUser,
  Prisma
} from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async user(userWhereUniqueInput: Prisma.BotUserWhereUniqueInput): Promise<BotUser | null> {
    return this.prisma.botUser.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BotUserWhereUniqueInput;
    where?: Prisma.BotUserWhereInput;
    orderBy?: Prisma.BotUserOrderByWithRelationInput;
  }): Promise<BotUser[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.botUser.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.BotUserCreateInput): Promise<BotUser> {
    return this.prisma.botUser.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.BotUserWhereUniqueInput;
    data: Prisma.BotUserUpdateInput;
  }): Promise<BotUser> {
    const { where, data } = params;
    return this.prisma.botUser.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.BotUserWhereUniqueInput): Promise<BotUser> {
    return this.prisma.botUser.delete({
      where,
    });
  }
}