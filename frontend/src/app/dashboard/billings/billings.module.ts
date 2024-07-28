import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingsRoutingModule } from './billings-routing.module';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { PqInputComponent } from './pq-input/pq-input.component';


@NgModule({
  declarations: [
    NewComponent,
    ListComponent,
    DetailComponent,
    PqInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    BillingsRoutingModule
  ]
})
export class BillingsModule { }
