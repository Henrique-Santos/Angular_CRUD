import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from './product.model';

const baseUrl = 'http://localhost:3001/products'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 300,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(baseUrl, product)
      .pipe(map(obj => obj))
      .pipe(catchError(e => this.errorHandler(e)))
  }
  
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl)
  }
  
  readById(id: string | null): Observable<Product> {
    const url = `${baseUrl}/${id}`
    return this.http.get<Product>(url)
  }
  
  update(product: Product): Observable<Product> {
    const url = `${baseUrl}/${product.id}`
    return this.http.put<Product>(url, product)
  }
  
  delete(id: number | undefined): Observable<Product> {
    const url = `${baseUrl}/${id}`
    return this.http.delete<Product>(url)
  }
  
  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocorreu em erro!', true)
    return EMPTY
  }
}
