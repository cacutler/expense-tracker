import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ExpensesModule } from './expenses/expenses.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
