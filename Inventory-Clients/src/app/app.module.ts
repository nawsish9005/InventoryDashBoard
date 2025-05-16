import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFilterPipe } from './filters/product-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './frontEnd/navbar/navbar.component';
import { SidebarComponent } from './frontEnd/sidebar/sidebar.component';
import { DashboardComponent } from './frontEnd/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductFilterPipe,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
