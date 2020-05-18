import { TestBed } from '@angular/core/testing';

import { PlandActionService } from './pland-action.service';

describe('PlandActionService', () => {
  let service: PlandActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlandActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
