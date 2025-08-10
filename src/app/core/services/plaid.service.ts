import { inject, Injectable } from '@angular/core';
import { PlaidApiService } from '../../repository/service/plaid-api.service';
import { AuthService } from '../auth/services/auth.service';
import { filter, take, tap } from 'rxjs';

declare var Plaid: any;

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

  userId!: string | undefined

  constructor(
    private plaidApi: PlaidApiService, private _authService: AuthService) {}

  private hasValidProfile(profile: any): profile is { userId: string } {
    return profile && typeof profile.userId === 'string' && profile.userId.length > 0;
  }

  launchPlaidLink(onComplete: (accessToken: string) => void): void {
    this._authService.userProfile$.pipe(
      filter(this.hasValidProfile),
      take(1)
    ).subscribe({
      next: (profile) => {
        const userId = profile.userId;
        
        this.plaidApi.createLinkToken(userId).subscribe({
      next: (res) => {
        const handler = Plaid.create({
          token: res.link_token,
          onSuccess: (public_token: string, metadata: any) => {
            this.plaidApi.exchangePublicToken(public_token).subscribe({
              next: (exchange) => {
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
      },
      error: (err: any) => {
        console.error('Failed to get user profile:', err);
      }
    });
  }

}

