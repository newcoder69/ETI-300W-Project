import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: HomepageComponent } // default route
    ]),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(FormsModule)
  ]
};
