import { Injectable, inject } from '@angular/core';
import { PrimeNG } from 'primeng/config';

import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private primeng = inject(PrimeNG);

  setAura() {
    this.primeng.theme.set({
      preset: Aura
    });
  }

  setLara() {
    this.primeng.theme.set({
      preset: Lara
    });
  }
}