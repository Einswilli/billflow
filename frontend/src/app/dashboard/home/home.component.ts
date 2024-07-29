import { Component } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { Category } from 'src/app/models/category';
import { Client } from 'src/app/models/client';
import { Product } from 'src/app/models/product';
import { ProductsService } from '../products/services/products.service';
import { BillingsService } from '../billings/services/billings.service';
import { ClientsService } from '../clients/services/clients.service';
import { CategoriesService } from '../categories/services/categories.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

    products: Product[] = []
    products_count: number = 0
    bills: Bill[] = []
    bills_count: number = 0
    clients: Client[] = []
    client_count: number = 0
    categories: Category[] = []
    categories_counter: number = 0

    constructor(
        private productsService: ProductsService,
        private billingsService: BillingsService,
        private clientsService: ClientsService,
        private categoriesService: CategoriesService,
        private toastService: NgToastService,
    ) { }

    ngOnInit(): void {
        // LOAD BILLS
        this.get_bills()
        // LOAD CLIENTS
        this.get_clients()
        // LOAD PRODUCTS
        this.get_products()
        // LOADCATEGORIES
        this.get_categories()
    }

    // GET BILLS
    get_bills(){
        this.billingsService.list().subscribe(
            {
                next:(data:any)=>{
                    this.bills = data.results;
                    this.bills_count = data.count;
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
        this.clientsService.list().subscribe(
            {
                next: (data:any) => {
                    this.clients = data.results;
                    this.client_count = data.count;
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

    // GET PRODUCTS LIST
    get_products(){
        this.productsService.list().subscribe(
            {
                next:(data:any)=>{
                    this.products = data.results
                    this.products_count = data.count
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
                    this.categories = data.results
                    this.categories_counter = data.count
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
}
