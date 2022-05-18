import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginreportComponent } from './loginreport.component';

describe('LoginreportComponent', () => {
  let component: LoginreportComponent;
  let fixture: ComponentFixture<LoginreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
