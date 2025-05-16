import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DashboardComponent } from './frontEnd/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {path: 'product',title:'Product' ,component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
