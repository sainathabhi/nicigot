import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardreportComponent } from './dashboardreport.component';

describe('DashboardreportComponent', () => {
  let component: DashboardreportComponent;
  let fixture: ComponentFixture<DashboardreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
