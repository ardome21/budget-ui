import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionData } from '../types/transaction-data';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  private apiUrl = '/api';

  constructor(private _http: HttpClient) { }

  getData(): Observable<TransactionData[]> {
    return this._http.get<TransactionData[]>(`${this.apiUrl}/transactions`);
    // return this._http.get('http:///localhost:8080/transactions');

  }
}
