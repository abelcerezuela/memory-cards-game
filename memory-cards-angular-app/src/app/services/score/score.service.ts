import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor() { }

  setScore(playerName: string, historicalScore: number) {
    localStorage.setItem(`score_${playerName}`, historicalScore.toString());
  }

  getScore(playerName: string) {
    return localStorage.getItem(`score_${playerName}`);
  }
}
