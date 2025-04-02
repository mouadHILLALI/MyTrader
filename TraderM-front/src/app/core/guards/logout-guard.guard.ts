import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavBarService } from '../../shared/nav-bar/navBarService';

@Injectable({ providedIn: 'root' })
export class LogoutGuard implements CanActivate {
  constructor(
    private navBarService: NavBarService,
    private router: Router
  ) {}

  canActivate(): boolean {
    this.navBarService.logout();
    
    this.router.navigate(['/auth/login']); 
    
    return false; 
  }
}