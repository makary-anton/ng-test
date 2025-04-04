import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';


export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  users: any[] = [];

  private jsonUrl = 'assets/products.json';
  constructor(private http: HttpClient) {
    this.fetchAndLogData();
  }

  private products: Product[] = [];

  private productsSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id));
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: this.products.length + 1,
      createdAt: new Date()
    };
    this.products.push(newProduct);
    this.productsSubject.next([...this.products]);
    return of(newProduct);
  }

  updateProduct(id: number, updatedProduct: Partial<Product>): Observable<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
      this.productsSubject.next([...this.products]);
      return of(this.products[index]);
    }
    return of(null);
  }

  deleteProduct(id: number): Observable<boolean> {
    const initialLength = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    this.productsSubject.next([...this.products]);
    return of(this.products.length < initialLength);
  }


  getUsers(): Observable<any> {
    console.log(this.http.get<any>(this.jsonUrl))
    return this.http.get<any>(this.jsonUrl);
  }

  // Fetch data
  private fetchAndLogData(): void {
    this.getUsers().subscribe(
      (data) => {
        console.log('fetched data:', data);
        this.products = data; 
        this.productsSubject.next([...this.products]);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}