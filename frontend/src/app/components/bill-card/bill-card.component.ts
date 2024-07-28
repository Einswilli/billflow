import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Bill } from 'src/app/models/bill';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent {

    @Input()
    bill?: Bill
    @Output()
    billPreviewd: EventEmitter<Bill> = new EventEmitter<Bill>()

    preview_bill(){
        this.billPreviewd.emit(this.bill)
    }
}
