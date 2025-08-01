import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransactionData } from '../types/transaction-data';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  constructor() { }

  getData(): Observable<TransactionData[]> {
    return of([ {
      id: 1,
      date: 'Date',
      transactionItem: {
          amount: 1,
          category: 'category',
          description: 'description'
      }

    }])
  }
}
