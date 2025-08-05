import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  /**
   * Title of the application displayed on the home screen.
   * @type {string}
  */
  title = 'Memory Cards Game';
  /**
   * Reactive form group containing the username input field.
   * Validates that the username is required and has a minimum length of 4 characters.
   * @type {FormGroup}
  */
  userForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required,Validators.minLength(4)])
  });

  constructor(private router: Router) {}

  /**
   * Navigates to the game view using the entered username.
   * Triggered when the user clicks the "Start Game" button.
   * @returns {void}
   */
  goToGame() {
    const username = this.userForm.get('username')?.value;   
    this.router.navigateByUrl(`/game/${username}`);
  }
}
