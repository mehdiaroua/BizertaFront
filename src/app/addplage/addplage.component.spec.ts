import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplageComponent } from './addplage.component';

describe('AddplageComponent', () => {
  let component: AddplageComponent;
  let fixture: ComponentFixture<AddplageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddplageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddplageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
