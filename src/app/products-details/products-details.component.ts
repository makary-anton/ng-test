import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-details',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;
  isNewProduct: boolean = true;
  loading: boolean = false;
  submitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Get product ID from route parameters
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam && idParam !== 'new') {
      this.productId = +idParam;
      this.isNewProduct = false;
      this.loadProductData();
    }
  }

  loadProductData(): void {
    if (this.productId === null) return;
    
    this.loading = true;
    this.productsService.getProductById(this.productId).subscribe(
      Product => {
        this.loading = false;
        if (Product) {
          this.productForm.patchValue({
            name: Product.name,
            category: Product.category,
            price: Product.price
          });
        } else {
          this.errorMessage = 'Product not found';
        }
      },
      error => {
        this.loading = false;
        this.errorMessage = 'Error loading product data';
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    
    if (this.productForm.invalid) {
      return;
    }
    
    this.loading = true;
    const productData = this.productForm.value;
    
    if (this.isNewProduct) {
      this.productsService.createProduct(productData).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error => {
          this.loading = false;
          this.errorMessage = 'Error creating product';
        }
      );
    } else if (this.productId !== null) {
      this.productsService.updateProduct(this.productId, productData).subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/products']);
        },
        error => {
          this.loading = false;
          this.errorMessage = 'Error updating product';
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
