import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { AuthResponse, User } from '../../types';
import { select, Store } from '@ngrx/store';
import { setUser } from '../../../app/app/store/actions/user.actions';
import { selectUser } from '../../app/store/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store  
  ) {}


  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap((response: User) => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('token', response.token);  
          this.store.dispatch(setUser({ user: response }));
          this.redirectUserBasedOnRole(response.role);
        }
      })
    );
  }
  register(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/auth/register`, { username, password }).pipe(
      tap((response: User) => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          localStorage.setItem('token', response.token);
          this.store.dispatch(setUser({ user: response }));
          this.redirectUserBasedOnRole(response.role);
        }
      })
    );
  }

  private redirectUserBasedOnRole(role : string): void {
    console.log("this is working the redirect");
    
    if (role) {
      if (role === 'ROLE_USER') {
        this.router.navigate(['/user/dashboard']);
      } else if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

}
