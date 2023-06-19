import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { NetworkService } from 'src/app/services/network.service'
import { Product } from 'src/models/product.model'

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css'],
})
export class StockCreateComponent implements OnInit {
  imagePreview: string | ArrayBuffer | undefined
  file: File | undefined

  constructor(private netWorkService: NetworkService, private location: Location) {}

  ngOnInit(): void {}

  onPreviewImage(event: Event) {
    const files = (event.target as HTMLInputElement).files
    if (files && files[0]) {
      const metaImage = files[0]
      this.file = metaImage
      const reader = new FileReader()
      reader.readAsDataURL(metaImage)
      reader.onload = () => {
        if (reader.result) {
          this.imagePreview = reader.result
        }
      }
    }
  }

  onSubmit(productForm: NgForm) {
    if (productForm.invalid) return
    const values = productForm.value
    const product: Product = {
      name: values.name,
      price: values.price,
      stock: values.stock,
      image: this.file,
    }
    this.netWorkService.addProduct(product).subscribe({
      next: (data) => {
        this.location.back()
      },
      error: (error: any) => {
        console.log(error.error.message)
      },
    })
  }
}
