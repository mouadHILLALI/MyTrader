import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';
import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoinService } from '../../core/services/coin/coin.service';
import { MarketComponent } from './market/market.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../core/interceptors/auth.interceptor';
import { SharedModule } from '../../shared/shared.module';
import { WalletComponent } from './wallet/wallet.component';



@NgModule({
  declarations: [UserDashboardComponent , MarketComponent , WalletComponent],
  imports: [
    CommonModule,SharedModule,UserRoutingModule,ReactiveFormsModule
  ],
  providers:[CoinService , {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})
export class UserModule { }
