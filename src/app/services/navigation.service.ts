import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        pairwise()
      )
      .subscribe(([prev, curr]) => {
        this.history.push(prev.urlAfterRedirects);
      });
  }

  getPreviousUrl(): string | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }
}
