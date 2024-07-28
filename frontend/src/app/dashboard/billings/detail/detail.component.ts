import { Component, Input } from '@angular/core';
import { Bill } from 'src/app/models/bill';
// import * as pdf from 'html2pdf.js';

declare const require: any
var pdf = require('html2pdf.js')

@Component({
  selector: 'bill-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent {

    @Input()
    bill?: Bill
    @Input()
    modal: any

    // GO BACK
    go_back(){
        // CLOSE MODAL
        this.modal!.close()
    }

    // EXPORT PDF
    exportPDF(){
        var element = document.getElementById("invoice");
        const opt = {
            margin: [10, 10, 10, 10], // PDF DOCUMENT MARGINS (in pixels)
            filename: `Facture ${this.bill?.client.first_name} ${this.bill?.client.last_name} ${this.bill?.created}.pdf`, // PDF FILENAME
            image: {
                type: 'jpeg',
                quality: 0.98 // IMAGE QUALITY (0.98 means 98%)
            },
            html2canvas: {
                scale: 3 // SCREENSHOT SCALE FACTOR (3 means 3 times element size)
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            } // PDF DOCUMENT FORMAT (A4 portrait)
        };

        // GENERATE PDF FROM ELEMENT
        pdf().from(element).set(opt).save();
        document.getElementById("spc")?.classList.add('dnone');
    }

}
