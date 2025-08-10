import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaidApiService {

  baseurl = 'https://vqcu8k72rl.execute-api.us-east-1.amazonaws.com'
  constructor(private http: HttpClient) { }

  createLinkToken(userId: string): Observable<{ link_token: string }> {
    return this.http.post<{ link_token: string }>(
      this.baseurl + '/get-plaid-link',
      { user_id: userId }
    );
  }

  exchangePublicToken(publicToken: string): Observable<{ access_token: string; item_id: string }> {
    return this.http.post<{ access_token: string; item_id: string }>(
     this.baseurl + '/exchange-plaid-token',
      { public_token: publicToken }
    );
  }
}
