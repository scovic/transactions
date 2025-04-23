import { Injectable, NotFoundException } from '@nestjs/common';
import { FindAllTransactionsQueryDto } from './dto/find-all-transactions.query.dto';
import { Transaction } from './entities/transaction.entity';
import { randomUUID } from 'crypto';
import { mockTransactions } from './mock-data';

export interface ITransactionRepository {
  findAll(query?: FindAllTransactionsQueryDto): Transaction[];
  find(id: string): Transaction;
  save(transaction: Omit<Transaction, 'id'>): Transaction;
  update(transaction: Transaction): Transaction;
  remove(id: string): void;
}

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  private transactions: Transaction[] = [...mockTransactions];

  findAll(query?: FindAllTransactionsQueryDto): Transaction[] {
    if (!query) return this.transactions;

    let transactions = this.transactions.filter((t) => {
      let isCatCorrect = true;
      let isStatusCorrect = true;

      if (query.category) {
        isCatCorrect = query.category === t.category;
      }

      if (query.status) {
        isStatusCorrect = query.status === t.status;
      }

      return isCatCorrect && isStatusCorrect;
    });

    if (query.perPage && query.page) {
      const startIndex = query.page * query.perPage;
      const endIndex = startIndex + query.perPage;
      transactions = transactions.slice(startIndex, endIndex);
    }

    return transactions;
  }

  find(id: string): Transaction {
    const transaction = this.transactions.find((t) => t.id === id);

    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }

    return transaction;
  }

  save(transaction: Omit<Transaction, 'id'>): Transaction {
    const t = {
      ...transaction,
      id: randomUUID(),
    };

    this.transactions.push(t);

    return t;
  }

  update(transaction: Transaction): Transaction {
    this.transactions = this.transactions.map((t) => {
      if (t.id !== transaction.id) return t;

      return transaction;
    });

    return transaction;
  }

  remove(id: string): void {
    this.transactions = this.transactions.filter((t) => t.id !== id);
  }
}
