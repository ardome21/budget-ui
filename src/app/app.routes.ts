import { Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/containers/transactions/transactions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
    title: 'Transactions'
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found'
  }
];
