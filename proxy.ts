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

const MAINTENANCE_PAGE = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Villa Kalkan — Back soon</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: #faf7f0;
        color: #1c1c1c;
        text-align: center;
        padding: 24px;
      }
      h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
      p { color: #6b6b6b; }
    </style>
  </head>
  <body>
    <div>
      <h1>Villa Kalkan</h1>
      <p>Wir führen Wartungsarbeiten durch. Wir sind in Kürze wieder für Sie da.</p>
    </div>
  </body>
</html>`;

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

  // Site-wide maintenance mode — set MAINTENANCE_MODE=true in Vercel's
  // env vars (then redeploy) to hide the site from visitors. /admin stays
  // reachable so review moderation still works while the site is "off".
  // Remove the env var (and redeploy) to bring it back.
  if (process.env.MAINTENANCE_MODE === "true" && !pathname.includes("/admin/")) {
    return new NextResponse(MAINTENANCE_PAGE, {
      status: 503,
      headers: { "content-type": "text/html; charset=utf-8", "retry-after": "3600" },
    });
  }

  // Password-gate the review moderation screen (any locale prefix) — it's
  // not linked from anywhere public, but Basic Auth keeps it from being
  // discoverable/usable by anyone but the site owner.
  if (pathname.includes("/admin/")) {
    if (!isAuthorizedAdmin(request)) {
      return new NextResponse("Authentication required", {
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
