import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { ProductsService } from '../services/products.service';
import { Product } from 'src/app/models/product';
import { Category } from 'src/app/models/category';
import { CategoriesService } from '../../categories/services/categories.service';
import Swal from 'sweetalert2';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'products-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

    products?: Product[] = []
    categories?: Category[] = []
    next?: string
    previous?: string

    constructor(
        private modalService:NgbModal,
        private toastService: NgToastService,
        private productService: ProductsService,
        private categoriesService: CategoriesService
    ){}

    ngOnInit(): void {
        // GET PRODUCTS
        this.get_products()

        // GET CATEGORIES
        this.get_categories()
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

    // OPEN DETAIL MODAL
    openAddModal(product:Product){
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
        mod.componentInstance.product = product;
        mod.componentInstance.modal = mod
        mod.componentInstance.parent = this
        mod.result
    }

    // DELETION ALERT
    alertConfirmation(product:Product) {
        Swal.fire({
            title: 'Êtes vous sûre?',
            text: 'La suppression est irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer.',
            cancelButtonText: 'Non, annuler',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6e7d88',
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                this.delete_product(product)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
            }
        });
    }

    // DELETE
    delete(product:Product){
        // SHOW CONFIRMATION ALERT
        this.alertConfirmation(product)
    }

    delete_product(product:Product){
        // SEND REQUEST
        this.productService.delete(product.id).subscribe(
            {
                next:(data:any)=>{
                    // REFRESH PRODUCTS
                    this.get_products()

                    // THEN NOTIFY USER
                    this.toastService.success({
                        detail:`Success`,
                        summary:`${product.name} successfully deleted.`,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
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
