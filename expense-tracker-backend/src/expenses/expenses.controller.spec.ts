import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

describe('ExpensesController', () => {
  let controller: ExpensesController;
  let service: ExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [
        {
          provide: ExpensesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an expense', async () => {
      const createExpenseDto = { title: 'Test Expense', amount: 100, category: 'Food' };
      const expectedExpense = { id: 1, ...createExpenseDto, date: new Date() };
      (service.create as jest.Mock).mockResolvedValue(expectedExpense);

      const result = await controller.create(createExpenseDto);
      expect(result).toEqual(expectedExpense);
      expect(service.create).toHaveBeenCalledWith(createExpenseDto);
    });
  });

  describe('findAll', () => {
    it('should return all expenses', async () => {
      const expenses = [{ id: 1, title: 'Expense 1', amount: 50, category: 'Misc', date: new Date() }];
      (service.findAll as jest.Mock).mockResolvedValue(expenses);

      const result = await controller.findAll();
      expect(result).toEqual(expenses);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an expense by id', async () => {
      const expense = { id: 1, title: 'Expense 1', amount: 50, category: 'Misc', date: new Date() };
      (service.findOne as jest.Mock).mockResolvedValue(expense);

      const result = await controller.findOne('1');
      expect(result).toEqual(expense);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an expense', async () => {
      const updateExpenseDto = { title: 'Updated Expense' };
      const updatedExpense = { id: 1, title: 'Updated Expense', amount: 100, category: 'Food', date: new Date() };
      (service.update as jest.Mock).mockResolvedValue(updatedExpense);

      const result = await controller.update('1', updateExpenseDto);
      expect(result).toEqual(updatedExpense);
      expect(service.update).toHaveBeenCalledWith(1, updateExpenseDto);
    });
  });

  describe('remove', () => {
    it('should delete an expense', async () => {
      const expense = { id: 1, title: 'Expense 1', amount: 50, category: 'Misc', date: new Date() };
      (service.remove as jest.Mock).mockResolvedValue(expense);

      const result = await controller.remove('1');
      expect(result).toEqual(expense);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
