import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NavbarService } from '../../shared/nav-bar/navBarService';

@Injectable({ providedIn: 'root' })
export class LogoutGuard implements CanActivate {
  constructor(
    private navBarService: NavbarService,
    private router: Router
  ) {}

  canActivate(): boolean {
    this.navBarService.logout();
    
    this.router.navigate(['/auth/login']); 
    
    return false; 
  }
}