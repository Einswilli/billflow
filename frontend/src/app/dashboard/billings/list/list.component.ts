import { Component } from '@angular/core';
import { Bill } from 'src/app/models/bill';
import { BillingsService } from '../services/billings.service';
import { NgToastService } from 'ng-angular-popup';
import { ClientsService } from '../../clients/services/clients.service';
import { Client } from 'src/app/models/client';
import { DetailComponent } from '../detail/detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bill-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

    bills: Bill[] = []
    clients: Client[] = []
    next?: string
    previous?: string

    constructor(
        private billingsService: BillingsService,
        private clientService: ClientsService,
        private toastService: NgToastService,
        private modalService: NgbModal
    ){}

    ngOnInit(): void {
        // LOAD BILLS
        this.get_bills()
        // LOAD CLIENTS
        this.get_clients()
    }

    // GET BILLS
    get_bills(){
        this.billingsService.list().subscribe(
            {
                next:(data:any)=>{
                    this.bills = data.results;
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

    // SEARCH
    search(text:string){
        this.billingsService.search(text).subscribe(
            {
                next:(data:any)=>{
                    this.bills = data.results;
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
