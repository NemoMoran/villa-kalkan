import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">
        404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-ink">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-ink-muted">
        The villa or page you&apos;re looking for may have moved. Try
        browsing the full collection instead.
      </p>
      <LinkButton href="/villas" className="mt-8">
        Browse villas
      </LinkButton>
    </div>
  );
}
