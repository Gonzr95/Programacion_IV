import { Injectable } from '@angular/core';
import { Supabase } from '../../../core/services/supabase';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  coonstructor(private supabase: Supabase) {
    console.log(supabase);
  }


}
