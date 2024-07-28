import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-pq-input',
  templateUrl: './pq-input.component.html',
  styleUrls: ['./pq-input.component.css']
})
export class PqInputComponent {
    @Input()
    product?: Product
    modal?: any
    @Input()
    parent?: any
    @Output()
    productAded: EventEmitter<any> = new EventEmitter<any>()


    go_back(){
        // this.router.navigate(['/categories'])
        this.modal.close()
        this.parent.get_categories()
    }

    add_product_to_card(price:string){
        // BUILD ARTICLE
        var data:any = {
            product: this.product,
            // quantity: 1
            selling_price: parseInt(price)
        }
        // EMIT ARTICLE
        this.productAded.emit(data)
        // THEN GO BACK
        this.go_back()
    }
}
