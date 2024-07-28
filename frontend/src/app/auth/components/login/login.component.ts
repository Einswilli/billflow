import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LicenceComponent } from 'src/app/components/licence/licence.component';
import { CCNC, CLA } from 'src/app/utils/licences';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    message:string=''
    licences: string[] = [
        CCNC,CLA
    ]

    constructor(
        private router: Router,
        private authService: AuthService,
        private toastService: NgToastService,
        private modalService: NgbModal
    ){}

    // VAVIGATE
    navigate_to(path:string){
        this.router.navigate([path])
    }

    // LOGIN
    login(username:string,pass:string){
        //  FILLING THE FORM DATA FIELDS
        var d={
          "login":username,
          "password":pass
        }

        // CHECK IF LICENCES ARE ACCEPTED
        var ccnc = localStorage.getItem('CCNC')!
        var cla = localStorage.getItem('CLA')!

        if ((ccnc != 'OK') || (cla != 'OK')){
                console.log('open');
                this.showLicences(d)
        }else{
            // THEN OLGIN
            this.process_login(d)
        }
    }

    // PROCESS LOGIN
    process_login(d:any){
        //  CALLING LOGIN SERVICE
        this.authService.login(d).subscribe(
            {
            next:(data:any)=>{
                // this.tinyAlert(data);
                // ADD USER TOKEN TO LOCALSTORAGE
                localStorage.setItem('access',data.access_token)
                localStorage.setItem('user',JSON.stringify(data.user))

                // THEN REDIRECT TO DASHBOARD
                this.navigate_to('/')
            },
            error:(err)=>{
                // alert(JSON.stringify(err))
                // console.log(JSON.stringify(err))
                this.toastService.error({
                    detail:`${err.error.type}`.replace('_',' '),
                    summary:`${err.error.errors[0].detail}`,
                    duration:10000,
                    sticky:false,
                    position:'topRight'
                })
                // this.tinyAlert('');
            }
            }
        )
    }

    // SHOW LICENCES
    showLicences(d:any){
        // CREATIVE COMMONS NON-COMMERCIAL
        this.previewLicence('CCNC',CCNC).componentInstance.licence_accepted.subscribe(
            {
                next:(data:any)=>{
                    localStorage.setItem('CCNC','OK')
                    // COMMERCIAL LICENCE AGREEMENT
                    this.previewLicence('CLA',CLA).componentInstance.licence_accepted.subscribe(
                        {
                            next:(data:any)=>{
                                localStorage.setItem('CLA','OK')
                                // THEN OLGIN
                                this.process_login(d)
                            }
                        }
                    )
                }
            }
        )
    }

    // PREVIEW LICENCE
    previewLicence(name:string,content:string){
        var mod = this.modalService.open(
            LicenceComponent,
            {
                size: 'lg'
            }
        )
        mod.componentInstance.markdownContent = content
        mod.componentInstance.modal = mod
        mod.componentInstance.licenceName = name
        return mod
    }
}
