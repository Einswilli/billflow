import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AccountsModule } from './accounts/accounts.module';
import { BillingsModule } from './billings/billings.module';
import { ProductsModule } from './products/products.module';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AccountsModule,
    BillingsModule,
    ProductsModule,
    ComponentsModule
  ]
})
export class DashboardModule { }
