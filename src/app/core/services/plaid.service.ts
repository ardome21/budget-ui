import { Injectable } from '@angular/core';
import { PlaidApiService } from '../../repository/service/plaid-api.service';

declare var Plaid: any;

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

  userId: string = 'unique_user_id_123'; // TODO: Get User ID from User service

  constructor(private plaidApi: PlaidApiService) {}

launchPlaidLink(onComplete: (accessToken: string) => void): void {
    const userId = this.userId

    this.plaidApi.createLinkToken(userId).subscribe({
      next: (res) => {
        const handler = Plaid.create({
          token: res.link_token,
          onSuccess: (public_token: string, metadata: any) => {
            this.plaidApi.exchangePublicToken(public_token).subscribe({
              next: (exchange) => {
                console.log('✅ Access Token:', exchange.access_token);
                onComplete(exchange.access_token);
              },
              error: (err: any) => console.error('Token exchange failed:', err)
            });
          },
          onExit: (err: any, metadata: any) => {
            if (err) console.warn('Plaid exited with error:', err);
          }
        });

        handler.open();
      },
      error: (err: any) => {
        console.error('Failed to create link_token:', err);
      }
    });
  }

}

