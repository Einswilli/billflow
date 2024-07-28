import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

    // ngAfterViewInit() {
    //     // Initialise les icônes après que la vue a été initialisée
    //     if (window['duoIcons']) {
    //     window['duoIcons'].createIcons();
    //     }
    // }
}
