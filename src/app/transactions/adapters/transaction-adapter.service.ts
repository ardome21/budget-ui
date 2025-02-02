import { Injectable } from '@angular/core';
import { TransactionData } from '../../repository/types/transaction-data';
import { Transaction } from '../../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionAdapterService {
  fromData(data: TransactionData[]): Transaction[] {
    return data.map((item: TransactionData) => ({
      id: item.id,
      date: item.date,
      amount: item.transactionItem.amount,
      category: item.transactionItem.category,
      description: item.transactionItem.description
    }));
  }

  constructor() { }
}
