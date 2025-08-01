import { TestBed } from '@angular/core/testing';

import { PointsAndDelayService } from './points-and-delay.service';

describe('PointsAndDelayService', () => {
  let service: PointsAndDelayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointsAndDelayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
