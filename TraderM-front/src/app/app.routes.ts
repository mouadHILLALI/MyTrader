import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { LogoutGuard } from './core/guards/logout-guard.guard';
import { AppComponent } from './app/app.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },  
    {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule), 
    },
    {
      path: 'user',
      loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'logout',
      canActivate: [LogoutGuard],
      component : AppComponent
  }
];
