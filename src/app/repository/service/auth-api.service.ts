import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserData } from '../types/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private signupApi = 'https://o1hqoxlb2i.execute-api.us-east-1.amazonaws.com/default/budget-signup'
  private loginApi = 'https://ssovvyy0h7.execute-api.us-east-1.amazonaws.com/default/budget-login'
  private verifyAuthApi = 'https://ssovvyy0h7.execute-api.us-east-1.amazonaws.com/default/budget-verify-auth'
  private logoutApi = 'https://ssovvyy0h7.execute-api.us-east-1.amazonaws.com/default/budget-logout'
  constructor(private http: HttpClient) { }

  createUser(
    userData: UserData
  ): Observable<{message: string; user: UserData; success: string}>{
    const payload = {
      "email": userData.email,
      "first_name": userData.first_name,
      "last_name": userData.last_name,
      "password": userData.password
    }
    return this.http.post<{message: string; user: UserData; success: string}>(
      this.signupApi,
      payload
    );
  }

  login(
    loginData: {email: string, password: string}
  ): Observable<{message: string; user: UserData; success: string}>{
    const payload = {
      "email": loginData.email,
      "password": loginData.password
    }
    return this.http.post<{message: string; user: UserData; success: string}>(
      this.loginApi,
      payload,
      { withCredentials: true }
    );
  }

  logout(): Observable<{ success: string; message: string }> {
    return this.http.post<{ success: string; message: string }>(this.logoutApi, {}, { withCredentials: true });
  }

  verifyAuth(): Observable<{message: string; userData: UserData; success: string}> {
    return this.http.get<{message: string; userData: UserData; success: string}>(
      this.verifyAuthApi, { withCredentials: true }
     );
  }
}
