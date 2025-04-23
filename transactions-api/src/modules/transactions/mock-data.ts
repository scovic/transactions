import { randomUUID } from 'crypto';
import { Transaction } from './entities/transaction.entity';
import { TransactionStatus } from './types/transaction-status.enum';
import { DateFormatter } from './utils/DateFormatter';

export const mockTransactions: Transaction[] = [
  {
    id: randomUUID(),
    amount: 100,
    category: 'inbound',
    status: TransactionStatus.COMPLETED,
    date: DateFormatter.format(new Date()),
  },
  {
    id: randomUUID(),
    amount: 150,
    category: 'outbound',
    status: TransactionStatus.COMPLETED,
    date: DateFormatter.format(new Date()),
  },
  {
    id: randomUUID(),
    amount: 50,
    category: 'expenses',
    status: TransactionStatus.PENDING,
    date: DateFormatter.format(new Date()),
  },
];
