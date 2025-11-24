import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // ถ้าเป็นหน้า login และมี token แล้ว ให้ redirect ไปหน้าหลัก
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ถ้าไม่ใช่หน้า login และไม่มี token ให้ redirect ไปหน้า login
  if (!pathname.startsWith('/login') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|layout|themes|demo|public).*)',
  ],
}
