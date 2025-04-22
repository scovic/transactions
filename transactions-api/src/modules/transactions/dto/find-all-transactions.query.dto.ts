import { TransactionStatus } from '../types/transaction-status.enum';

export class FindAllTransactionsQueryDto {
  public id?: string;

  public category?: string;

  public status?: TransactionStatus;
}
