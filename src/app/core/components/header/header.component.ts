import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from "../navbar/navbar.component";
import { CreateAccountDialogComponent } from '../../auth/components/create-account-dialog/create-account-dialog.component';
import { LoginDialogComponent } from '../../auth/components/login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { filter, Observable, take } from 'rxjs';
import { UserProfile } from '../../../models/user-profile';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  readonly dialog = inject(MatDialog);
  private readonly _userService = inject(AuthService)

  userProfile$ = this._userService.userProfile$;
  authChecked$ = this._userService.authChecked$;

  // userProfile$!: Observable<UserProfile | null>
  // isAuthChecked = false;

  // ngOnInit(): void {
  //   this.userProfile$ = this._userService.userProfile$;
  //   this._userService.authChecked$
  //     .pipe(
  //       filter(val => val === true),
  //       take(1)
  //     )
  //     .subscribe(() => {
  //       this.isAuthChecked = true;
  //     });
  // }

  openCreateAccountDialog(event?: Event): void {
    if (event && event.target instanceof HTMLElement) {
      event.target.blur();
    }
    this.dialog.open(CreateAccountDialogComponent);
  }

  openLoginDialog(event?: Event): void {
    if (event && event.target instanceof HTMLElement) {
      event.target.blur();
    }
    this.dialog.open(LoginDialogComponent);
  }

  logout(): void {
    this._userService.logout();
  }

}
