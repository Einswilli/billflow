import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent {

    @Input()
    client?: Client
    @Output()
    clientDelete = new EventEmitter<Client>()
    @Output()
    updateClientRequest = new EventEmitter<Client>()

    constructor(){}

    // DELETE EMITER
    deleteClient(){
        this.clientDelete.emit(this.client)
    }

    updateClient(){
        this.updateClientRequest.emit(this.client)
    }
}
