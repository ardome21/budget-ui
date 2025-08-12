import { inject, Injectable } from '@angular/core';
import { PlaidApiService } from '../../repository/service/plaid-api.service';
import { AuthService } from '../auth/services/auth.service';
import { BehaviorSubject, filter, finalize, Observable, switchMap, take, tap } from 'rxjs';

declare var Plaid: any;

@Injectable({
  providedIn: 'root'
})
export class PlaidService {

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
      switchMap(() =>
        this.plaidApi.createLinkToken().pipe(
          switchMap(res => new Observable<{ success: boolean; message: string }>(observer => {
            const handler = Plaid.create({
              token: res.link_token,
              onSuccess: (public_token: string) => {
                this.plaidApi.exchangePublicToken(public_token).subscribe({
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
                observer.next({
                  success: false,
                  message: err ? 'Plaid exited with error' : 'Plaid flow exited'
                });
                observer.complete();
              }
            });

            handler.open();
          }))
        )
      ),
      finalize(() => this._isConnectingToBank.next(false))
    );
  }


  getAccountDetails(institution: string): Observable<any>{
    return this.plaidApi.getAccountDetails(institution)
  }

}

