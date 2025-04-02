import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { loginFailure, loginSuccess } from '../../../app/store/actions/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService , private router : Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.onLogin(username, password); 
    }
  }

  onLogin(username: string, password: string) {
    this.authService.login(username, password).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        this.store.dispatch(loginFailure({ error: err.message }));
      },
    });
  }
}
