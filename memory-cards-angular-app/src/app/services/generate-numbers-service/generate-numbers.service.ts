import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateNumbersService {

  constructor() { }

  generateRandomNumbers(): number[] {
    const numbers: number[] = [];
    for (let i = 1; i <= 9; i++) {
      numbers.push(i);
    }
    return this.shuffleArray(numbers);
  }

  shuffleArray(numbers: number[]): number[] {
    const numbersToFind = [...numbers];
    for (let i = numbersToFind.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [numbersToFind[i], numbersToFind[randomIndex]] = [numbersToFind[randomIndex], numbersToFind[i]];
    }
    return numbersToFind;
  }
}
