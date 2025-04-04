import { RouterModule, Routes } from '@angular/router';
import { NgModule, inject } from '@angular/core';
import { AuthService } from './auth/auth-service';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes')
      .then(routes => routes.AUTH_ROUTES)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.routes')
      .then(routes => routes.PRODUCTS_ROUTES),
    canMatch: [() => {
      const authService = inject(AuthService);
      return !!authService.getCurrentUser();
    }]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}