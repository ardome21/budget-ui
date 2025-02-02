import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionApiService {

  private apiUrl = '/api';

  constructor(private _http: HttpClient) { }

  getData(): Observable<any> {
    return this._http.get(`${this.apiUrl}/transactions`);
    // return this._http.get('http:///localhost:8080/transactions');

  }
}
