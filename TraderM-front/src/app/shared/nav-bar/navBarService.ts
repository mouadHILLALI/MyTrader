import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { map, Observable, combineLatest } from 'rxjs';
import { NavLinks, User } from "../../types";
import { selectUser, selectIsAuthenticated } from '../../app/selectors/user.selectors'; 
import { loadUsers } from '../../app/actions/user.actions'; 
import { filter } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class NavBarService {
    user$: Observable<User>;
    isAuthenticated$: Observable<boolean>;

    constructor(private store: Store) {
      this.user$ = this.store.pipe(
          select(selectUser),
          filter((user): user is User => user !== null) 
      );
  
      this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
      this.loadUserFromLocalStorage();
  }

    private loadUserFromLocalStorage(): void {
      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        const token = localStorage.getItem('token');
        
        if (token) {
          this.store.dispatch(loadUsers({ token }));
        } else {
          console.warn('No token found in localStorage');
        }
      } else {
        console.warn('localStorage is not available');
      }
    }

    public getNavLinks(): Observable<NavLinks[]> {
      return combineLatest([this.isAuthenticated$, this.user$]).pipe(
          map(([authenticated, user]: [boolean, User]) => {
              if (authenticated && user?.role === 'ROLE_USER') {
                  return [
                      { title: 'Dashboard', Link: '/user/dashboard' },
                      { title: 'Profile', Link: '/user/profile' },
                      { title: 'Logout', Link: '/logout' }
                  ];
              } else if (authenticated && user?.role === 'ROLE_ADMIN') {
                  return [
                      { title: 'Dashboard', Link: '/admin/dashboard' },
                      { title: 'Profile', Link: '/admin/profile' },
                      { title: 'Logout', Link: '/logout' }
                  ];
              } else {
                  return [
                      { title: 'Home', Link: '/' },
                      { title: 'Login', Link: '/auth/login' },
                      { title: 'Register', Link: '/auth/register' }
                  ];
              }
          })
      );
  }
}
