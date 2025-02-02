import { TestBed } from '@angular/core/testing';

import { TransactionAdapterService } from './transaction-adapter.service';

describe('TransactionAdapterService', () => {
  let service: TransactionAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
