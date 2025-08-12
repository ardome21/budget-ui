import { Component, inject, Inject } from '@angular/core';
import { PlaidService } from '../core/services/plaid.service';
import { MatSnackBar  } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isConnectingToBank$! : Observable<boolean>
  institution: string = ''

  
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
    this.plaid.getAccountDetails(this.institution).subscribe(res => console.log("Get Account: " + res));
  }
}
