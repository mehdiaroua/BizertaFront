import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageDetailComponent } from './voyage-detail.component';

describe('VoyageDetailComponent', () => {
  let component: VoyageDetailComponent;
  let fixture: ComponentFixture<VoyageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoyageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
