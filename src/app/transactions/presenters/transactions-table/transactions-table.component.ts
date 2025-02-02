import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Transaction } from '../../../models/transaction';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-transactions-table',
  imports: [ CommonModule, MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent {
  tableColumns: string[] = ['date', 'description', 'amount'];

  @Input() set transactionData(transactions: Transaction[]){
    this.tableData = new MatTableDataSource<Transaction>(transactions)
    console.log(this.tableData);
    this.tableData.filter
  }
  tableData!: MatTableDataSource<Transaction>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableData.filter = filterValue.trim().toLowerCase();
  }


  constructor() {

  }
}
