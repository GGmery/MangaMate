import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './advanced-search.html',
  styleUrl: './advanced-search.css',
})
export class AdvancedSearch {
  @Output() search = new EventEmitter<any>();
  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      q: [''],
      type: [''],
      status: [''],
      rating: [''],
      order_by: [''],
      sort: ['']
    });
  }

  onSubmit(): void {
    const filters: any = {};
    const formValue = this.searchForm.value;

    if (formValue.q) filters.q = formValue.q;
    if (formValue.type) filters.type = formValue.type;
    if (formValue.status) filters.status = formValue.status;
    if (formValue.rating) filters.rating = formValue.rating;
    if (formValue.order_by) filters.order_by = formValue.order_by;
    if (formValue.sort) filters.sort = formValue.sort;

    this.search.emit(filters);
  }

  resetFilters(): void {
    this.searchForm.reset();
  }
}