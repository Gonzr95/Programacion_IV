import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  client: SupabaseClient;

  constructor() {
    this.client = createClient(
    'https://xbpzvtvcccjzjqwosmgg.supabase.co',
    'sb_publishable_kHHc7GsDyQjeluOZFU-FeQ_k7zH5EJi'
    );
  }
    // Verificar si el email ya existe en la tabla users
    // TODO  pasar a servicio de user
  async verificarEmailExistente(email: string) {
    return await this.client
      .from('users')
      .select('email')
      .eq('email', email);
  }


}
