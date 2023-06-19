import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { Location } from '@angular/common'
import { NgForm } from '@angular/forms'
import { NetworkService } from 'src/app/services/network.service'
import { Product } from 'src/models/product.model'

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css'],
})
export class StockEditComponent implements OnInit {
  imagePreview: string | ArrayBuffer | undefined
  file: File | undefined

  @ViewChild('productForm', { static: true }) productDorm: NgForm | undefined

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private netWorkService: NetworkService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.params.subscribe({
      next: (params: Params) => {
        // alert(params['id'])
        this.feedData(params['id'])
      },
    })
  }

  feedData(id: number) {
    this.netWorkService.getProductById(id).subscribe({
      next: (data) => {
        const { name, price, stock, image } = { ...data }
        // alert(JSON.stringify(data))
        this.imagePreview = this.netWorkService.getProductImageURL(image)
        this.productDorm?.setValue({ id, name, price, stock })
      },
      error: (error: any) => {
        console.log(error.error.message)
        // if error then redirect to this path
        this.router.navigate(['stock'])
      },
    })
  }

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
    const id = productForm.value.id
    const product: Product = {
      name: values.name,
      price: values.price,
      stock: values.stock,
      image: this.file,
    }
    this.netWorkService.updateProductById(id, product).subscribe({
      next: (data) => {
        this.location.back()
      },
      error: (error: any) => {
        console.log(error.error.message)
      },
    })
  }
}
