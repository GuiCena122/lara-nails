import { createClient } from '@supabase/supabase-js';

// Adicionamos valores "placeholder" para evitar que o build do Vercel quebre
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

// Validação extra para garantir que Vercel não quebre se a URL vier errada (ex: sem https://)
try {
  new URL(supabaseUrl);
} catch (e) {
  console.warn('Invalid SUPABASE_URL detected during build. Falling back to placeholder.');
  supabaseUrl = 'https://placeholder.supabase.co';
}

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn('Supabase credentials missing. Using placeholders for build.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
