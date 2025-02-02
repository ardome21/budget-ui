import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions-table',
  imports: [ CommonModule ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent implements OnInit {

  @Input()
  transactionData: any[] = []

  ngOnInit(): void {
    console.log(this.transactionData);
  }

}
