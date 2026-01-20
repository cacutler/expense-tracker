import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // -----------------------------------------------------------------------
    // FIX: Explicitly pass the database URL to the PrismaClient constructor
    // because it is no longer defined in schema.prisma.
    // -----------------------------------------------------------------------
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    } as any);
  }
  async onModuleInit() {
    await this.$connect();
  }
}