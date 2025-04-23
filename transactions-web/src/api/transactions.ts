import axios from 'axios';
import { CommonResponse } from './types/response';
import { env } from '../config/env';
import { Transaction } from '../models/Transaction';

const TRANSACTIONS_API_ENDPOINT = `${env.API_URL}/transactions`;

export const findAllTransactions = async () => {
  const response = await axios.get<CommonResponse<Transaction[]>>(TRANSACTIONS_API_ENDPOINT)
  return response.data.success?.data;
}
