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

  describe('getPointsBasedOnLevel', () => {
    it('should return 10 points for "easy" level', () => {
      const level = 'easy';
      const points = service.getPointsBasedOnLevel(level);
      expect(points).toBe(10);
    });

    it('should return 20 points for "medium" level', () => {
      const level = 'medium';
      const points = service.getPointsBasedOnLevel(level);
      expect(points).toBe(20);
    });

    it('should return 30 points for "hard" level', () => {
      const level = 'hard';
      const points = service.getPointsBasedOnLevel(level);
      expect(points).toBe(30);
    });

    it('should return 0 points for unknown level', () => {
      const level = 'unknown';
      const points = service.getPointsBasedOnLevel(level);
      expect(points).toBe(0);
    });
  });

  describe('getDelayBasedOnLevel', () => {
    it('should return 10000ms for "easy" level', () => {
      const level = 'easy';
      const delay = service.getDelayBasedOnLevel(level);
      expect(delay).toBe(10000);
    });

    it('should return 5000 ms for "medium" level', () => {
      const level = 'medium';
      const delay = service.getDelayBasedOnLevel(level);
      expect(delay).toBe(5000);
    });

    it('should return 2000 ms for "hard" level', () => {
      const level = 'hard';
      const delay = service.getDelayBasedOnLevel(level);
      expect(delay).toBe(2000);
    });

    it('should return 5000 ms for unknown level', () => {
      const level = 'unknown';
      const delay = service.getDelayBasedOnLevel(level);
      expect(delay).toBe(5000);
    });
  });
});
