import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../transactions.service';
import { TransactionRepository } from '../transactions.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionStatus } from '../types/transaction-status.enum';
import { DateFormatter } from '../utils/DateFormatter';
import { Transaction } from '../entities/transaction.entity';
import { TransactionsRepositoryMock } from './transactions.repository.mock';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let createdTransaction: Transaction;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: TransactionRepository,
          useClass: TransactionsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  describe('.create', () => {
    it('should create transaction', () => {
      const createTransactionDto: CreateTransactionDto = {
        amount: 100,
        category: 'inbound',
      };

      createdTransaction = service.create(createTransactionDto);

      expect(createdTransaction.amount).toEqual(createTransactionDto.amount);
      expect(createdTransaction.category).toEqual(
        createTransactionDto.category,
      );
      expect(createdTransaction.status).toEqual(TransactionStatus.PENDING);
      expect(createdTransaction.id).not.toBeUndefined();
      expect(createdTransaction.date).toBe(DateFormatter.format(new Date()));
    });

    it('should throw BadRequestException when amount is negative', () => {
      const createTransactionDto: CreateTransactionDto = {
        amount: -50,
        category: 'inbound',
      };
      let error: Error | null = null;

      try {
        service.create(createTransactionDto);
      } catch (err: any) {
        error = err as Error;
      }

      expect(error).not.toBeNull();
      expect(error!.message).toEqual('Amount should not be negative');
    });
  });

  describe('.find', () => {
    it('should find created transaction', () => {
      const foundTransaction = service.findOne(createdTransaction.id);

      expect(foundTransaction.id).toEqual(createdTransaction.id);
      expect(foundTransaction.amount).toEqual(createdTransaction.amount);
      expect(foundTransaction.category).toEqual(createdTransaction.category);
      expect(foundTransaction.status).toEqual(createdTransaction.status);
      expect(foundTransaction.date).toEqual(createdTransaction.date);
    });

    it('should return NotFoundException when transaction does not exists', () => {
      const id = 'some-non-existing-id';
      let error: Error | null = null;

      try {
        service.findOne(id);
      } catch (err: any) {
        error = err as Error;
      }

      expect(error).not.toBeNull();
      expect(error!.message).toEqual(`Transaction with id ${id} not found`);
    });
  });

  describe('.update', () => {
    it('should update transaction', () => {
      const updatedTransaction = service.update(createdTransaction.id, {
        status: TransactionStatus.COMPLETED,
      });

      expect(updatedTransaction.id).toEqual(createdTransaction.id);
      expect(updatedTransaction.status).toEqual(TransactionStatus.COMPLETED);
    });

    it('should return NotFoundException when trying to update transaction that does not exists', () => {
      const id = 'some-non-existing-id';
      let error: Error | null = null;

      try {
        service.update(id, { status: TransactionStatus.COMPLETED });
      } catch (err: any) {
        error = err as Error;
      }

      expect(error).not.toBeNull();
      expect(error!.message).toEqual(`Transaction with id ${id} not found`);
    });
  });

  describe('.findAll', () => {
    let createdTransaction2: Transaction;

    beforeAll(() => {
      createdTransaction2 = service.create({
        amount: 45,
        category: 'expenses',
      });
    });

    it('should list all transactions', () => {
      const transactions = service.findAll();

      expect(transactions.length).toBe(2);
    });

    it('should list only one transaction based on status filter query', () => {
      const transactions = service.findAll({
        status: TransactionStatus.PENDING,
      });

      expect(transactions.length).toBe(1);
      expect(transactions[0].id).toEqual(createdTransaction2.id);
    });

    it('should list none based on query', () => {
      const transactions = service.findAll({
        status: TransactionStatus.COMPLETED,
        category: 'expenses',
      });

      expect(transactions.length).toBe(0);
    });
  });
});
