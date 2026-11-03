import { createClient } from '@supabase/supabase-js';

// Supabase configuration from environment variables only
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. ' +
    'Please ensure they are set in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
