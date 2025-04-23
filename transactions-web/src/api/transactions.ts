import axios from 'axios';
import { CommonResponse } from './types/response';
import { env } from '../config/env';
import { Transaction } from '../models/Transaction';
import { CreateTransactionDto } from './types/create-transaction.dto';

const TRANSACTIONS_API_ENDPOINT = `${env.API_URL}/transactions`;

export const findAllTransactions = async () => {
  const response = await axios.get<CommonResponse<Transaction[]>>(TRANSACTIONS_API_ENDPOINT)
  return response.data.success?.data;
}

export const createTransaction = async (createTransactionDto: CreateTransactionDto) => {
  const response = await axios.post<CommonResponse<Transaction>>(
    TRANSACTIONS_API_ENDPOINT,
    createTransactionDto
  )

  return response.data.success!.data;
}

export const updateTransaction = async (updatedTransaction: Transaction) => {
  const response = await axios.patch<CommonResponse<Transaction>>(
    `${TRANSACTIONS_API_ENDPOINT}/${updatedTransaction.id}`,
    updatedTransaction
  )

  return response.data.success!.data;
}

export const deleteTransaction = async (id: string) => {
  await axios.delete(`${TRANSACTIONS_API_ENDPOINT}/${id}`)
}
