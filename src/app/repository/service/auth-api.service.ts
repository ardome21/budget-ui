import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserData } from '../types/user-data';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private baseUrl = 'https://pqnibwgrl2.execute-api.us-east-1.amazonaws.com'

  constructor(private http: HttpClient) { }

  createUser(
    userData: UserData
  ): Observable<{message: string; user: UserData}>{
    const payload = {
      "email": userData.email,
      "first_name": userData.first_name,
      "last_name": userData.last_name,
      "password": userData.password
    }
    return this.http.post<{message: string; user: UserData}>(
      this.baseUrl + '/sign-up',
      payload
    );
  }

  login(
    loginData: {email: string, password: string}
  ): Observable<{message: string; user: UserData; success: string; token: string}>{
    const payload = {
      "email": loginData.email,
      "password": loginData.password
    }
    return this.http.post<{message: string; user: UserData; success: string; token: string}>(
      this.baseUrl + '/login',
      payload,
      { withCredentials: true }
    );
  }

  verifyAuth(): Observable<{message: string; userData: UserData; success: boolean; token: string}> {
    return this.http.get<{message: string; userData: UserData; success: boolean; token: string}>(
      this.baseUrl + '/login', { withCredentials: true }
     );
  }

  logout(): Observable<{ success: string; message: string }> {
    return this.http.post<{ success: string; message: string }>(this.baseUrl + '/logout', {}, { withCredentials: true });
  }

}
