import { Component } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ProductsService } from '../../products/services/products.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoriesService } from '../../categories/services/categories.service';
import { PqInputComponent } from '../pq-input/pq-input.component';
import { ClientsService } from '../../clients/services/clients.service';
import { Client } from 'src/app/models/client';
import { BillingsService } from '../services/billings.service';
import { Bill } from 'src/app/models/bill';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'new-bill',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

    products?: Product[] = []
    categories?: Category[] = []
    clients?: Client[] = []
    selected_client?: string
    article_products: any[] = []
    errors: string[] = []
    total: number = 0
    next?: string
    previous?: string

    constructor(
        private modalService:NgbModal,
        private toastService: NgToastService,
        private productService: ProductsService,
        private categoriesService: CategoriesService,
        private clientService: ClientsService,
        private billingsService: BillingsService
    ){}

    ngOnInit(): void {
        // GET PRODUCTS
        this.get_products()

        // GET CATEGORIES
        this.get_categories()

        // GET CLIENTS
        this.get_clients()
    }

    // GET PRODUCTS LIST
    get_products(){
        this.productService.list().subscribe(
            {
                next:(data:any)=>{
                    this.products = data.results;
                    this.next = data.next;
                    this.previous = data.previous;
                },
                error:(err:any)=>{
                    // THEN NOTIFY USER
                    this.toastService.error({
                        detail:`${err.error.type.replace('_',' ')}`,
                        summary:`${err.error.errors[0].detail} `,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
                }
            }
        )
    }

    // GET CATEGORIES
    get_categories(){
        this.categoriesService.list().subscribe(
            {
                next:(data:any)=>{
                    this.categories = data.results;
                },
                error:(err:any)=>{
                    // THEN NOTIFY USER
                    this.toastService.error({
                        detail:`${err.error.type.replace('_',' ')}`,
                        summary:`${err.error.errors[0].detail} `,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
                }
            }
        )
    }

    // GET CLIENTS
    get_clients(){
        this.clientService.list().subscribe(
            {
                next: (data:any) => {
                    this.clients = data.results;
                    this.next = data.next;
                    this.previous = data.previous;
                },
                error: (err:any)=>{
                    // THEN NOTIFY USER
                    this.toastService.error({
                        detail:`${err.error.type.replace('_',' ')}`,
                        summary:`${err.error.errors[0].detail} `,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
                }
            }
        )
    }

    // SEARCH PRODUCTS
    search(text:string){
        this.productService.search(text).subscribe(
            {
                next:(data:any)=>{
                    this.products = data.results;
                    this.next = data.next;
                    this.previous = data.previous;
                },
                error:(err:any)=>{
                    // THEN NOTIFY USER
                    this.toastService.error({
                        detail:`${err.error.type.replace('_',' ')}`,
                        summary:`${err.error.errors[0].detail} `,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
                }
            }
        )
    }

    // OPEN SELECT MODAL
    openSelectModal(product:Product){
        const mod = this.modalService.open(
            PqInputComponent,
            {
                size: 'xs',
                centered: true,
                backdrop: 'static',
                keyboard: false,
            }
        )
        // PASS DATA TO INSTANCE COMPONENT
        mod.componentInstance.product = product;
        mod.componentInstance.modal = mod
        mod.componentInstance.parent = this
        mod.componentInstance.productAded.subscribe(
            {
                next:(data:any)=>{
                    // PUSH DATA TO ARTICLE LIST
                    this.article_products?.push(
                        {
                            id: data.product.id,
                            infos: data
                        }
                    )

                    // REFRESH TOTAL PRICE
                    this.total = this.calculate_total_cost()
                }
            }
        )
        mod.result
    }

    // UPDATE CHANGED ARTICLE
    updateArticle(article:any){
        this.article_products.forEach(
            (art:any)=>{
                // CHECK IF CCHANGED ARTICLE IS ART (CURRENT ARTICLE IN THE LOOP)
                if(art.id == article.id){
                    // UPDATE ARTICLE
                    art.infos.selling_price = article.price
                    art.infos.quantity = article.quantity
                    console.log(
                        JSON.stringify(this.build_article_for_request())
                    );
                    // REFRESH TOTAL PRICE
                    this.total = this.calculate_total_cost()
                }
            }
        )
    }

    // REMOVE ARTICLE FROM LIST
    remove_article(article_id:string){
        this.article_products = this.article_products.filter(
            (art:any)=>{
                return art.id != article_id
            }
        )
        // REFRESH TOTAL PRICE
        this.total = this.calculate_total_cost()
    }

    // BUILD ARTICLES
    build_article_for_request(){
        const articles = this.article_products.map(
            (art:any)=>{
                return {
                    product: art.id,
                    quantity: art.infos.quantity,
                    selling_price: art.infos.selling_price
                }
            }
        )

        return articles
    }

    // CALCULATE TOTAL COST
    calculate_total_cost(){
        let total_cost = 0
        this.article_products.forEach(
            (art:any)=>{
                total_cost += art.infos.selling_price //* art.infos.quantity
            }
        )
        return total_cost
    }

    // SAVE
    save(){
        // CHECK IF SELECTED CLIENT IS NOT NULL
        if(this.selected_client === null && this.selected_client === undefined)
            return

        // CHECK THAT PRODUCTS LIST IS NOT EMPTY
        if(this.article_products.length == 0)
            return

        // BUILD ARTICLES
        const articles = this.build_article_for_request()

        // BUILD REQUEST DATA
        const data = {
            client: this.selected_client!,
            articles: articles,
        }
        console.log(JSON.stringify(data));

        this.billingsService.add(data).subscribe(
            {
                next: (res:Bill)=>{
                    // THEN NOTIFY USER
                    this.toastService.success({
                        detail:"Success",
                        summary:`${res.code} successfully saved! `,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })

                    // OPEN PREVIEW MODAL
                    this.open_preview_modal(res)
                },
                error:(err:any)=>{
                    // THEN NOTIFY USER
                    this.toastService.error({
                        detail:`${err.error.type.replace('_',' ')}`,
                        summary:`${err.error.errors[0].attr!??''} ${err.error.errors[0].detail}`,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })

                    // FILL ERRORS
                    this.errors = err.error.errors;
                }
            }
        )
    }

    // OPEN PREVIEW MODAL
    open_preview_modal(bill:Bill){

        const mod = this.modalService.open(
            DetailComponent,
            {
                size: 'lg',
                centered: true,
                backdrop: 'static',
                keyboard: false,
            }
        )
        // PASS DATA TO INSTANCE COMPONENT
        mod.componentInstance.bill = bill;
        mod.componentInstance.modal = mod
        mod.componentInstance.parent = this
        mod.result
    }
}
