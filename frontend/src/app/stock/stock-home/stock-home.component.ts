import { HttpClient } from '@angular/common/http'
import { Component, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { LoadingService } from 'src/app/services/loading.service'
import { NetworkService } from 'src/app/services/network.service'
import { Product, ProductResponse } from 'src/models/product.model'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-stock-home',
  templateUrl: './stock-home.component.html',
  styleUrls: ['./stock-home.component.css'],
})
export class StockHomeComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'price', 'stock', 'action']
  dataSource = new MatTableDataSource<Product>()
  textSearch: string | undefined

  @ViewChild(MatSort, { static: true }) sort!: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  constructor(private netWorkService: NetworkService) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
    this.feedData()
  }

  feedData() {
    this.netWorkService.getProducts().subscribe({
      next: (data) => {
        this.dataSource.data = data.map((item) => {
          item.image = this.netWorkService.getProductImageURL(item.image)
          return item
        })
      },
      error: (error) => {},
      complete: () => {},
    })
  }

  search(event: Event | null) {
    let filterValue = ''
    if (event) {
      filterValue = (event.target as HTMLInputElement).value
    }
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  clearSearch() {
    this.textSearch = ''
    this.search(null)
  }

  onClickDeleteProduct(product: ProductResponse) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete Product: ${product.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.netWorkService.deleteProductById(product.id).subscribe({
          next: (data) => {
            this.feedData()
          },
          error: (error: any) => {},
        })
      }
    })
  }
}
