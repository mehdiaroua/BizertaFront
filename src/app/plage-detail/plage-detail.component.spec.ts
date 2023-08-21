import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlageDetailComponent } from './plage-detail.component';

describe('PlageDetailComponent', () => {
  let component: PlageDetailComponent;
  let fixture: ComponentFixture<PlageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlageDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
