import { Injectable } from '@angular/core';
import { TransactionApiService } from '../../repository/service/transaction-api.service';
import { map, Observable, tap } from 'rxjs';
import { TransactionAdapterService } from '../adapters/transaction-adapter.service';
import { Transaction } from '../../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    private _transactionApi: TransactionApiService,
    private _transactionAdapter: TransactionAdapterService) { }

  getTransactionData(): Observable<Transaction[]> {
    return this._transactionApi.getData().pipe(
      map(data => this._transactionAdapter.fromData(data))
    );
  }

}
