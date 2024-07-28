import { Component } from '@angular/core';
import { Client } from 'src/app/models/client';
import { ClientsService } from '../services/clients.service';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

    clients?: Client[] = []
    next?: string | null
    previous?: string | null

    constructor(
        private clientService: ClientsService,
        private toastService: NgToastService,
        private modalService: NgbModal
    ){}

    ngOnInit(): void {
        // LOAD CLIENTS
        this.get_clients()
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
        this.clientService.search(text).subscribe(
            {
                next:(data:any)=>{
                    this.clients = data.results;
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

    // DELETION ALERT
    alertConfirmation(client:Client) {
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
                this.delete_client(client)
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Swal.fire('Cancelled', 'Product still in our database.)', 'error');
            }
        });
    }

    // DELETE
    delete(client:Client){
        this.alertConfirmation(client)
    }

    // SEND DELETE REQUEST
    delete_client(client:Client){
        this.clientService.delete(client.id).subscribe(
            {
                next:(data:any)=>{
                    // RELOAD CATEGORIES LIST
                    this.get_clients()
                    // THEN NOTIFY USER
                    this.toastService.success({
                        detail:`Success`,
                        summary:`${client.first_name} successfully deleted.`,
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

    // OPEN DETAIL MODAL
    openUpdateModal(client:Client){
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
        mod.componentInstance.client = client;
        mod.componentInstance.modal = mod
        mod.componentInstance.parent = this
        mod.result
    }
}
