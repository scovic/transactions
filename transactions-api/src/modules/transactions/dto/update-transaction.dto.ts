import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { TransactionStatus } from '../types/transaction-status.enum';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  public status?: TransactionStatus;
}
