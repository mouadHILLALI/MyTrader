import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';


@Component({
  selector: 'app-root',
  imports: [RouterModule],
  styleUrl: './app.component.css',
  standalone: true,
  template: '<router-outlet></router-outlet>',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, 
      multi: true
    }
  ],
})
export class AppComponent {

}
