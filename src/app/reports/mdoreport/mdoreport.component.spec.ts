import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdoreportComponent } from './mdoreport.component';

describe('MdoreportComponent', () => {
  let component: MdoreportComponent;
  let fixture: ComponentFixture<MdoreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdoreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdoreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
