import { Component, inject, Inject } from '@angular/core';
import { PlaidService } from '../core/services/plaid.service';
import { MatSnackBar  } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isConnectingToBank$! : Observable<boolean>

  
  constructor(private plaid: PlaidService, private snackbar: MatSnackBar) {
      this.isConnectingToBank$ = this.plaid.isConnectingToBank$;
  }
  
  connectBank() {
    this.plaid.launchPlaidLink().subscribe(res => {
      this.snackbar.open(res.message, 'Close', {
        duration: 3000,
        panelClass: res.success ? 'snackbar-success' : 'snackbar-error'
      });
    });
  }

  getAccountDetails() {
    this.plaid.getAccountDetails().subscribe(res => console.log("Get Account: " + res));
  }
}
