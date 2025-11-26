import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(FormsModule) // allows [(ngModel)] in your component
  ]
})
.catch(err => console.error(err));
