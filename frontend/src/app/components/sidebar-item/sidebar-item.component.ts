import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/navigation.service';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent {

    @Input()
    icon? : string
    @Input()
    title? : string
    @Input()
    description? : string
    @Input()
    link? : string
    @Input()
    linkTarget? : string
    // @Input()
    active? : boolean


    constructor(
        private navigationService: NavigationService
    ) { }

    ngOnInit(): void {
        this.isActive(this.link!)
    }

    isActive(route: string): void {
        this.navigationService.getCurrentRoute().subscribe(
            (route) => {
                this.active = this.link === route
            }
        );
    }
}
