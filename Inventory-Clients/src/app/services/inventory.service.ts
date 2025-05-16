import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
  lastUpdated?: Date;
}

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  private baseUrl = 'https://localhost:7062/api/product';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  update(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getPaged(page: number, pageSize: number, search = '') {
    return this.http.get<{ total: number, products: Product[] }>(
      `${this.baseUrl}/paged?page=${page}&pageSize=${pageSize}&search=${search}`
    );
  }
  
}
