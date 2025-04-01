import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavBarService } from './navBarSerice';
import { NavLinks } from '../../types';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:false
})
export class NavBarComponent implements OnInit {
  public navLinks: NavLinks[] = [];
  public isAuth : boolean = false;

  constructor(private readonly navService: NavBarService) {}

  ngOnInit(): void {
    try {
      this.navLinks = this.navService.getNavLinks(); 
      this.isAuth = this.navService.isAuthenticated();
    } catch (error) {
      console.error("Error fetching navigation links:", error);
    }
  }
}
