import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-bill-product',
  templateUrl: './bill-product.component.html',
  styleUrls: ['./bill-product.component.css']
})
export class BillProductComponent {

    @Input()
    product?: Product
    @Output()
    productSelected: EventEmitter<Product> = new EventEmitter<Product>()

    constructor(
    ){}

    // EMIT OPEN
    select_product(){
        this.productSelected.emit(this.product)
    }
}
