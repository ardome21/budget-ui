import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from "../navbar/navbar.component";
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { filter, Observable, take } from 'rxjs';
import { UserProfile } from '../../../models/user-profile';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  private readonly _userService = inject(AuthService)

  userProfile$!: Observable<UserProfile | null>
  isAuthChecked = false;

  ngOnInit(): void {
  this.userProfile$ = this._userService.userProfile$;
  this._userService.authChecked$
    .pipe(
      filter(val => val === true), // Only continue when true
      take(1)                      // Only take the first true value
    )
    .subscribe(() => {
      // This runs only after isAuthChecked is true
      this.isAuthChecked = true;
      // Place any code here that should wait for auth check
    });
}

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
    console.log('User logged out');
  }

}
