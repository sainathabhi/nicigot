import { TestBed } from '@angular/core/testing';

import { DashboardreportService } from './dashboardreport.service';

describe('DashboardreportService', () => {
  let service: DashboardreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
