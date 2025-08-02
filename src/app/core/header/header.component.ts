import { Component, inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NavbarComponent } from "../navbar/navbar.component";
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);


  openCreateAccountDialog(event?: Event): void {
    if (event && event.target instanceof HTMLElement) {
      event.target.blur();
    }
    this.dialog.open(CreateAccountDialogComponent);
  }

}
