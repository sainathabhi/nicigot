import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursepublishedComponent } from './coursepublished.component';

describe('CoursepublishedComponent', () => {
  let component: CoursepublishedComponent;
  let fixture: ComponentFixture<CoursepublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursepublishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursepublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
