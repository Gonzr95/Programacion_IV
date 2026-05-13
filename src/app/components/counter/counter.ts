import { Component, model } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
  <h1>Counter</h1>

  <button (click)="updateCount(-1)">-</button>
  <Span>{{ count() }}</Span>
  <button (click)="updateCount(+1)">+</button>

`})
export class Counter {
  // usamos model para sincronizar con componente padre. No se usa signal ya que 
  // no esta pensado para enlazare automaticamente con su componente padre
  count = model<number>(0);

  updateCount(value: number) {
    this.count.update((prev) => prev + value);
  }
}
