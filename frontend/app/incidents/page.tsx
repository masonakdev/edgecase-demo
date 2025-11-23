"use client";

import { useEffect, useState } from "react";

type IncidentSummary = {
  id: number;
  status: string;
  category: string;
  objectType: string;
  jumpType: string;
  location: string;
  injuries: string;
  weather: string;
  occurredAt: string;
  createdAt: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<IncidentSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState<string>("");
  const [objectType, setObjectType] = useState<string>("");
  const [jumpType, setJumpType] = useState<string>("");

  const fetchIncidents = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (category) params.append("category", category);
      if (objectType) params.append("objectType", objectType);
      if (jumpType) params.append("jumpType", jumpType);

      const url = `${API_BASE_URL}/api/incidents/public${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      const res = await fetch(url);
      if (!res.ok) {
        setError("Failed to load incidents.");
        setIncidents([]);
        return;
      }

      const data: IncidentSummary[] = await res.json();
      setIncidents(data);
    } catch (err) {
      console.error(err);
      setError("Network error while loading incidents.");
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchIncidents();
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-2">BASE Incident Archive</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Public list of submitted incidents. Use filters to narrow down by
        category, object type, or jump type.
      </p>

      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-wrap gap-4 items-end bg-card border border-border rounded-xl p-4"
      >
        <div className="flex flex-col">
          <label className="text-xs font-semibold text-foreground mb-1">
            Category
          </label>
          <input
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground placeholder:text-muted-foreground"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold text-foreground mb-1">
            Object type
          </label>
          <input
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground placeholder:text-muted-foreground"
            value={objectType}
            onChange={(e) => setObjectType(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs font-semibold text-foreground mb-1">
            Jump type
          </label>
          <input
            className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground placeholder:text-muted-foreground"
            value={jumpType}
            onChange={(e) => setJumpType(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="mb-4 rounded-md border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
          {error}
        </div>
      )}

      <div className="overflow-x-auto border border-border rounded-xl">
        <table className="min-w-full divide-y divide-border text-sm bg-card">
          <thead>
            <tr className="bg-background/60">
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                ID
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                Category
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                Object
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                Jump type
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                Location
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                Injuries
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                Occurred
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {incidents.length === 0 && !loading && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-4 text-center text-muted-foreground"
                >
                  No incidents found.
                </td>
              </tr>
            )}
            {incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-background/40">
                <td className="px-3 py-2 text-foreground">{incident.id}</td>
                <td className="px-3 py-2 text-foreground">
                  {incident.category}
                </td>
                <td className="px-3 py-2 text-foreground">
                  {incident.objectType}
                </td>
                <td className="px-3 py-2 text-foreground">
                  {incident.jumpType}
                </td>
                <td className="px-3 py-2 text-foreground">
                  {incident.location}
                </td>
                <td className="px-3 py-2 text-foreground">
                  {incident.injuries}
                </td>
                <td className="px-3 py-2 text-foreground">
                  {incident.occurredAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}