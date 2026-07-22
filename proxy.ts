import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, hasLocale } from "@/lib/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

function isAuthorizedAdmin(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;

  const [user, pass] = atob(auth.slice(6)).split(":");
  return user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASSWORD;
}

function detectLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && hasLocale(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((part) => part.split(";")[0].trim().split("-")[0].toLowerCase());

    for (const tag of preferred) {
      if (hasLocale(tag)) return tag;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Password-gate the review moderation screen (any locale prefix) — it's
  // not linked from anywhere public, but Basic Auth keeps it from being
  // discoverable/usable by anyone but the site owner.
  if (pathname.includes("/admin/")) {
    if (!isAuthorizedAdmin(request)) {
      // TEMP DIAGNOSTIC — remove once admin auth is confirmed working.
      const debug = `user_set=${process.env.ADMIN_USER !== undefined} user_len=${process.env.ADMIN_USER?.length ?? 0} pass_set=${process.env.ADMIN_PASSWORD !== undefined} pass_len=${process.env.ADMIN_PASSWORD?.length ?? 0}`;
      return new NextResponse(`Authentication required\n${debug}`, {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
      });
    }
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (pathnameHasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const suffix = pathname === "/" ? "" : pathname;
  const url = new URL(`/${locale}${suffix}`, request.url);
  url.search = request.nextUrl.search;

  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, { maxAge: 60 * 60 * 24 * 365 });
  return response;
}

export const config = {
  matcher: [
    // The trailing `.*\.[^/]+$` alternative excludes any request path ending
    // in a file extension, so static assets served from `public/` (villa
    // photos, favicons, etc.) are never caught by the locale redirect.
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|icon|opengraph-image|.*\\.[^/]+$).*)",
  ],
};
