import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ScoreService } from '../../services/score/score.service';
import { PointsAndDelayService } from '../../services/points-and-delay/points-and-delay.service';
import { GenerateNumbersService } from '../../services/generate-numbers-service/generate-numbers.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let scoreService: jasmine.SpyObj<ScoreService>;
  let pointsAndDelayService: jasmine.SpyObj<PointsAndDelayService>;
  let generateNumbersService: jasmine.SpyObj<GenerateNumbersService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const scoreServiceSpy = jasmine.createSpyObj('ScoreService', ['getScore', 'setScore']);
    const pointsAndDelayServiceSpy = jasmine.createSpyObj('PointsAndDelayService', ['getDelayBasedOnLevel', 'getPointsBasedOnLevel']);
    const generateNumbersServiceSpy = jasmine.createSpyObj('GenerateNumbersService', ['generateRandomNumbers']);

    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        { provide: ScoreService, useValue: scoreServiceSpy },
        { provide: PointsAndDelayService, useValue: pointsAndDelayServiceSpy },
        { provide: GenerateNumbersService, useValue: generateNumbersServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: (key: string) => {
                if (key === 'name') return 'Abel';
                return null;
              }
            })
          }
        }
      ]
    })
    .compileComponents();

    scoreService = TestBed.inject(ScoreService) as jasmine.SpyObj<ScoreService>;
    pointsAndDelayService = TestBed.inject(PointsAndDelayService) as jasmine.SpyObj<PointsAndDelayService>;
    generateNumbersService = TestBed.inject(GenerateNumbersService) as jasmine.SpyObj<GenerateNumbersService>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should retrieve player name from route params and set historical score', () => {
      scoreService.getScore.and.returnValue('10');
      component.ngOnInit();
  
      expect(component.playerName).toBe('Abel');
      expect(component.historicalScore).toBe(10);
    });
  
    it('should set historicalScore to 0 if no score is found', () => {
      scoreService.getScore.and.returnValue(null);
  
      component.ngOnInit();
      expect(component.historicalScore).toBe(0);
    });
  });

  describe('startGame', () => {
    it('should start the game correctly', () => {
      const randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      generateNumbersService.generateRandomNumbers.and.returnValue(randomNumbers);
      pointsAndDelayService.getDelayBasedOnLevel.and.returnValue(5000);

      component.startGame();

      expect(component.showNumbers).toBeTrue();
      expect(component.started).toBeTrue();
      expect(component.randomNumbers).toEqual(randomNumbers);
      expect(component.targetNumber).toBeGreaterThanOrEqual(1);  // Número aleatorio entre 1-9
      expect(component.targetNumber).toBeLessThanOrEqual(9);
      expect(component.showNumbers).toBeTrue();
      expect(pointsAndDelayService.getDelayBasedOnLevel).toHaveBeenCalled();
    });
  });

  describe('selectNumber', () => {
    it('should do nothing if not waiting for selection', () => {
      component.waitingForSelection = false;
      component.selectNumber(0);
      expect(component.selectedIndex).toBeNull();
    });

    it('should set selectedIndex and mark correct if number matches target', fakeAsync(() => {
      component.waitingForSelection = true;
      component.randomNumbers = [5, 10, 15];
      component.targetNumber = 10;
      component.level = 'easy';
      pointsAndDelayService.getPointsBasedOnLevel.and.returnValue(50);
      spyOn(component, 'startGame');
      spyOn(component, 'updateScore');

      component.selectNumber(1);

      expect(component.waitingForSelection).toBeFalse();
      expect(component.selectedIndex).toBe(1);
      expect(component.correct).toBeTrue();
      expect(component.updateScore).toHaveBeenCalledWith(50);

      tick(1000);
      expect(component.startGame).toHaveBeenCalled();
    }));

    it('should handle incorrect number selection', fakeAsync(() => {
      component.waitingForSelection = true;
      component.randomNumbers = [5, 10, 15];
      component.targetNumber = 20;
      component.currentScore = 100;
      component.historicalScore = 200;
      spyOn(window, 'alert');

      component.selectNumber(0);

      expect(component.correct).toBeFalse();

      tick(1500);
      expect(window.alert).toHaveBeenCalledWith('¡Game over! Score: 100, Historical score: 200');
      expect(component.currentScore).toBe(0);
      expect(component.started).toBeFalse();
    }));

  });

  describe('updateScore', () => {
    it('should update currentScore and historicalScore correctly', () => {
      component.currentScore = 10;
      component.historicalScore = 20;
      component.playerName = 'Abel';

      const pointsToAdd = 15;

      component.updateScore(pointsToAdd);

      expect(component.currentScore).toBe(25); 
      expect(component.historicalScore).toBe(35);
      expect(scoreService.setScore).toHaveBeenCalledWith('Abel', 35);
    });

    it('should handle updating with zero points', () => {
      component.currentScore = 10;
      component.historicalScore = 20;
      component.playerName = 'Abel';

      const pointsToAdd = 0;

      component.updateScore(pointsToAdd);

      expect(component.currentScore).toBe(10);
      expect(component.historicalScore).toBe(20);
      expect(scoreService.setScore).toHaveBeenCalledWith('Abel', 20);
    });
  });
});
