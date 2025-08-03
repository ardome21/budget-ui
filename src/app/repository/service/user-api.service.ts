import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from '../types/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private createUserApi = 'https://o1hqoxlb2i.execute-api.us-east-1.amazonaws.com/default/budget-signup'
  private loginApi = ''

  constructor(private http: HttpClient) { }

  createUser(
    userData: {email: string, password: string, firstName: string, lastName: string}
  ): Observable<{message: string; user: UserData; success: string}>{
    const payload = {
      "email": userData.email,
      "password": userData.password,
      "firstName": userData.firstName,
      "lastName": userData.lastName
    }

    return this.http.post<{message: string; user: UserData; success: string}>(
      this.createUserApi,
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
      payload
    );
  }

}
