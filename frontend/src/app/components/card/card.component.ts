import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

    @Input()
    product?: Product
    @Output()
    productDelete = new EventEmitter<Product>()
    @Output()
    updateProductRequest = new EventEmitter<Product>()

    constructor(){}

    // EMIT DELETION
    deleteProduct(){
        this.productDelete.emit(this.product)
    }

    // EMIT UPDATE REQUEST
    updateProduct(){
        this.updateProductRequest.emit(this.product)
    }
}
