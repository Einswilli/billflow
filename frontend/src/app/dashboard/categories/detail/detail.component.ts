import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Category } from 'src/app/models/category';
import { CategoriesService } from '../services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'category-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

    @Input()
    category?: Category
    @Input()
    modal?: any
    @Input()
    parent?: any
    form!: FormGroup

    constructor(
        private router:Router,
        private formBuilder : FormBuilder,
        private categoryServices : CategoriesService,
        private toastService : NgToastService
    ){}

    ngOnInit(): void {
        // INITIALIZE FORM
        this.init_form()

    }

    go_back(){
        // this.router.navigate(['/categories'])
        this.modal.close()
        this.parent.get_categories()
    }

    // INIT FORM
    init_form(){
        this.form = this.formBuilder.group(
            {
                name: [
                    this.category?.name, [
                    Validators.required,
                    Validators.pattern('^[a-zA-Z0-9\- ~éÉèÈêÊÎÎÏ¨ç_\s]*$')
                    ]
                ],
                description: [
                    this.category?.description,
                    [
                        Validators.required,
                    ]
                ]
            }
        )
    }

    // FORM ACCESSOR
    get f(){
        return this.form.controls
    }

    // SAVE
    save(){
        // BUILD REQUEST DATA

        var data = {
            name: this.f['name'].value,
            description: this.f['description'].value
        }

        // SEND REQUEST
        this.categoryServices.update(this.category!.id,data).subscribe(
            {
                next: (category:Category)=>{

                    // THEN NOTIFY USER
                    this.toastService.success({
                        detail:"Enrégistrement",
                        summary:`${category.name} enrégistré avec succès! `,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
                    this.go_back()
                    // this.form.reset()
                },
                error:(err)=>{
                    console.log(JSON.stringify(err))
                    // THEN NOTIFY USER
                    this.toastService.error({
                        detail:`${err.error.type}`,
                        summary:`${err.error.errors[0].detail}`,
                        duration:10000,
                        sticky:false,
                        position:'topRight'
                    })
                },
            }
        )
    }
}
