import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { HomeComponent } from './home/home.component'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
