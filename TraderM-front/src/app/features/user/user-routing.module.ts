
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';  
import { MarketComponent } from './market/market.component';
import { MarketResolver } from '../../core/resolvers/market.resolver';

const userRoutes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    // canActivate: [AuthGuard],  
  },
  {
    path: 'market',
    component: MarketComponent,
    // canActivate: [AuthGuard],  
    resolve:{
      marketData :MarketResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
