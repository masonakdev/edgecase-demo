import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EdgeCase – BASE Incident Hub",
  description: "Submit and learn from BASE incidents."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-border bg-card/80 backdrop-blur">
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold">EdgeCase</span>
                  <span className="text-xs text-muted-foreground">
                    BASE Incident Hub
                  </span>
                </div>
              </Link>
              <nav className="flex items-center gap-4 text-sm">
                <Link
                  href="/incidents"
                  className="text-muted-foreground hover:text-primary"
                >
                  Archive
                </Link>
                <Link
                  href="/reports"
                  className="text-muted-foreground hover:text-primary"
                >
                  Reports
                </Link>
                <Link
                  href="/submit"
                  className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Submit Incident
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-border bg-background/80">
            <div className="max-w-5xl mx-auto px-4 py-3 text-xs text-muted-foreground flex justify-between gap-2">
              <span>© 2025 EdgeCase.</span>
              <span>For training and learning only.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}