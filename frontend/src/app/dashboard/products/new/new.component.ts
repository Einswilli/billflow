import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../../categories/services/categories.service';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { NgToastService } from 'ng-angular-popup';
import { getFormValidationErrors } from '../../../utils/forms'

@Component({
  selector: 'new-product',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

    form!: FormGroup
    categories?: Category[] = []
    STEPS = ['RNB','CD','PT']
    current_step: string = 'RNB'
    errors?: string[] = []

    constructor(
        private formBuilder : FormBuilder,
        private productService: ProductsService,
        private categoryService: CategoriesService,
        private toastService: NgToastService
    ){}

    ngOnInit(): void {
        // INITIALIZE FORM
        this.initForm()

        // LOAD CATEGORIES
        this.get_categories()
    }

    // INIT FORM
    initForm(){
        this.form = this.formBuilder.group(
            {
                name: [
                    '',[
                        Validators.required,
                        Validators.pattern('^[a-zA-Z0-9\- ~éÉèÈêÊÎÎÏ¨ç_\s]*$')
                    ]
                ],
                code: [
                    '',[
                        Validators.required,
                        Validators.minLength(5)
                    ]
                ],
                brand: [
                    '',[
                        Validators.required,
                        Validators.pattern('^[a-zA-Z0-9\- ~éÉèÈêÊÎÎÏ¨ç_\s]*$')
                    ]
                ],
                description: [
                    'Aucune description',[
                        Validators.maxLength(150)
                    ]
                ],
                category: [
                    '',[
                        Validators.required
                    ]
                ],
                price: [
                    0,[
                        Validators.required,
                        Validators.min(0),
                        Validators.pattern('^[0-9]*$')
                    ]
                ],
                tva: [
                    0,[
                        Validators.required,
                        Validators.min(0),
                        Validators.max(100),
                        Validators.pattern('^[0-9]*$')
                    ]
                ]
            }
        )
    }

    // FORM ACCESSOR
    get f (){
        return this.form?.controls
    }

    // CHANGE THE FORM STEPS
    changeStep(step:string){
        // FIRST CHANGE CURRENT STEP
        this.current_step = step;

        // AND THEN HIDE OTHER FORM ELEMENTS
        this.STEPS.forEach((stp:string)=>{
            // GET ELEMENT BY ID
            let element = document.getElementById(stp);
            console.log(element)
            if(stp != step){
                element?.classList.add('hidden')
            }else{
                element?.classList.remove('hidden')
            }
        })
    }

    // GET CATEGORIES
    get_categories(){
        this.categoryService.list().subscribe(
            {
                next:(data:any)=>{
                    this.categories = data.results;
                },
                error:(err:any)=>{}
            }
        )
    }

    // SAVE
    save(){
        // VALIDATE FORM
        if(this.form.valid){
            // GET FORM VALUES
            let data = {...this.form.value};

            // CALL SERVICE
            this.productService.add(data).subscribe(
                {
                    next:(product:Product)=>{
                        // THEN NOTIFY USER
                        this.toastService.success({
                            detail:"Enrégistrement",
                            summary:`${product.name} enrégistré avec succès! `,
                            duration:10000,
                            sticky:false,
                            position:'topRight'
                        })
                        this.form.reset()
                    },
                    error:(err:any)=>{
                        // THEN NOTIFY USER
                        this.toastService.success({
                            detail:`${err.error.type.replace}`,
                            summary:`Un problème est survenu lors de l'enregistrement! `,
                            duration:10000,
                            sticky:false,
                            position:'topRight'
                        })

                        // FILL ERRORS
                        this.errors = err.error.errors;
                    }
                }
            )
        }else{
            // ADD FORM ERRORS TO ERRORS
            console.log(this.form.errors)
            this.errors = getFormValidationErrors(this.form)
        }
    }
}
