import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from 'src/app/auth/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        // canActivate:[AuthGuard],
        component: CategoriesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
