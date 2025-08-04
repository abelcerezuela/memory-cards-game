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
  title = 'Memory Cards Game';
  userForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required,Validators.minLength(4)])
  });

  constructor(private router: Router) {}

  goToGame() {
    const username = this.userForm.get('username')?.value;   
    this.router.navigateByUrl(`/game/${username}`);
  }
}
