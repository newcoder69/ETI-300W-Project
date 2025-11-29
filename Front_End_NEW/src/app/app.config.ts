import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomepageComponent } from './homepage/homepage';
import { ResultsComponent } from './results/results';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: HomepageComponent },
      { path: 'results', component: ResultsComponent }
    ]),
    importProvidersFrom(FormsModule)
  ]
};
