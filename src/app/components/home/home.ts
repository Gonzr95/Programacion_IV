import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Counter } from '../counter/counter';
import { RouterLink } from "@angular/router";

// PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { ThemeService } from '../../features/themes/service/theme';


@Component({
  selector: 'app-home',
  imports: [FormsModule, Counter, RouterLink, 
            ButtonModule, InputTextModule, CardModule, SelectModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(public themeService: ThemeService){}
  selectedTheme: any;
  selectedMode: any;
  themes = [
    { name: 'Aura', key: 'aura' },
    { name: 'Lara', key: 'lara' },
    { name: 'Material', key: 'material' }
  ];
  
  
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
  

  changeTheme(theme: any) {
   this.themeService.setTheme(theme.key);
  }

  ngOnInit(): void {
    this.selectedTheme = this.themes.find(
    t => t.key === this.themeService.theme()
    );
  }
  
}
