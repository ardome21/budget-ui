import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-transactions-table',
  imports: [ CommonModule, MatTableModule ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent {
  @Input()
  transactionData: any[] = []

  displayedColumns: string[] = ['date', 'description', 'amount'];
}
