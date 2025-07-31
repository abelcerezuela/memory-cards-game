import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  started: boolean = false;
  randomNumbers: number[] = [];
  showNumbers: boolean = false;
  waitingForSelection: boolean = false;
  selectedIndex: number | null = null;
  correct: boolean = false;
  targetNumber: number = 0;
  playerName: string = '';
  historicalScore: number = 0;
  currentScore: number = 0;
  level: 'easy' | 'medium' | 'hard' = 'easy';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.playerName = params.get('name') || 'Guest';

      // Al cargar, recuperamos puntuación previa
      const stored = localStorage.getItem(`score_${this.playerName}`);
      this.historicalScore = stored ? parseInt(stored, 10) : 0;
    });
  }

  startGame(): void {
    this.resetGame();
    this.generateRandomNumbers();

    this.started = true;
    this.showNumbers = true;

    const delay = this.getDelayBasedOnLevel();

    // Mostrar los números solo por N segundos
    setTimeout(() => {
      this.showNumbers = false;
      this.waitingForSelection = true;
    }, delay);

    // Elegir un número aleatorio a encontrar
    this.targetNumber = this.randomNumbers[Math.floor(Math.random() * 9)];
  }

  // Click en un número
  selectNumber(num: number): void {
    if (!this.waitingForSelection) return;

    this.waitingForSelection = false;
    this.selectedIndex = num;

    if (this.randomNumbers[num] === this.targetNumber) {
      this.correct = true;
      this.updateScore(this.getPointsBasedOnLevel());

      // Continuar con el juego tras haber hecho click, haciendo una pausa de 1s
      setTimeout(() => this.startGame(), 1000);
    } else {
      this.correct = false;
      // Partida terminada
      setTimeout(() => {
        alert(`¡Game over! Score: ${this.currentScore}, Historical score: ${this.historicalScore}`);
        this.currentScore = 0;
        this.started = false;
      }, 1500);
    }
  }

  generateRandomNumbers(): void {
    const numbers: number[] = [];
    for (let i = 1; i <= 9; i++) {
      numbers.push(i);
    }
    this.randomNumbers = this.shuffleArray(numbers);
  }

  shuffleArray(numbers: number[]): number[] {
    const numbersToFind = [...numbers];
    for (let i = numbersToFind.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [numbersToFind[i], numbersToFind[randomIndex]] = [numbersToFind[randomIndex], numbersToFind[i]];
    }
    return numbersToFind;
  }

  getDelayBasedOnLevel(): number {
    switch (this.level) {
      case 'easy': return 10000;
      case 'medium': return 5000;
      case 'hard': return 2000;
      default: return 5000;
    }
  }

  getPointsBasedOnLevel(): number {
    switch (this.level) {
      case 'easy': return 10;
      case 'medium': return 20;
      case 'hard': return 30;
      default: return 0;
    }
  }

  updateScore(points: number): void {
    this.currentScore += points;
    this.historicalScore += points;
    localStorage.setItem(`score_${this.playerName}`, this.historicalScore.toString());
  }

  resetGame(): void {
    this.showNumbers = false;
    this.waitingForSelection = false;
    this.selectedIndex = null;
    this.correct = false;
  }
}
