import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-indicator',
  templateUrl: './nav-indicator.component.html',
  styleUrls: ['./nav-indicator.component.css']
})
export class NavIndicatorComponent {

    @Input()
    title?: string
    @Input()
    path?: string

}
