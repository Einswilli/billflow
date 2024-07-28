import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {

    @Input()
    category?: Category
    @Output()
    categoryDeleted: any = new EventEmitter<Category>()
    @Output()
    categoryUpdateRequest: any = new EventEmitter<Category>()

    constructor(){}

    // EMIT DELETE EVENT
    deleteCategory(){
        this.categoryDeleted.emit(this.category)
    }

    // EMIT UPDATE REQUEST
    updateCategory(){
        this.categoryUpdateRequest.emit(this.category)
    }
}
