import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {

    @Input()
    article_product?: any
    @Output()
    priceChange: EventEmitter<any> = new EventEmitter<any>()
    @Output()
    articleDelete: EventEmitter<string> = new EventEmitter<string>()
    // @Output()
    // quantityChange: EventEmitter<any> = new EventEmitter<any>()  WOULD LIKE TO ADD QUANTITY



    // PRICE CHANGE EVENT
    changePrice(price:string) {
        this.priceChange.emit(
            {
                id:this.article_product.id,
                price: parseInt(price)
            }
        )
    }

    // DELETE EVENT
    deleteArticle() {
        this.articleDelete.emit(this.article_product.id)
    }
}
