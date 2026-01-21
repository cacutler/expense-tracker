import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}
  async create(createExpenseDto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: {...createExpenseDto}
    });
  }

  async findAll() {
    return this.prisma.expense.findMany();
  }

  async findOne(id: number) {
    return this.prisma.expense.findUnique({where: {id}});
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
