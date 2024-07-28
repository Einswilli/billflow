import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[duoicon]'
})
export class DuoIconDirective implements AfterViewInit {

    @Input()
    duoicon?: string;

    constructor(private el: ElementRef) {}

    ngAfterViewInit() {
      this.el.nativeElement.setAttribute('data-duoicon', this.duoicon);

      // Initialize duo icons
      if (window['duoIcons']) {
        window['duoIcons'].createIcons();
      }
    }

}
