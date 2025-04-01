
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';  

const userRoutes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],  
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
