
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';
import { AuthGuard } from '../../core/guards/auth-guard.guard';  
import { MarketComponent } from './market/market.component';
import { MarketResolver } from '../../core/resolvers/market.resolver';
import { WalletComponent } from './wallet/wallet.component';
import { WalletResolver } from '../../core/resolvers/wallet.resolver';

const userRoutes: Routes = [
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],  
  },
  {
    path: 'market',
    component: MarketComponent,
    canActivate: [AuthGuard],  
    resolve:{
      marketData :MarketResolver
    }
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [AuthGuard],  
    resolve:{
      coinData :WalletResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
