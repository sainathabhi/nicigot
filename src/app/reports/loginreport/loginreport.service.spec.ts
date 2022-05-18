import { TestBed } from '@angular/core/testing';

import { LoginreportService } from './loginreport.service';

describe('LoginreportService', () => {
  let service: LoginreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
