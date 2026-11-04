import { createClient } from '@supabase/supabase-js';

// Both values are public by design: the publishable key ships to the browser,
// and row level security in the database decides what each user can read.
// Never put the secret (sb_secret_...) key in a VITE_ variable.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Missing Supabase environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY. ' +
    'Please ensure they are set in your .env file.'
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
