import { Injectable } from '@angular/core';
import { UserProfile } from '../../../models/user-profile';
import { UserData } from '../../../repository/types/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserAdapterService {

  constructor() { }

  fromData(userData: UserData): UserProfile {
    return {
      email: userData.email,
      firstName: userData.first_name,
      lastName: userData.last_name
    }
  }
}
