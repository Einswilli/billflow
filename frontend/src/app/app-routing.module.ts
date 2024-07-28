import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Http404Component } from './components/http404/http404.component';
import { MainComponent } from './dashboard/main/main.component';

const routes: Routes = [
  {
    path:'',
    component : MainComponent,
    loadChildren: () => import(
        './dashboard/dashboard.module'
      ).then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import(
      './auth/auth.module'
    ).then(
      (m) => m.AuthModule
    ),
  },
  {path: '**', component: Http404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
