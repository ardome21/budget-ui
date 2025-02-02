import { Injectable } from '@angular/core';
import { TransactionApiService } from '../../repository/service/transaction-api.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private _transactionApi: TransactionApiService) { }

  getTransactionData(): Observable<any> {
    return this._transactionApi.getData();
  }

}
