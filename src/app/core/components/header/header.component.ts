import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from "../navbar/navbar.component";
import { CreateAccountDialogComponent } from '../../auth/components/create-account-dialog/create-account-dialog.component';
import { LoginDialogComponent } from '../../auth/components/login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  readonly dialog = inject(MatDialog);
  private readonly _userService = inject(AuthService)

  userProfile$ = this._userService.userProfile$;
  authChecked$ = this._userService.authChecked$;

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
