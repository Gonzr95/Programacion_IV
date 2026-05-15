import { inject, Injectable } from '@angular/core';
import { Supabase } from '../../../core/services/supabase';
import { UserProfile } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supabase = inject(Supabase);

    // Verificar si el email ya existe en la tabla users
  async verificarEmailExistente(email: string) {
    return await this.supabase.client
      .from('users')
      .select('email')
      .eq('email', email);
  }

  async guardarDatosUsuario(userProfile: UserProfile){
    return await this.supabase.client.from('users').insert(userProfile);
  }


  
}
