import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService, Product } from '../services/inventory.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  form: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  searchTerm = '';
  loading = true;
  successMsg = '';
  errorMsg = '';
  page = 1;
  pageSize = 5;
  sortField = '';
  sortAsc = true;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: [localStorage.getItem('lastCategory') || '', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.inventoryService.getAll().subscribe({
      next: res => {
        this.products = res;
        this.filterAndPaginate();
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  filterAndPaginate() {
    const filtered = this.products.filter(p => p.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    this.filteredProducts = filtered.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  sort(field: string) {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }

    this.products.sort((a: any, b: any) => {
      const valA = a[field];
      const valB = b[field];
      return this.sortAsc ? valA > valB ? 1 : -1 : valA < valB ? 1 : -1;
    });

    this.filterAndPaginate();
  }

  submitForm() {
    if (this.form.invalid) return;
  
    const data: Product = this.form.value;
    localStorage.setItem('lastCategory', data.category);
    this.successMsg = '';
    this.errorMsg = '';
    this.loading = true;
  
    if (this.isEditing && this.editingId != null) {
      this.inventoryService.update(this.editingId, data).subscribe({
        next: () => {
          this.successMsg = 'Product updated Successfully';
          this.resetForm();
          this.loadProducts();
          setTimeout(() => {
            this.successMsg = '';
            this.errorMsg = '';
          }, 3000);
        },
        error: () => {
          this.errorMsg = 'Update failed';
          this.loading = false;
          setTimeout(() => {
            this.successMsg = '';
            this.errorMsg = '';
          }, 3000);
        }
      });
    } else {
      this.inventoryService.create(data).subscribe({
        next: () => {
          this.successMsg = 'Product added';
          this.resetForm();
          this.loadProducts();
          setTimeout(() => {
            this.successMsg = '';
            this.errorMsg = '';
          }, 3000);
        },
        error: () => {
          this.errorMsg = 'Creation failed';
          this.loading = false;
          setTimeout(() => {
            this.successMsg = '';
            this.errorMsg = '';
          }, 3000);
        }
      });
    }
  }
  

  edit(product: Product) {
    this.form.patchValue(product);
    this.isEditing = true;
    this.editingId = product.id!;
  }

  delete(id: number) {
    if (confirm('Are you sure?')) {
      this.loading = true;
      this.inventoryService.delete(id).subscribe({
        next: () => this.loadProducts(),
        error: () => {
          this.errorMsg = 'Delete failed';
          this.loading = false;
        }
      });
    }
  }

  resetForm() {
    this.form.reset();
    this.isEditing = false;
    this.editingId = null;
    this.form.patchValue({ price: 0, stockQuantity: 0, category: localStorage.getItem('lastCategory') || '' });
  }

  onSearchChange() {
    this.page = 1;
    this.filterAndPaginate();
  }

  changePage(offset: number) {
    this.page += offset;
    this.filterAndPaginate();
  }

  clearForm(): void {
    this.form.reset(); 
    this.isEditing = false; 
    this.successMsg = '';
    this.errorMsg = '';
  }
  
}
