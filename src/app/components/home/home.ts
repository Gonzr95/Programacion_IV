import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Counter } from '../counter/counter';
import { RouterLink } from "@angular/router";

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-home',
  imports: [FormsModule, Counter, RouterLink, ButtonModule, InputTextModule, CardModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
  
  
  
  owner: string = 'Gonza';
  theme = signal<string>('light');
  
  // declaracion de signal para propiedades que cambian con el tiempo
  isButtonDisabled = signal<boolean>(true);
  toogleButton() {
    this.isButtonDisabled.set(!this.isButtonDisabled());
  }
  
  inputValue = signal<string>('');
  updateInputValue(event: KeyboardEvent){
    if(event.key === 'Enter') this.inputValue.set((event.target as HTMLInputElement).value);
  }

  showInput(){
    console.log("presionaste enter, no accedi al evento del teclado");
  }

  firstName: string = '';

  initialCount = 81;
  
  toggleDarkMode() {
    const element = document.querySelector('html');
    element!.classList.toggle('my-app-dark');
}
  
}
