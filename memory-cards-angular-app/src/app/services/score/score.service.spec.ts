import { TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';

describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store score to localStorage', () => {
    const playerName = 'Abel';
    const historicalScore = 100;

    spyOn(localStorage, 'setItem'); 

    service.setScore(playerName, historicalScore);

    expect(localStorage.setItem).toHaveBeenCalledWith('score_Abel', '100');
  });

  it('should get score from localStorage', () => {
    const playerName = 'Abel';
    const expectedScore = '100';

    spyOn(localStorage, 'getItem').and.returnValue(expectedScore);

    const score = service.getScore(playerName);

    expect(localStorage.getItem).toHaveBeenCalledWith('score_Abel');
    expect(score).toBe(expectedScore);
  });
});
