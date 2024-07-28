import { Injectable } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private currentRoute = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event:Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute.next(event.urlAfterRedirects);
    });
  }

  getCurrentRoute() {
    return this.currentRoute.asObservable();
  }
}
