import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private supabase = createClient(
    'https://xbpzvtvcccjzjqwosmgg.supabase.co',
    'sb_publishable_kHHc7GsDyQjeluOZFU-FeQ_k7zH5EJi'
  );
}
