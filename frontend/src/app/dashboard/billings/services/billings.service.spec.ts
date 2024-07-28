import { TestBed } from '@angular/core/testing';

import { BillingsService } from './billings.service';

describe('BillingsService', () => {
  let service: BillingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
