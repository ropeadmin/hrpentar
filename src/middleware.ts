import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("authData")
  const cookieValue = cookie?.value;
  let accessToken = ''

  if (cookieValue) {
    const parsedCookie = JSON.parse(cookieValue);
    accessToken = parsedCookie.accessToken;
    
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/dashboard/:path*'
}