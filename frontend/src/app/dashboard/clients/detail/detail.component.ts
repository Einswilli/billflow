import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ClientsService } from '../services/clients.service';
import { getFormValidationErrors } from 'src/app/utils/forms';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

    form!: FormGroup
    @Input()
    client?: Client
    @Input()
    modal?: any
    parent?: any
    errors?: string[] = []

    constructor(
        private formBuilder: FormBuilder,
        private clientService: ClientsService,
        private toastService: NgToastService
    ){}

    ngOnInit(): void {
        // BUILD CLIENT CREATION FORM
        this.initForm()
    }

    // INITIALIZE THE FORM
    initForm(){
        this.form = this.formBuilder.group(
            {
                first_name: [
                    this.client?.first_name,[
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)

                    ]
                ],
                last_name: [
                    this.client?.last_name,[
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)
                    ]
                ],
                email: [
                    this.client?.email,[
                        Validators.required,
                        Validators.email,
                        Validators.maxLength(100)
                    ]
                ],
                phone: [
                    this.client?.phone,[
                        Validators.required,
                        Validators.minLength(8),
                    ]
                ],
                address: [
                    this.client?.address,[
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(150),
                    ]
                ],
                city: [
                    this.client?.city,[
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)
                    ]
                ],
                postal_code: [
                    this.client?.postal_code,[
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(10),
                    ]
                ],
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

    // SAVE
    save(){
        // VALIDATE FORM
        if(this.form.valid){
            // GET FORM VALUES
            let data = {...this.form.value};

            // CALL SERVICE
            this.clientService.update(this.client!.id,data).subscribe(
                {
                    next:(client:Client)=>{
                        // THEN NOTIFY USER
                        this.toastService.success({
                            detail:"Success",
                            summary:`${client.first_name} successfully saved! `,
                            duration:10000,
                            sticky:false,
                            position:'topRight'
                        })
                        // this.form.reset()
                    },
                    error:(err:any)=>{
                        // THEN NOTIFY USER
                        this.toastService.error({
                            detail:`${err.error.type.replace('_',' ')}`,
                            summary:`${err.error.erros[0].detail}`,
                            duration:10000,
                            sticky:false,
                            position:'topRight'
                        })

                        // FILL ERRORS
                        this.errors = err.error.errors;
                        console.log(JSON.stringify(this.errors))
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
