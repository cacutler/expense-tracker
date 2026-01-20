import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private prisma: PrismaService) {}
  async create(createExpenseDto: CreateExpenseDto, userId: number) {
    return this.prisma.expense.create({
      data: {
        // 2. Spread the DTO properties (title, amount, category)
        ...createExpenseDto,
        
        // 3. Explicitly link the User relation
        userId: userId, 
      },
    });
  }

  async findAll() {
    return this.prisma.expense.findMany({include: {user: true}});
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
