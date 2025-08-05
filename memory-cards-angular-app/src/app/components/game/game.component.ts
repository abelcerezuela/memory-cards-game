import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ScoreService } from '../../services/score/score.service';
import { PointsAndDelayService } from '../../services/points-and-delay/points-and-delay.service';
import { GenerateNumbersService } from '../../services/generate-numbers-service/generate-numbers.service';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-game',
  imports: [ButtonComponent, CommonModule, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  /**
   * Indicates whether the game has started.
   * @type {boolean}
   */
  started: boolean = false;
  /**
   * Array of randomly generated numbers from 1 to 9.
   * @type {number[]}
   */
  randomNumbers: number[] = [];
  /**
   * Flag to control visibility of numbers on the grid.
   * @type {boolean}
   */
  showNumbers: boolean = false;
  /**
   * Flag to indicate if the game is waiting for the player's selection.
   * @type {boolean}
   */
  waitingForSelection: boolean = false;
  /**
   * Countdown timer in seconds for number visibility.
   * @type {number}
   */
  countdown: number = 0;
  /**
   * Index of the selected number by the player.
   * @type {number | null}
   */
  selectedIndex: number | null = null;
  /**
   * Flag to indicate if the player's selection was correct.
   * @type {boolean}
   */
  correct: boolean = false;
  /**
   * Target number the player must find.
   * @type {number}
   */
  targetNumber: number = 0;
  /**
   * Name of the player retrieved from the route.
   * @type {string}
   */
  playerName: string = '';
  /**
   * Historical score of the player stored across sessions.
   * @type {number}
   */
  historicalScore: number = 0;
  /**
   * Current score of the ongoing game session.
   * @type {number}
   */
  currentScore: number = 0;
  /**
   * Selected difficulty level of the game.
   * @type {'easy' | 'medium' | 'hard'}
   */
  level: 'easy' | 'medium' | 'hard' = 'easy';

  constructor(
    private route: ActivatedRoute,
    private generateNumbersService: GenerateNumbersService,
    private pointsAndDelayService: PointsAndDelayService,
    private scoreService: ScoreService,
  ) {}

  /**
   * Retrieves the player's name from the route and loads their historical score.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.playerName = params.get('name') || 'Guest';
      const stored = this.scoreService.getScore(this.playerName);
      this.historicalScore = stored ? parseInt(stored, 10) : 0;
    });
  }

  /**
   * Starts a new game round by resetting the state, generating numbers,
   * showing them for a limited time, and selecting a target number.
   * @returns {void}
   */
  startGame(): void {
    this.resetGame();
    this.randomNumbers = this.generateNumbersService.generateRandomNumbers();

    this.started = true;
    this.showNumbers = true;

    const delay = this.pointsAndDelayService.getDelayBasedOnLevel(this.level);
    this.countdown = delay/1000;
    let intervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    setTimeout(() => {
      this.showNumbers = false;
      this.waitingForSelection = true;
    }, delay);

    this.targetNumber = this.randomNumbers[Math.floor(Math.random() * 9)];
  }

  /**
   * Handles the player's selection of a number.
   * Checks if the selected number matches the target and updates the score or ends the game.
   * @param {number} num - Index of the selected number.
   * @returns {void}
   */

  selectNumber(num: number): void {
    if (!this.waitingForSelection) return;

    this.waitingForSelection = false;
    this.selectedIndex = num;

    if (this.randomNumbers[num] === this.targetNumber) {
      this.correct = true;
      this.updateScore(this.pointsAndDelayService.getPointsBasedOnLevel(this.level));

      // Continue the game after a short pause
      setTimeout(() => this.startGame(), 1000);
    } else {
      this.correct = false;
      setTimeout(() => {
        alert(`¡Game over! Score: ${this.currentScore}, Historical score: ${this.historicalScore}`);
        this.currentScore = 0;
        this.started = false;
      }, 1000);
    }
  }

  /**
   * Updates the current and historical scores and saves them using the score service.
   * @param {number} points - Points to add based on difficulty level.
   * @returns {void}
   */
  updateScore(points: number): void {
    this.currentScore += points;
    this.historicalScore += points;
    this.scoreService.setScore(this.playerName, this.historicalScore);
  }

  /**
   * Resets the game state before starting a new round.
   * @returns {void}
   */
  resetGame(): void {
    this.showNumbers = false;
    this.waitingForSelection = false;
    this.selectedIndex = null;
    this.correct = false;
  }
}
