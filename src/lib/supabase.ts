import { createClient } from '@supabase/supabase-js'

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

try {
  new URL(supabaseUrl)
} catch {
  console.warn('Invalid SUPABASE_URL detected during build. Falling back to placeholder.')
  supabaseUrl = 'https://placeholder.supabase.co'
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
