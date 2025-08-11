import { inject, Injectable } from '@angular/core';
import { PlaidApiService } from '../../repository/service/plaid-api.service';
import { AuthService } from '../auth/services/auth.service';
import { BehaviorSubject, filter, finalize, Observable, switchMap, take, tap } from 'rxjs';

declare var Plaid: any;

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

  userId!: string | undefined

  private _isConnectingToBank = new BehaviorSubject<boolean>(false);
  isConnectingToBank$ = this._isConnectingToBank.asObservable();

  setConnectingToBank(state: boolean) {
    this._isConnectingToBank.next(state);
  }

  constructor(
    private plaidApi: PlaidApiService, private _authService: AuthService) {}

  private hasValidProfile(profile: any): profile is { userId: string } {
    return profile && typeof profile.userId === 'string' && profile.userId.length > 0;
  }

  launchPlaidLink(): Observable<{ success: boolean; message: string }> {
    return this._authService.userProfile$.pipe(
      tap(() => this._isConnectingToBank.next(true)),
      filter(this.hasValidProfile),
      take(1),
      switchMap(profile => {
        const userId = profile.userId;

        return this.plaidApi.createLinkToken(userId).pipe(
          switchMap(res => new Observable<{ success: boolean; message: string }>(observer => {
            const handler = Plaid.create({
              token: res.link_token,
              onSuccess: (public_token: string) => {
                this.plaidApi.exchangePublicToken(userId, public_token).subscribe({
                  next: exchange => {
                    observer.next({ success: true, message: exchange.message || 'Bank connected successfully' });
                    observer.complete();
                  },
                  error: () => {
                    observer.next({ success: false, message: 'Token exchange failed' });
                    observer.complete();
                  }
                });
              },
              onExit: (err: any) => {
                if (err) {
                  observer.next({ success: false, message: 'Plaid exited with error' });
                } else {
                  observer.next({ success: false, message: 'Plaid flow exited' });
                }
                observer.complete();
              }
            });

            handler.open();
          })),
        );
      }),
      finalize(() => this._isConnectingToBank.next(false)) // stop loading
    );
  }

}

