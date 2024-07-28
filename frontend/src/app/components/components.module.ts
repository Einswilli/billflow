import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http404Component } from './http404/http404.component';
import { IconComponent } from './icon/icon.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { LogoComponent } from './logo/logo.component';
import { DuoIconDirective } from '../duo-icon.directive';
import { ComponentsRoutingModule } from './components-routing.module';
import { CardComponent } from './card/card.component';
import { NavIndicatorComponent } from './nav-indicator/nav-indicator.component';
import { CategoryCardComponent } from './category-card/category-card.component';
import { ClientCardComponent } from './client-card/client-card.component';
import { BillCardComponent } from './bill-card/bill-card.component';
import { BillProductComponent } from './bill-product/bill-product.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { LicenceComponent } from './licence/licence.component';
import { MarkdownModule } from 'ngx-markdown';



@NgModule({
  declarations: [
    Http404Component,
    IconComponent,
    LogoComponent,
    SidebarComponent,
    SidebarItemComponent,
    DuoIconDirective,
    CardComponent,
    NavIndicatorComponent,
    CategoryCardComponent,
    ClientCardComponent,
    BillCardComponent,
    BillProductComponent,
    ArticleCardComponent,
    EmptyListComponent,
    LicenceComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    MarkdownModule.forRoot()
  ],
  exports: [
    CardComponent,
    Http404Component,
    IconComponent,
    LogoComponent,
    SidebarComponent,
    SidebarItemComponent,
    NavIndicatorComponent,
    CategoryCardComponent,
    ClientCardComponent,
    BillCardComponent,
    BillProductComponent,
    ArticleCardComponent,
    EmptyListComponent,
    LicenceComponent
  ],
})
export class ComponentsModule { }
