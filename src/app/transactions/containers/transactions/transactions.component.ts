import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionsTableComponent } from "../../presenters/transactions-table/transactions-table.component";
import { Transaction } from '../../../models/transaction';

@Component({
  selector: 'app-transactions',
  imports: [TransactionsTableComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  transactionData: Transaction[] = [];

  constructor (private _transactionService: TransactionsService) {}

  ngOnInit(): void {
    this._transactionService.getTransactionData().subscribe((data) => {
      this.transactionData = data;
      console.log(this.transactionData)
    })
  }

}
