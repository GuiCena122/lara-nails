import { updateSession } from '@/utils/supabase/midleware'

export async function middleware(request: import('next/server').NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: '/admin/:path*',
}
