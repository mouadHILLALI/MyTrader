import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../../app/selectors/user.selectors'; 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectUser),
      map(user => {
        console.log('AuthGuard: user from store:', user);
      
        const token = user?.token;
        const userRole = user?.role;
      
        if (!token) {
          console.warn('AuthGuard: No token found, redirecting to login');
          this.router.navigate(['/auth/login']);
          return false;
        }
      
        console.log('AuthGuard: User role:', userRole);
        console.log('AuthGuard: Requested route:', next.url[0]?.path);
      
        if (next.url[0]?.path.startsWith('user') && userRole !== 'ROLE_USER') {
          console.warn('AuthGuard: Access denied to user route for role:', userRole);
          this.router.navigate(['/not-authorized']);
          return false;
        }
      
        if (next.url[0]?.path.startsWith('admin') && userRole !== 'ROLE_ADMIN') {
          console.warn('AuthGuard: Access denied to admin route for role:', userRole);
          this.router.navigate(['/not-authorized']);
          return false;
        }
      
        console.log('AuthGuard: Access granted');
        return true;
      })
    );
  }
  
}
