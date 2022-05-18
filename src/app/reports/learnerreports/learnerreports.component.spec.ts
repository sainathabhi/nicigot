import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerreportsComponent } from './learnerreports.component';

describe('LearnerreportsComponent', () => {
  let component: LearnerreportsComponent;
  let fixture: ComponentFixture<LearnerreportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerreportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
