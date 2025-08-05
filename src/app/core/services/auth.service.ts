import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { UserProfile } from '../../models/user-profile';
import { UserApiService as AuthApiService } from '../../repository/service/auth-api.service';
import { UserAdapterService as AuthAdapterService } from '../adapters/user-adapter.service';
import { UserData } from '../../repository/types/user-data';
;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _userProfile = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$ = this._userProfile.asObservable();

  private _authChecked = new BehaviorSubject<boolean>(false);
  public authChecked$ = this._authChecked.asObservable();


  private _authApiService = inject(AuthApiService)
  private _authAdapterService = inject(AuthAdapterService)

  constructor() {
    this.checkAuthStatus().subscribe({
      next: () => this._authChecked.next(true),
      error: () => this._authChecked.next(true)
    });
  }

  createUser(
    userData: UserData
  ): Observable<{message: string, user: UserData, success: string}> {
    return this._authApiService.createUser(userData).pipe(

    );
  }

  login(
    loginData: {email: string, password: string}
  ): Observable<{message: string, user: UserData, success: string}> {
    return this._authApiService.login(loginData).pipe(
      tap(res => {
        const userProfile = this._authAdapterService.fromData(res.user);
        this._userProfile.next(userProfile);
        sessionStorage.setItem('user', JSON.stringify(userProfile));
      })
    );
  }

  logout(): void {
    this._authApiService.logout().subscribe(() => {
      this._userProfile.next(null);
      sessionStorage.removeItem('user');
      console.log('User logged out');
    });
  }

  checkAuthStatus(): Observable<UserProfile | null> {
    console.log('Checking authentication status...');
    return this._authApiService.verifyAuth().pipe(
      tap((res) => {
          console.log('Auth verification response:', res);
          if (res.success === 'true') {
            console.log('User is authenticated:', res.userData);
            const userProfile = this._authAdapterService.fromData(res.userData);
            console.log('User profile:', userProfile);
            this._userProfile.next(userProfile);
            sessionStorage.setItem('user', JSON.stringify(userProfile));
          } else {
            this._userProfile.next(null);
            sessionStorage.removeItem('user');
          }
      }),
      map(res => res.success === 'true'
        ? this._authAdapterService.fromData(res.userData)
        : null
      ),
      catchError(() => {
        this._userProfile.next(null);
        sessionStorage.removeItem('user');
        return of(null);
      })
    );
  }
}
