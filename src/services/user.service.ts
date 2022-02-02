import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BotUser, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  /**
   * It creates a new instance of the PrismaService and assigns it to the prisma property.
   * @param {PrismaService} prisma - The PrismaService instance.
   */
  constructor(private prisma: PrismaService) {}

  /**
   * Find a unique BotUser by its id
   * @param userWhereUniqueInput - Prisma.BotUserWhereUniqueInput
   * @returns A BotUser object
   */
  async user(
    userWhereUniqueInput: Prisma.BotUserWhereUniqueInput,
  ): Promise<BotUser | null> {
    return this.prisma.botUser.findUnique({
      where: userWhereUniqueInput,
    });
  }

  /**
   * It returns a list of users.
   * @param params - {
   * @returns An array of BotUser objects.
   */
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

  /**
   * Create a new user
   * @param data - The data that will be used to create the user.
   * @returns A BotUser object
   */
  async createUser(data: Prisma.BotUserCreateInput): Promise<BotUser> {
    return this.prisma.botUser.create({
      data,
    });
  }

  /**
   * It updates a user.
   * @param params - {
   * @returns The updated user.
   */
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

  /**
   * It deletes a user from the database.
   * @param where - A unique identifier for the user.
   * @returns The botUser object that was deleted.
   */
  async deleteUser(where: Prisma.BotUserWhereUniqueInput): Promise<BotUser> {
    return this.prisma.botUser.delete({
      where,
    });
  }
}
