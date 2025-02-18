import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { TransactionsTableComponent } from "../../presenters/transactions-table/transactions-table.component";
import { Transaction } from '../../../models/transaction';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [TransactionsTableComponent, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {

  transactionData!: Transaction[];

  constructor (private _transactionService: TransactionsService) {}

  ngOnInit(): void {
    this._transactionService.getTransactionData().subscribe((data) => {
      this.transactionData = data;
    })
  }

}
