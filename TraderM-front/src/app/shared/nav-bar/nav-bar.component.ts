import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavLinks } from '../../types';
import { NavbarService } from './navBarService';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:false
})
export class NavBarComponent {
  public navLinks$: Observable<NavLinks[]>;
  public isAuth$: Observable<boolean>;

  constructor(private readonly navService: NavbarService) {
    this.navLinks$ = this.navService.navLinks$;
    this.isAuth$ = this.navService.isAuthenticated$;
  }
  logout(): void {
    this.navService.logout();
  }

}