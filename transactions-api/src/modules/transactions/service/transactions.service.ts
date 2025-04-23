import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionRepository } from '../transactions.repository';
import { TransactionStatus } from '../types/transaction-status.enum';
import { FindAllTransactionsQueryDto } from '../dto/find-all-transactions.query.dto';
import { DateFormatter } from '../utils/DateFormatter';

@Injectable()
export class TransactionsService {
  constructor(private transactionRepository: TransactionRepository) {}

  public create(createTransactionDto: CreateTransactionDto) {
    const transaction = {
      ...createTransactionDto,
      status: TransactionStatus.PENDING,
      date: DateFormatter.format(new Date()),
    };

    return this.transactionRepository.save(transaction);
  }

  public findAll(query: FindAllTransactionsQueryDto) {
    return this.transactionRepository.findAll(query);
  }

  public findOne(id: string) {
    return this.transactionRepository.find(id);
  }

  public update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = this.transactionRepository.find(id);

    return this.transactionRepository.update({
      ...transaction,
      ...updateTransactionDto,
    });
  }

  public remove(id: string) {
    return this.transactionRepository.remove(id);
  }
}
