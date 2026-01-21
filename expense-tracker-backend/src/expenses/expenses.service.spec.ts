import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: PrismaService,
          useValue: {
            expense: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an expense', async () => {
      const createExpenseDto = { title: 'Test Expense', amount: 100, category: 'Food' };
      const expectedExpense = { id: 1, ...createExpenseDto, date: new Date() };
      (prismaService.expense.create as jest.Mock).mockResolvedValue(expectedExpense);

      const result = await service.create(createExpenseDto);
      expect(result).toEqual(expectedExpense);
      expect(prismaService.expense.create).toHaveBeenCalledWith({ data: createExpenseDto });
    });
  });

  describe('findAll', () => {
    it('should return all expenses', async () => {
      const expenses = [{ id: 1, title: 'Expense 1', amount: 50, category: 'Misc', date: new Date() }];
      (prismaService.expense.findMany as jest.Mock).mockResolvedValue(expenses);

      const result = await service.findAll();
      expect(result).toEqual(expenses);
      expect(prismaService.expense.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an expense by id', async () => {
      const expense = { id: 1, title: 'Expense 1', amount: 50, category: 'Misc', date: new Date() };
      (prismaService.expense.findUnique as jest.Mock).mockResolvedValue(expense);

      const result = await service.findOne(1);
      expect(result).toEqual(expense);
      expect(prismaService.expense.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if expense not found', async () => {
      (prismaService.expense.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow('Expense with ID 1 not found');
    });
  });

  describe('update', () => {
    it('should update an expense', async () => {
      const updateExpenseDto = { title: 'Updated Expense' };
      const updatedExpense = { id: 1, title: 'Updated Expense', amount: 100, category: 'Food', date: new Date() };
      (prismaService.expense.update as jest.Mock).mockResolvedValue(updatedExpense);

      const result = await service.update(1, updateExpenseDto);
      expect(result).toEqual(updatedExpense);
      expect(prismaService.expense.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateExpenseDto });
    });
  });

  describe('remove', () => {
    it('should delete an expense', async () => {
      const expense = { id: 1, title: 'Expense 1', amount: 50, category: 'Misc', date: new Date() };
      (prismaService.expense.delete as jest.Mock).mockResolvedValue(expense);

      const result = await service.remove(1);
      expect(result).toEqual(expense);
      expect(prismaService.expense.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
