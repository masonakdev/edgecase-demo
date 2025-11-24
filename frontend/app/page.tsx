import Link from "next/link";

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
      <section className="space-y-4 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10 blur-3xl" />
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          BASE Incident Learning Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Capture incidents safely.
          <br />
          Help the community learn.
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          EdgeCase gives the BASE community a single place to submit, review, and
          learn from incidents without exposing identities or exact locations.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/submit"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Submit an incident
          </Link>
          <Link
            href="/incidents"
            className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-card"
          >
            Browse archive
          </Link>
          <Link
            href="/reports"
            className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-card"
          >
            View reports
          </Link>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-card border border-border p-4 space-y-2">
          <h2 className="text-sm font-semibold">Anonymous by design</h2>
          <p className="text-xs text-muted-foreground">
            Share lessons without sharing names, contact details, or precise
            locations. Focus on what happened and what others can learn.
          </p>
        </div>
        <div className="rounded-xl bg-card border border-border p-4 space-y-2">
          <h2 className="text-sm font-semibold">Structured incident data</h2>
          <p className="text-xs text-muted-foreground">
            Capture object type, jump type, gear, weather, and contributing
            factors so patterns and trends become visible over time.
          </p>
        </div>
        <div className="rounded-xl bg-card border border-border p-4 space-y-2">
          <h2 className="text-sm font-semibold">Built for learning</h2>
          <p className="text-xs text-muted-foreground">
            A simple archive and search tools make it easy to find similar
            incidents and review what went right, what went wrong, and why.
          </p>
        </div>
      </section>
    </div>
  );
}