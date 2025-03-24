import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },  
    {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule), 
  }
];
