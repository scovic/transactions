import { TransactionStatus } from '../types/transaction-status.enum';

export class FindAllTransactionsQueryDto {
  public category?: string;

  public status?: TransactionStatus;

  public page?: number;

  public perPage?: number;
}
