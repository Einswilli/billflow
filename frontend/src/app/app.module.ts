import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { MainComponent } from './dashboard/main/main.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgToastModule } from 'ng-angular-popup';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './auth/guards/auth.guard';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    DashboardModule,
    ComponentsModule,
    HttpClientModule,
    NgToastModule,
    NgbModule,
    JwtModule.forRoot({
        config:{
          tokenGetter : () => localStorage.getItem('access'),
          // disallowedRoutes:['/','/auth/login']
        }
    }),
    MarkdownModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
