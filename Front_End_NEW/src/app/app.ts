import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet} from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  template: `<router-outlet></router-outlet>`,
})
export class App {
    constructor(private router: Router) {
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const body = document.body;
          if (event.url === '/' || event.url === '/homepage') {
            body.className = 'homepage-background';
          } else if (event.url.startsWith('/results')) {
            body.className = 'results-background';
          } else {
            body.className = '';
          }
        }
      });
    }
}
