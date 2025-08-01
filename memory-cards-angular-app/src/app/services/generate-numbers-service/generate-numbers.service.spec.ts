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
});
