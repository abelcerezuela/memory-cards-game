import { TestBed } from '@angular/core/testing';

import { GenerateNumbersService } from './generate-numbers.service';

describe('GenerateNumbersService', () => {
  let service: GenerateNumbersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateNumbersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('generateRandomNumbers', () => {
    it('should return a shuffled array of numbers from 1 to 9', () => {
      const numbers1 = service.generateRandomNumbers();
      const numbers2 = service.generateRandomNumbers();

      expect(numbers1).not.toEqual(numbers2);
    });

    it('should always return an array of length 9', () => {
      const numbers = service.generateRandomNumbers();
      expect(numbers.length).toBe(9);
    });
  });

  describe('shuffleArray', () => {
    it('should shuffle an array of numbers', () => {
      const original = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const shuffled = service.shuffleArray(original);

      expect(shuffled).not.toEqual(original);
      expect(shuffled.length).toBe(original.length);
    });

    it('should return the same array if there is only one element', () => {
      const original = [1];
      const shuffled = service.shuffleArray(original);

      expect(shuffled).toEqual(original);
    });

    it('should return a shuffled array with same elements as the input', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = service.shuffleArray(original);

      expect(shuffled.sort()).toEqual(original.sort());
    });
  });
});
