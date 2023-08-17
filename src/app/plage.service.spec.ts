import { TestBed } from '@angular/core/testing';

import { PlageService } from './plage.service';

describe('PlageService', () => {
  let service: PlageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
