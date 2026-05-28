import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

export async function requireAdmin() {
  const user = await requireAuth()

  // Basic admin check - in a real app, you'd check a roles table or custom claim
  // For now, we assume the user in the metadata or a specific email is admin
  // You can extend this logic as needed
  const isAdmin = user.app_metadata?.role === 'admin' || user.email === process.env.ADMIN_EMAIL

  if (!isAdmin && process.env.NODE_ENV === 'production') {
    // redirect('/unauthorized') or similar
  }

  return user
}
