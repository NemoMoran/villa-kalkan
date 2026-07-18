"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface-muted p-6 text-center">
        <p className="font-semibold text-ink">Thanks for reaching out!</p>
        <p className="mt-1 text-sm text-ink-muted">
          We&apos;ll get back to you as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot: hidden from real visitors, often filled in by bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm text-ink outline-none focus:border-ink"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full">
        {status === "submitting" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
