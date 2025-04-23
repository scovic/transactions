
export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed'
}

export class Transaction {
  constructor(
    public id: string,
    public amount: number,
    public category: string,
    public status: TransactionStatus,
    public date: string,
  ) {}
}