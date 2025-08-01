import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsAndDelayService {

  constructor() { }

  getPointsBasedOnLevel(level: string): number {
    switch (level) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return 0;
    }
  }

  getDelayBasedOnLevel(level: string): number {
    switch (level) {
      case 'easy': return 10000;
      case 'medium': return 5000;
      case 'hard': return 2000;
      default: return 5000;
    }
  }

}
