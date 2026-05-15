import { inject, Injectable } from '@angular/core';
import { Supabase } from '../../../core/services/supabase';
import { RegisterCredentials } from '../models/register-credentials';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  supabase = inject(Supabase);

  async signUp (credentials: RegisterCredentials){
    return await this.supabase.client.auth.signUp({
      email: credentials.email,
      password: credentials.password
    })
  }

  // logout
  // sesion actual
  // refresh token
  // recuperar contrasena
  // verificar mail

}
