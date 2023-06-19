import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { Product, ProductResponse } from 'src/models/product.model'

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(private httpClient: HttpClient) {}

  addProduct(product: Product): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>(`/product`, this.makeFormData(product), {
      reportProgress: true,
    })
  }

  getProducts(): Observable<ProductResponse[]> {
    return this.httpClient.get<ProductResponse[]>(`/product`)
  }

  getProductById(id: number): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`/product/${id}`)
  }

  updateProductById(id: number, product: Product): Observable<ProductResponse> {
    return this.httpClient.put<ProductResponse>(`/product/${id}`, this.makeFormData(product), {
      reportProgress: true,
    })
  }

  deleteProductById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`/product/${id}`)
  }

  getProductImageURL(image: string): string {
    if (image) {
      return `${environment.baseURL}/images/${image}`
    }
    return 'assets/images/no_photo.jpg'
  }

  makeFormData(product: Product): FormData {
    const formData = new FormData()
    formData.append('name', product.name)
    formData.append('stock', String(product.stock))
    formData.append('price', String(product.price))
    if (product.image) {
      formData.append('image', product.image)
    }

    return formData
  }
}
