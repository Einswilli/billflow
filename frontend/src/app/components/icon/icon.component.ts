import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {

    @Input()
    icon?: string
    @Input()
    size?: string

    constructor(

    ){}

    ngAfterViewInit() {
        // Initialise les icônes après que la vue a été initialisée
        if (window['duoIcons']) {
        window['duoIcons'].createIcons();
        }
    }
}
