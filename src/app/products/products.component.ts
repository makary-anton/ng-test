import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { Product, ProductsService } from '../services/products.service';
import { TimeAgoPipe } from '../pipes/time-ago';
import { SharedModule } from '../shared.module';


@Component({
  selector: 'app-products',
  imports: [CommonModule, TimeAgoPipe, SharedModule],
  standalone: true,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  isManager: boolean = false;
  displayedColumns: string[] = ['name', 'category', 'price', 'createdAt', 'actions'];

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private router: Router
  ) {
    this.products$ = this.productsService.getProducts();
  }

  ngOnInit(): void {
    console.log(this.products$)
    const currentUser = this.authService.getCurrentUser();
    this.isManager = currentUser?.role === 'manager';
  }

  addProduct(): void {
    this.router.navigate(['/products/new']);
  }

  editProduct(productId: number): void {
    this.router.navigate([`/products/${productId}`]);
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productsService.deleteProduct(productId).subscribe(() => {});
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}