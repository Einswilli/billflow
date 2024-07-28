import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsService } from '../services/clients.service';
import { NgToastService } from 'ng-angular-popup';
import { Client } from 'src/app/models/client';
import { getFormValidationErrors } from 'src/app/utils/forms';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent {

    form!:FormGroup
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
                    '',[
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)

                    ]
                ],
                last_name: [
                    '',[
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)
                    ]
                ],
                email: [
                    '',[
                        Validators.required,
                        Validators.email,
                        Validators.maxLength(100)
                    ]
                ],
                phone: [
                    '',[
                        Validators.required,
                        Validators.minLength(8),
                    ]
                ],
                address: [
                    '',[
                        Validators.required,
                        Validators.minLength(10),
                        Validators.maxLength(150),
                    ]
                ],
                city: [
                    '',[
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(50)
                    ]
                ],
                postal_code: [
                    '',[
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

    // SAVE
    save(){
        // VALIDATE FORM
        if(this.form.valid){
            // GET FORM VALUES
            let data = {...this.form.value};

            // CALL SERVICE
            this.clientService.add(data).subscribe(
                {
                    next:(client:Client)=>{
                        // THEN NOTIFY USER
                        this.toastService.success({
                            detail:"Enrégistrement",
                            summary:`${client.first_name} enrégistré avec succès! `,
                            duration:10000,
                            sticky:false,
                            position:'topRight'
                        })
                        this.form.reset()
                    },
                    error:(err:any)=>{
                        // THEN NOTIFY USER
                        this.toastService.error({
                            detail:`${err.error.type.replace('_',' ')}`,
                            summary:`Un problème est survenu lors de l'enregistrement! `,
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
