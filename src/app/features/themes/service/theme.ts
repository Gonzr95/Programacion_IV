import { Injectable, effect, inject, signal } from '@angular/core';
import { PrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import Material from '@primeuix/themes/material';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  theme = signal(
    localStorage.getItem('theme') || 'aura'
  );
  mode = signal(
    localStorage.getItem('mode') || 'light'
  );
  private presets: any = {
    aura: Aura,
    lara: Lara,
    nora: Nora,
    material: Material
  };
  private primeng = inject(PrimeNG);



  constructor() {
    effect(() => {
      const themeName = this.theme();
      const modeName = this.mode();
      const preset = this.presets[themeName];

     this.primeng.theme.set({
      preset,
      options: {
        darkModeSelector: '.my-app-dark'
      }
    });

      const html = document.documentElement;

      html.classList.toggle(
        'my-app-dark',
        modeName === 'dark'
      );

      localStorage.setItem('theme', themeName);
      localStorage.setItem('mode', modeName);

      console.log('Modo:', modeName);
      console.log('Clase:', document.documentElement.className);
    });
  }
  setTheme(name: string) {
    this.theme.set(name);
  }
  toggleDarkMode() {
    this.mode.update(value =>
      value === 'light' ? 'dark' : 'light'
    );
  }
}