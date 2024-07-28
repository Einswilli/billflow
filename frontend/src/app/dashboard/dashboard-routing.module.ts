import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'accounts',
        canActivate: [AuthGuard] ,
        loadChildren: () => import(
            './accounts/accounts.module'
        ).then(
            (m) => m.AccountsModule
        ),

    },
    {
        path: 'clients',
        canActivate: [AuthGuard] ,
        loadChildren: () => import(
            './clients/clients.module'
        ).then(
            (m) => m.ClientsModule
        ),
    },
    {
        path: 'categories',
        canActivate: [AuthGuard] ,
        loadChildren: () => import(
            './categories/categories.module'
        ).then(
            (m) => m.CategoriesModule
        ),
    },
    {
        path: 'products',
        canActivate: [AuthGuard] ,
        loadChildren: () => import(
            './products/products.module'
        ).then(
            (m) => m.ProductsModule
        ),
    },
    {
        path: 'billings',
        canActivate: [AuthGuard] ,
        loadChildren: () => import(
          './billings/billings.module'
        ).then(
          (m) => m.BillingsModule
        ),
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
