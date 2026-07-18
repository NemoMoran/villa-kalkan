import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold tracking-tight text-ink">
            Villa <span className="text-brand">Kalkan</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-ink-muted">
            Hand-picked luxury villas for daily rental in Kalkan, Turkey.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>
              <Link href="/villas" className="hover:text-ink">
                All villas
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ink">
                About us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-ink">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li>hello@villa-kalkan.net</li>
            <li>+90 000 000 00 00</li>
            <li>Kalkan, Antalya, Turkey</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-ink-muted">
        © {year} Villa Kalkan. All rights reserved.
      </div>
    </footer>
  );
}
