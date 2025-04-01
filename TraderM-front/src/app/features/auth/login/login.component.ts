import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { loginFailure, loginSuccess } from '../../../app/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // ✅ Fixed plural
  standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private store: Store, private authService: AuthService) {
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
        this.store.dispatch(loginSuccess({ user: response.user, token: response.token }));
      },
      error: (err) => {
        this.store.dispatch(loginFailure({ error: err.message }));
      },
    });
  }
}
