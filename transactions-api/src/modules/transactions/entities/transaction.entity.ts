import { TransactionStatus } from '../types/transaction-status.enum';

export class Transaction {
  public id: string;
  public amount: number;
  public date: string;
  public category: string;
  public status: TransactionStatus;
}
