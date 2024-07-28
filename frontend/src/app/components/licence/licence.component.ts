import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-licence',
  templateUrl: './licence.component.html',
  styleUrls: ['./licence.component.css']
})
export class LicenceComponent {

    @Input() markdownContent!: string
    @Input() licenceName!: string
    @Input() modal!: any
    @Output()
    licence_accepted: EventEmitter<any> = new EventEmitter()

    go_back(){
        this.modal.close()
    }

    // ACCEPT LICENCE
    accept_licence(){
        localStorage.setItem(this.licenceName,'OK')
        this.licence_accepted.emit('OK')
        this.go_back()
    }
}
