import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlageBackComponent } from './plage-back.component';

describe('PlageBackComponent', () => {
  let component: PlageBackComponent;
  let fixture: ComponentFixture<PlageBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlageBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlageBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
