import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs on the server before the page loads
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookie (more secure than localStorage)
  const token = request.cookies.get('adminToken')?.value;

  // Public routes that don't require authentication
  const isPublicRoute = pathname === '/admin' || pathname === '/admin/login';

  // Protected admin routes
  const isProtectedRoute = pathname.startsWith('/admin/') && !isPublicRoute;

  // Redirect to login if accessing protected route without token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/admin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing login with valid token
  if (isPublicRoute && token && pathname === '/admin') {
    const dashboardUrl = new URL('/admin/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Configure which routes this middleware runs on
export const config = {
  matcher: '/admin/:path*',
};
