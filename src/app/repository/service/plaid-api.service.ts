import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaidApiService {

  createLink = 'https://saxtr05tma.execute-api.us-east-1.amazonaws.com/default/budget-create-plaid-link'
  exchangeToken = 'https://fadqo69lu2.execute-api.us-east-1.amazonaws.com/default/budget-exchange-plaid-token'

  constructor(private http: HttpClient) { }

  createLinkToken(userId: string): Observable<{ link_token: string }> {
    return this.http.post<{ link_token: string }>(
      this.createLink,
      { user_id: userId }
    );
  }

  exchangePublicToken(publicToken: string): Observable<{ access_token: string; item_id: string }> {
    return this.http.post<{ access_token: string; item_id: string }>(
     this.exchangeToken,
      { public_token: publicToken }
    );
  }
}
