import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinvoleincourseComponent } from './userinvoleincourse.component';

describe('UserinvoleincourseComponent', () => {
  let component: UserinvoleincourseComponent;
  let fixture: ComponentFixture<UserinvoleincourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserinvoleincourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserinvoleincourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
