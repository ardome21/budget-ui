import { inject, Injectable } from '@angular/core';
import { UserApiService } from '../repository/service/user-api.service';
import { map, Observable } from 'rxjs';
import { UserData } from '../repository/types/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  email?: string;
  firstName?: string;
  lastName?: string;

  private _userApiService = inject(UserApiService)
  constructor() { }

  createUser(
    userData: {email: string, password: string, firstName: string, lastName: string}
  ): Observable<{message: string, user: UserData, success: string}> {
    return this._userApiService.createUser(userData).pipe(

    );
  }

  login(
    loginData: {email: string, password: string}
  ): Observable<{message: string, user: UserData, success: string}> {
    return this._userApiService.login(loginData).pipe(

    );
  }
}
