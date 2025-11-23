"use client";

import { useState } from "react";

type IncidentReportRow = {
  category: string;
  objectType: string;
  jumpType: string;
  totalIncidents: number;
  firstOccurredAt: string;
  lastOccurredAt: string;
};

type IncidentReportResponse = {
  title: string;
  generatedAt: string;
  fromDate: string;
  toDate: string;
  rows: IncidentReportRow[];
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export default function ReportsPage() {
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [report, setReport] = useState<IncidentReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);

      const url = `${API_BASE_URL}/api/reports/incidents/summary${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await fetch(url);
      if (!res.ok) {
        setError("Failed to generate report.");
        setReport(null);
        return;
      }

      const data: IncidentReportResponse = await res.json();
      setReport(data);
    } catch (err) {
      console.error(err);
      setError("Network error while generating report.");
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Incident Summary Report</h1>
        <p className="text-sm text-muted-foreground">
          Generate an aggregate report of incidents over a date range.
        </p>
      </div>

      <form
        onSubmit={handleGenerate}
        className="flex flex-wrap gap-4 items-end bg-card border border-border rounded-xl p-4"
      >
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-foreground mb-1">
            From date
          </label>
          <input
            type="date"
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold text-foreground mb-1">
            To date
          </label>
          <input
            type="date"
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate report"}
        </button>
      </form>

      {error && (
        <div className="rounded-md border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
          {error}
        </div>
      )}

      {report && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">{report.title}</h2>
              <p className="text-xs text-muted-foreground">
                From {report.fromDate} to {report.toDate}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Generated at {new Date(report.generatedAt).toLocaleString()}
            </p>
          </div>

          <div className="overflow-x-auto border border-border rounded-xl">
            <table className="min-w-full divide-y divide-border text-sm bg-card">
              <thead>
                <tr className="bg-background/60">
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Category
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Object type
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Jump type
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Total incidents
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    First occurred
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-foreground">
                    Last occurred
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {report.rows.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-3 py-4 text-center text-muted-foreground"
                    >
                      No data for this range.
                    </td>
                  </tr>
                )}
                {report.rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-background/40">
                    <td className="px-3 py-2 text-foreground">
                      {row.category}
                    </td>
                    <td className="px-3 py-2 text-foreground">
                      {row.objectType}
                    </td>
                    <td className="px-3 py-2 text-foreground">
                      {row.jumpType}
                    </td>
                    <td className="px-3 py-2 text-foreground">
                      {row.totalIncidents}
                    </td>
                    <td className="px-3 py-2 text-foreground">
                      {row.firstOccurredAt}
                    </td>
                    <td className="px-3 py-2 text-foreground">
                      {row.lastOccurredAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}