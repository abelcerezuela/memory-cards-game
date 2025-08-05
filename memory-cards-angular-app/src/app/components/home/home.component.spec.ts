import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let routerSpy: { navigateByUrl: jasmine.Spy };

  beforeEach(async () => {
    routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

    await TestBed.configureTestingModule({
      imports: [HomeComponent, ReactiveFormsModule],
      providers: [
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
        },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.userForm = new FormGroup({
      username: new FormControl('')
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the 'Memory Cards Game' title`, () => {
    expect(component.title).toEqual('Memory Cards Game');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Memory Cards Game');
  });

  it('should navigate to /game/Username when a valid username is entered', () => {
    component.userForm.get('username')!.setValue('Abel');
    component.goToGame();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/game/Abel');
  });

  it('should navigate to /game/ when the username is an empty string', () => {
    component.userForm.get('username')!.setValue('');
    component.goToGame();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/game/');
  });

  it('should navigate to /game/undefined if the username control is missing', () => {
    component.userForm = new FormGroup({});
    component.goToGame();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/game/undefined');
  });
});
