import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';


import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Material from '@primeuix/themes/material';
import Nora from '@primeuix/themes/nora';
//import Tailwind from '@primeuix/themes/tailwind';
//import TailwindDark from '@primeuix/themes/tailwind-dark';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    
    // **** Configuración de PrimeNG **** 
    providePrimeNG({
      theme: {
        preset: Nora,
        options: {
            darkModeSelector: '.my-app-dark'
        }
      }
    })
  ]
};
