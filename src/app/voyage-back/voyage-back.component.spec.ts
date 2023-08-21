import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageBackComponent } from './voyage-back.component';

describe('VoyageBackComponent', () => {
  let component: VoyageBackComponent;
  let fixture: ComponentFixture<VoyageBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyageBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
