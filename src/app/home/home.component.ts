import { Component } from '@angular/core';
import { PlaidService } from '../core/services/plaid.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private plaid: PlaidService) {}

  connectBank() {
    this.plaid.launchPlaidLink((accessToken: string) => {
      console.log('🎉 Received Plaid access token:', accessToken);
      // TODO: Store in state or fetch transactions
    });
  }

}
