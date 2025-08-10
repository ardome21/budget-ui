import { Injectable } from '@angular/core';
import { UserProfile } from '../../../models/user-profile';
import { UserData } from '../../../repository/types/user-data';

@Injectable({
  providedIn: 'root'
})
export class UserAdapterService {

  constructor() { }

  fromData(userData: UserData): UserProfile {
    if (!userData.user_id) {
      throw new Error('User ID is required');
    }
    return {
      email: userData.email,
      userId: userData.user_id,
      firstName: userData.first_name,
      lastName: userData.last_name
    }
  }
}
