import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBackComponent } from './hotel-back.component';

describe('HotelBackComponent', () => {
  let component: HotelBackComponent;
  let fixture: ComponentFixture<HotelBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
