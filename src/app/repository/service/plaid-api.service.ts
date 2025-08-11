import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaidApiService {

  private baseurl = 'https://pqnibwgrl2.execute-api.us-east-1.amazonaws.com'
  constructor(private http: HttpClient) { }

  createLinkToken(userId: string): Observable<{ link_token: string }> {
    return this.http.post<{ link_token: string }>(
      this.baseurl + '/get-plaid-link',
      { user_id: userId }
    );
  }

  exchangePublicToken(userId: string, public_token: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
     this.baseurl + '/exchange-plaid-token',
      {
        user_id: userId,
        public_token: public_token
      }
    );
  }

  getAccountDetails():Observable<any>{
    return this.http.post<any>(
      this.baseurl + '/get-account-details',
      {
        user_id: 'UID001',
        institution: 'Chase'
      },
      { withCredentials: true }
    );
  }
}
