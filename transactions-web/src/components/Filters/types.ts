import { TransactionStatus } from "../../models/Transaction";

export enum StatusFilterOption {
  ALL = 'all',
  PENDING = TransactionStatus.PENDING,
  COMPLETED = TransactionStatus.COMPLETED
}
