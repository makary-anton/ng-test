import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ProductsComponent } from './products.component';
import { ProductsDetailsComponent } from '../products-details/products-details.component';
import { AuthService } from '../auth/auth-service';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'new',
    component: ProductsDetailsComponent,
    canActivate: [() => {
      const authService = inject(AuthService);
      return authService.hasRole('manager');
    }]
  },
  {
    path: ':id',
    component: ProductsDetailsComponent
  }
];