import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Transaction } from '../../../models/transaction';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TransactionCategory } from '../../../models/enums/transaction-category';


@Component({
  selector: 'app-transactions-table',
  imports: [ CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent implements OnInit {

  @Input() set transactionData(transactions: Transaction[]){
    this.tableData = new MatTableDataSource<Transaction>(transactions)
  }

  tableColumns: string[] = ['date', 'description', 'amount', 'category'];
  tableData!: MatTableDataSource<Transaction>;
  categories = Object.values(TransactionCategory);
  selectedCategories: string[] = []

  ngOnInit(): void {
    this.setUpFilter();
  }

  setUpFilter() {
    this.tableData.filterPredicate = (data: Transaction, filter: string): boolean => {
      const filterObject = JSON.parse(filter);
      const matchesDescription = data.description.toLowerCase().includes(filterObject.description);
      const matchesCategory = this.selectedCategories.length === 0 || this.selectedCategories.includes(data.category);
      return matchesDescription && matchesCategory;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filterObject = {
      description: filterValue,
    };
    this.tableData.filter = JSON.stringify(filterObject);
  }

  applyCategoryFilter(selectedCategories: string[]) {
    this.selectedCategories = selectedCategories;
    this.tableData.filter = JSON.stringify({
      description: (document.getElementById('filterInput') as HTMLInputElement)?.value.trim().toLowerCase() || '' });
  }
}
