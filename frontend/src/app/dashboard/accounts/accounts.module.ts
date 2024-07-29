import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    ListComponent,
    NewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    ComponentsModule
  ]
})
export class AccountsModule { }
