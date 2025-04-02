import { Injectable } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { map, Observable, combineLatest, of } from 'rxjs';
import { NavLinks, User } from "../../types";
import { selectUser, selectIsAuthenticated } from '../../app/store/selectors/user.selectors'; 
import { loadUsers } from '../../app/store/actions/user.actions'; 
import { filter, startWith, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NavBarService {
    private user$: Observable<User| null>;
    public isAuthenticated$: Observable<boolean>;

    constructor(private store: Store) {
        this.user$ = this.store.pipe(
            select(selectUser)
        );
        this.isAuthenticated$ = this.store.pipe(
            select(selectIsAuthenticated),
            startWith(false)
        );

        this.loadUserFromLocalStorage();
    }

    private loadUserFromLocalStorage(): void {
        if (typeof window !== 'undefined' && window.localStorage) {
            const token = localStorage.getItem('token');
            if (token) {
                this.store.dispatch(loadUsers({ token }));
            }
        }
    }

    public getNavLinks(): Observable<NavLinks[]> {
        return combineLatest([
            this.isAuthenticated$,
            this.user$ 
        ]).pipe(
            map(([authenticated, user]): NavLinks[] => {
                if (authenticated && user) {
                    switch(user.role) {
                        case 'ROLE_USER':
                            return [
                                { title: 'Dashboard', Link: '/user/dashboard' },
                                { title: 'Market', Link: '/user/market' },
                                { title: 'MyWallet', Link: '/user/wallet' },
                                { title: 'Logout', Link: '/logout' }
                            ];
                        case 'ROLE_ADMIN':
                            return [
                                { title: 'Dashboard', Link: '/admin/dashboard' },
                                { title: 'Profile', Link: '/admin/profile' },
                                { title: 'Logout', Link: '/logout' }
                            ];
                    }
                }
                return [
                    { title: 'Home', Link: '/' },
                    { title: 'Login', Link: '/auth/login' },
                    { title: 'Register', Link: '/auth/register' }
                ];
            }),
            catchError(() => of([
                { title: 'Home', Link: '/' },
                { title: 'Login', Link: '/auth/login' },
                { title: 'Register', Link: '/auth/register' }
            ]))
        );
    }

    public logout(): void {
      if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.removeItem('token');
      }
  }
}