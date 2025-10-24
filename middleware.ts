import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow public routes
        if (
          pathname.startsWith('/links') ||
          pathname.startsWith('/l/') ||
          pathname.startsWith('/api/auth/') ||
          pathname === '/login'
        ) {
          return true
        }

        // Protect admin routes
        if (pathname.startsWith('/admin')) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/login'],
}

