import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
    {
        path:'',
        component: ListComponent,
    },
    {
        path:'add',
        component: NewComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
