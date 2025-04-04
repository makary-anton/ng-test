import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { SharedModule } from './shared.module';
import { RoleGuard } from './guards/role-guard'

const routes: Routes = [
  { 
    path: '', 
    component: ProductsComponent
  },
  { 
    path: 'new', 
    component: ProductsDetailsComponent,
    canActivate: [RoleGuard],
    data: { role: 'manager' }
  },
  { 
    path: ':id', 
    component: ProductsDetailsComponent 
  }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ProductsComponent,
    ProductsDetailsComponent,
    RouterModule.forChild(routes)
  ]
})
export class ProductsModule {}