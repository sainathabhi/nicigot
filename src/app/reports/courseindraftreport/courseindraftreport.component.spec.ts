import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseindraftreportComponent } from './courseindraftreport.component';

describe('CourseindraftreportComponent', () => {
  let component: CourseindraftreportComponent;
  let fixture: ComponentFixture<CourseindraftreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseindraftreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseindraftreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
