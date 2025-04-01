import { Component, OnInit } from '@angular/core';
import { NavBarService } from './navBarService';
import { NavLinks } from '../../types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone:false
})
export class NavBarComponent implements OnInit {
  public navLinks: NavLinks[] = [];
  public isAuth: boolean = false;  

  constructor(private readonly navService: NavBarService) {}

  ngOnInit(): void {
    this.navService.getNavLinks().subscribe({
      next: (links) => {
        this.navLinks = links;  
      },
      error: (err) => {
        console.error("Error fetching navigation links:", err);  
      }
    });

    this.navService.isAuthenticated$.subscribe({
      next: (authenticated) => {
        this.isAuth = authenticated;  
      },
      error: (err) => {
        console.error("Error checking authentication status:", err);  
      }
    });
  }
}
