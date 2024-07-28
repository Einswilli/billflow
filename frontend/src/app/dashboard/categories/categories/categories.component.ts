import { Component } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

    form!: FormGroup
    categories : Category[] = [];
    next?: string | null
    previous?: string | null

    constructor(
        private modalService:NgbModal,
        private formBuilder : FormBuilder,
        private categoryServices : CategoriesService,
        private toastService : NgToastService
    ){}

    ngOnInit(): void {
        // GET ALL CATEGORIES
        this.get_categories()

        // INITIALIZE CATEGORY CREATION FORM
        this.init_form()
    }

    // FORM ACCESSOR
    get f(){
        return this.form.controls
    }

    // INIT FORM
    init_form(){
        this.form = this.formBuilder.group(
            {
                name: [
                    '', [
                        Validators.required,
                        Validators.pattern('^[a-zA-Z0-9\- ~éÉèÈêÊÎÎÏ¨ç_\s]*$')
                    ]
                ],
                description: [
                    'Pas de description.',
                    [
                        Validators.required,
                    ]
                ]
            }
        )
    }

    // DELETION ALERT
    alertConfirmation(category:Category) {
        Swal.fire({
            title: 'Êtes vous sûre?',
            text: 'La suppression est irreversible.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimer.',
            cancelButtonText: 'Non, annuler',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6e7d88',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.delete_category(category)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
            }
        });
    }

    // GET CATEGORIES
    get_categories(){
        this.categoryServices.list().subscribe(
            {
                next: (data:any) => {
                    this.categories = data.results;
                    this.next = data.next;
                    this.previous = data.previous;
                    // console.log(JSON.stringify(data))
                },
                error: (error) => {}
            }
        )
    }

    // SEARCH CATEGORY
    search_category(text:string){
        this.categoryServices.search(text).subscribe(
            {
                next: (data:any) => {
                    this.categories = data.results;
                    this.next = data.next;
                    this.previous = data.previous;
                },
                error: (error) => {}
            }
        )
    }

    // GET NEXT
    get_next(){
        if (this.next)
        this.categoryServices.request(this.next).subscribe(
            {
                next: (data:any) => {
                    this.categories = data.results;
                    this.next = data.next;
                    this.previous = data.previous;
                }
            }
        )
    }

    // GET PREVIOUS
    get_previous(){
        if (this.previous)
        this.categoryServices.request(this.previous).subscribe(
            {
                next: (data:any) => {
                    this.categories = data.results;
                    this.next = data.next;
                    this.previous = data.previous;
                }
            }
        )
    }

    // SAVE
    save(){
        // BUILD REQUEST DATA

        var data = {
            name: this.f['name'].value,
            description: this.f['description'].value
        }

        // SEND REQUEST
        this.categoryServices.add(data).subscribe(
            {
                next: (category:Category)=>{
                    // RELOAD CATEGORIES LIST
                    this.get_categories()

                    // THEN NOTIFY USER
                    this.toastService.success({
                        detail:"Enrégistrement",
                        summary:`${category.name} enrégistré avec succès! `,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
                    this.form.reset()
                },
                error(err) {
                    console.log(JSON.stringify(err))
                },
            }
        )
    }

    // OPEN UPDATE MODAL
    open_update_modal(category:Category){
        const mod = this.modalService.open(
            DetailComponent,
            {
                size: 'md',
                centered: true,
                backdrop: 'static',
                keyboard: false,
            }
        );
        // PASS DATA TO INSTANCE COMPONENT
        mod.componentInstance.category = category;
        mod.componentInstance.modal = mod
        mod.componentInstance.parent = this
        mod.result
        .then(result=>{
            //then cool it works!
            console.log(result);
        })
        .catch(err=>{
            //then we got an error!
            //alert(err);//('détails command introuvable!');
            console.log(err);
        });
    }

    // DELETE
    delete(category:Category){
        // FIRST SHOW ALERT
        this.alertConfirmation(category)
    }

    delete_category(category:Category){
        // SEND REQUEST
        this.categoryServices.delete(category.id).subscribe(
            {
                next: (data:any)=>{
                    // RELOAD CATEGORIES LIST
                    this.get_categories()
                },
                error: (err)=>{
                    console.log(JSON.stringify(err))
                }
            }
        )
    }
}
