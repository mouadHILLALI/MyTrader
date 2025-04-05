import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NavLinks, User } from '../../types';
import { logoutUser } from '../../app/store/actions/user.actions';
import { selectIsAuthenticated, selectUser } from '../../app/store/selectors/user.selectors';


@Injectable({ providedIn: 'root' })
export class NavbarService {
  private navLinksSubject = new BehaviorSubject<NavLinks[]>(this.getDefaultLinks());
  private authSubject = new BehaviorSubject<boolean>(false);

  public navLinks$ = this.navLinksSubject.asObservable();
  public isAuthenticated$ = this.authSubject.asObservable();

  constructor(private store: Store) {
    this.initializeStateMonitoring();
  }

  private initializeStateMonitoring(): void {
    combineLatest([
      this.store.select(selectIsAuthenticated),
      this.store.select(selectUser)
    ]).pipe(
      map(([authenticated, user]) => {
        this.authSubject.next(authenticated); 
        return this.buildNavLinks(authenticated, user);
      })
    ).subscribe(links => this.navLinksSubject.next(links));
  }

  public buildNavLinks(authenticated: boolean, user: User | null): NavLinks[] {
    if (authenticated && user) {
      return this.getAuthenticatedLinks(user.role);
    }
    return this.getDefaultLinks();
  }

  public getAuthenticatedLinks(role: string): NavLinks[] {
    switch(role) {
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
      default:
        return this.getDefaultLinks();
    }
  }

  public getDefaultLinks(): NavLinks[] {
    return [
      { title: 'Home', Link: '/' },
      { title: 'Login', Link: '/auth/login' },
      { title: 'Register', Link: '/auth/register' }
    ];
  }

  public logout(): void {
    this.store.dispatch(logoutUser());
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }
}