import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { HomepageComponent } from './homepage/homepage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class App {}
