import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Route guard untuk area administrasi.
 *
 * Next.js 16: konvensi `middleware.ts` sudah deprecated dan diganti `proxy.ts`
 * (lihat node_modules/next/dist/docs/.../proxy.md).
 *
 * Karena auth pada PoC ini simulatif (tanpa backend), verifikasi hanya
 * memastikan cookie `auth_session` ada. Ini bukan pertahanan keamanan
 * sungguhan — lihat docs/security-governance.md untuk desain OIDC aslinya.
 */

const SESSION_COOKIE = "auth_session";

export function proxy(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE)?.value;

  if (session) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboards/:path*",
    "/apps/:path*",
    "/participants/:path*",
    "/programs/:path*",
    "/reports/:path*",
    "/settings/:path*",
  ],
};
