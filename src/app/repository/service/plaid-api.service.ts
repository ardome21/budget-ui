import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaidApiService {

  private baseurl = 'https://pqnibwgrl2.execute-api.us-east-1.amazonaws.com'
  constructor(private http: HttpClient) { }

  createLinkToken(): Observable<{ link_token: string }> {
    return this.http.post<{ link_token: string }>(
      this.baseurl + '/get-plaid-link',
      {},
      { withCredentials: true}
    );
  }

  exchangePublicToken(public_token: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(
     this.baseurl + '/exchange-plaid-token',
      { public_token: public_token },
      { withCredentials: true }
    );
  }

  getAccountDetails(institution: string):Observable<any>{
    return this.http.post<any>(
      this.baseurl + '/get-account-details',
      { institution: institution },
      { withCredentials: true }
    );
  }
}
