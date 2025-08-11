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
    filter(this.hasValidProfile),
    take(1),
    tap(() => this._isConnectingToBank.next(true)),
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


  // launchPlaidLink(onComplete: (success: boolean, message: string) => void): void {
  //   this._authService.userProfile$.pipe(
  //     filter(this.hasValidProfile),
  //     take(1)
  //   ).subscribe({
  //     next: (profile) => {
  //       const userId = profile.userId;
  //       this.plaidApi.createLinkToken(userId).subscribe({
  //         next: (res) => {
  //           const handler = Plaid.create({
  //             token: res.link_token,
  //             onSuccess: (public_token: string) => {
  //               this.plaidApi.exchangePublicToken(public_token).subscribe({
  //                 next: (exchange) => {
  //                   onComplete(true, exchange.message || 'Bank connected successfully');
  //                 },
  //                 error: (err: any) => {
  //                   console.error('Token exchange failed:', err);
  //                   onComplete(false, 'Token exchange failed');
  //                 }
  //               });
  //             },
  //             onExit: (err: any) => {
  //               if (err) {
  //                 console.warn('Plaid exited with error:', err);
  //                 onComplete(false, 'Plaid exited with error')
  //               }
  //             }
  //           });
  //           handler.open();
  //         },
  //         error: (err: any) => {
  //           console.error('Failed to create link token:', err);
  //           onComplete(false, 'Failed to create link token');
  //         }
  //       });
  //     },
  //     error: (err: any) => {
  //       console.error('Failed to get user profile:', err);
  //       onComplete(false, 'Failed to get user profile');
  //     }
  //   });
  // }

}

