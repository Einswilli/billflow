import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { getFormValidationErrors } from 'src/app/utils/forms';
import { CategoriesService } from '../../categories/services/categories.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

    form!: FormGroup
    categories?: Category[] = []
    STEPS = ['RNB','CD','PT']
    current_step: string = 'RNB'
    errors?: string[] = []
    @Input()
    product?: Product
    @Input()
    modal?: any
    @Input()
    parent?: any

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
                    this.product?.name,[
                        Validators.required,
                        Validators.pattern('^[a-zA-Z0-9\- ~éÉèÈêÊÎÎÏ¨ç_\s]*$')
                    ]
                ],
                code: [
                    this.product?.code,[
                        Validators.required,
                        Validators.minLength(5)
                    ]
                ],
                brand: [
                    this.product?.brand,[
                        Validators.required,
                        Validators.pattern('^[a-zA-Z0-9\- ~éÉèÈêÊÎÎÏ¨ç_\s]*$')
                    ]
                ],
                description: [
                    this.product?.description,[
                        Validators.maxLength(150)
                    ]
                ],
                category: [
                    this.product?.category.id,[
                        Validators.required
                    ]
                ],
                price: [
                    this.product?.price,[
                        Validators.required,
                        Validators.min(0),
                        Validators.pattern('^[0-9]*$')
                    ]
                ],
                tva: [
                    this.product?.tva,[
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

    // GO BACK
    go_back(){
        // CLOSE MODAL
        this.modal!.close()
        // AND RELOAD PRODUCTS
        this.parent.get_products()
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
            this.productService.update(this.product!.id,data).subscribe(
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
                        this.go_back()
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
