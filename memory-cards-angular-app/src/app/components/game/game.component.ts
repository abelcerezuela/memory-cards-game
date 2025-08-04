import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScoreService } from '../../services/score/score.service';
import { PointsAndDelayService } from '../../services/points-and-delay/points-and-delay.service';
import { GenerateNumbersService } from '../../services/generate-numbers-service/generate-numbers.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
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

  constructor(
    private route: ActivatedRoute,
    private generateNumbersService: GenerateNumbersService,
    private pointsAndDelayService: PointsAndDelayService,
    private scoreService: ScoreService,
  ) {}

  ngOnInit(): void {
    // Recuperamos la puntuación histórica
    this.route.paramMap.subscribe(params => {
      this.playerName = params.get('name') || 'Guest';
      const stored = this.scoreService.getScore(this.playerName);
      this.historicalScore = stored ? parseInt(stored, 10) : 0;
    });
  }

  startGame(): void {
    this.resetGame();
    this.randomNumbers = this.generateNumbersService.generateRandomNumbers();

    this.started = true;
    this.showNumbers = true;

    const delay = this.pointsAndDelayService.getDelayBasedOnLevel(this.level);

    // Mostrar los números solo por N segundos (según level elegido)
    setTimeout(() => {
      this.showNumbers = false;
      this.waitingForSelection = true;
    }, delay);

    // Número aleatorio a encontrar
    this.targetNumber = this.randomNumbers[Math.floor(Math.random() * 9)];
  }

  // Click en un número
  selectNumber(num: number): void {
    if (!this.waitingForSelection) return;

    this.waitingForSelection = false;
    this.selectedIndex = num;

    // Número encontrado
    if (this.randomNumbers[num] === this.targetNumber) {
      this.correct = true;
      this.updateScore(this.pointsAndDelayService.getPointsBasedOnLevel(this.level));

      // Continuar con el juego tras haber hecho click, haciendo una pausa de 1s
      setTimeout(() => this.startGame(), 1000);
    } else {
      // Número no encontrado
      this.correct = false;
      setTimeout(() => {
        alert(`¡Game over! Score: ${this.currentScore}, Historical score: ${this.historicalScore}`);
        this.currentScore = 0;
        this.started = false;
      }, 1500);
    }
  }

  updateScore(points: number): void {
    this.currentScore += points;
    this.historicalScore += points;
    this.scoreService.setScore(this.playerName, this.historicalScore);
  }

  resetGame(): void {
    this.showNumbers = false;
    this.waitingForSelection = false;
    this.selectedIndex = null;
    this.correct = false;
  }
}
