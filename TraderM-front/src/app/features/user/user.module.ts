import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,SharedModule,UserRoutingModule
  ]
})
export class UserModule { }
