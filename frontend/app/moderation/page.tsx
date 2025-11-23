"use client";

import { useState } from "react";

type ModerationIncident = {
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

type IncidentDetails = {
  id: number;
  location: string;
  category: string;
  objectType: string;
  jumpType: string;
  injuries: string;
  weather: string;
  possibleFactors: string;
  summary: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export default function ModerationPage() {
  const [password, setPassword] = useState("");
  const [queue, setQueue] = useState<ModerationIncident[]>([]);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [actionId, setActionId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDetails, setEditDetails] = useState<IncidentDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);

  const hasPassword = password.trim().length > 0;

  const buildAuthHeader = () => {
    return "Basic " + btoa(`moderator:${password}`);
  };

  const loadQueue = async () => {
    if (!hasPassword) {
      setError("Enter moderator password to load the queue.");
      return;
    }
    setLoadingQueue(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/incidents/moderation/queue`, {
        headers: {
          Authorization: buildAuthHeader()
        }
      });
      if (res.status === 401) {
        setError("Unauthorized. Check the moderator password.");
        setQueue([]);
        return;
      }
      if (!res.ok) {
        setError("Failed to load moderation queue.");
        setQueue([]);
        return;
      }
      const data: ModerationIncident[] = await res.json();
      setQueue(data);
      if (data.length === 0) {
        setMessage("No incidents awaiting moderation.");
      } else {
        setMessage(null);
      }
    } catch (e) {
      console.error(e);
      setError("Network error while loading queue.");
      setQueue([]);
    } finally {
      setLoadingQueue(false);
    }
  };

  const loadIncidentDetails = async (id: number) => {
    if (!hasPassword) {
      setError("Enter moderator password first.");
      return;
    }
    setLoadingDetails(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/incidents/moderation/${id}`,
        {
          headers: {
            Authorization: buildAuthHeader()
          }
        }
      );
      if (res.status === 401) {
        setError("Unauthorized. Check the moderator password.");
        return;
      }
      if (!res.ok) {
        setError("Failed to load incident details.");
        return;
      }
      const data = await res.json();
      const details: IncidentDetails = {
        id: data.id,
        location: data.location ?? "",
        category: data.category ?? "",
        objectType: data.objectType ?? "",
        jumpType: data.jumpType ?? "",
        injuries: data.injuries ?? "",
        weather: data.weather ?? "",
        possibleFactors: data.possibleFactors ?? "",
        summary: data.summary ?? ""
      };
      setEditingId(id);
      setEditDetails(details);
    } catch (e) {
      console.error(e);
      setError("Network error while loading incident details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const performAction = async (id: number, action: "approve" | "retract") => {
    if (!hasPassword) {
      setError("Enter moderator password first.");
      return;
    }
    setActionId(id);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/incidents/moderation/${id}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: buildAuthHeader()
          }
        }
      );
      if (res.status === 401) {
        setError("Unauthorized. Check the moderator password.");
        return;
      }
      if (!res.ok) {
        setError(`Failed to ${action} incident.`);
        return;
      }
      setQueue((prev) => prev.filter((i) => i.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setEditDetails(null);
      }
      setMessage(
        action === "approve"
          ? `Incident ${id} approved.`
          : `Incident ${id} retracted.`
      );
    } catch (e) {
      console.error(e);
      setError(`Network error while trying to ${action} incident.`);
    } finally {
      setActionId(null);
    }
  };

  const saveEdit = async () => {
    if (!hasPassword || !editingId || !editDetails) {
      return;
    }
    setSavingEdit(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/incidents/moderation/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: buildAuthHeader()
          },
          body: JSON.stringify({
            location: editDetails.location,
            category: editDetails.category,
            objectType: editDetails.objectType,
            jumpType: editDetails.jumpType,
            injuries: editDetails.injuries,
            weather: editDetails.weather,
            possibleFactors: editDetails.possibleFactors,
            summary: editDetails.summary
          })
        }
      );
      if (res.status === 401) {
        setError("Unauthorized. Check the moderator password.");
        return;
      }
      if (!res.ok) {
        setError("Failed to save changes.");
        return;
      }
      const updated = await res.json();
      setQueue((prev) =>
        prev.map((i) =>
          i.id === updated.id
            ? {
                ...i,
                location: updated.location,
                category: updated.category,
                objectType: updated.objectType,
                jumpType: updated.jumpType,
                injuries: updated.injuries,
                weather: updated.weather
              }
            : i
        )
      );
      setMessage(`Incident ${updated.id} updated.`);
    } catch (e) {
      console.error(e);
      setError("Network error while saving changes.");
    } finally {
      setSavingEdit(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Moderator Queue</h1>
        <p className="text-sm text-muted-foreground">
          Review submitted incidents and decide whether to approve, modify, or retract them.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-semibold text-foreground mb-1">
              Moderator password
            </label>
            <input
              type="password"
              className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={loadQueue}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
            disabled={loadingQueue}
          >
            {loadingQueue ? "Loading..." : "Load queue"}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">
          For demo use, the default moderator username is "moderator".
        </p>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-md border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          {message}
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
                Occurred
              </th>
              <th className="px-3 py-2 text-left font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {queue.length === 0 && !loadingQueue && (
              <tr>
                <td
                  colSpan={7}
                  className="px-3 py-4 text-center text-muted-foreground"
                >
                  No incidents in the moderation queue.
                </td>
              </tr>
            )}
            {queue.map((incident) => (
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
                  {incident.occurredAt}
                </td>
                <td className="px-3 py-2 text-foreground">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => loadIncidentDetails(incident.id)}
                      className="h-8 px-3 rounded-md border border-border text-xs font-medium hover:bg-background"
                      disabled={loadingDetails && editingId === incident.id}
                    >
                      {loadingDetails && editingId === incident.id
                        ? "Loading..."
                        : "Edit"}
                    </button>
                    <button
                      type="button"
                      onClick={() => performAction(incident.id, "approve")}
                      className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90"
                      disabled={actionId === incident.id}
                    >
                      {actionId === incident.id ? "Working..." : "Approve"}
                    </button>
                    <button
                      type="button"
                      onClick={() => performAction(incident.id, "retract")}
                      className="h-8 px-3 rounded-md border border-destructive/70 text-destructive text-xs font-medium hover:bg-destructive/10"
                      disabled={actionId === incident.id}
                    >
                      Retract
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingId && editDetails && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">
              Edit incident {editDetails.id}
            </h2>
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setEditDetails(null);
              }}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-foreground">
                Location
              </label>
              <input
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={editDetails.location}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, location: e.target.value })
                }
              />
              <label className="text-xs font-semibold text-foreground">
                Category
              </label>
              <input
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={editDetails.category}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, category: e.target.value })
                }
              />
              <label className="text-xs font-semibold text-foreground">
                Object type
              </label>
              <input
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={editDetails.objectType}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    objectType: e.target.value
                  })
                }
              />
              <label className="text-xs font-semibold text-foreground">
                Jump type
              </label>
              <input
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={editDetails.jumpType}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, jumpType: e.target.value })
                }
              />
              <label className="text-xs font-semibold text-foreground">
                Injuries
              </label>
              <input
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={editDetails.injuries}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, injuries: e.target.value })
                }
              />
              <label className="text-xs font-semibold text-foreground">
                Weather
              </label>
              <input
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={editDetails.weather}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, weather: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-foreground">
                Possible factors
              </label>
              <input
                className="h-9 rounded-md border border-border bg-background px-2 text-sm text-foreground"
                value={editDetails.possibleFactors}
                onChange={(e) =>
                  setEditDetails({
                    ...editDetails,
                    possibleFactors: e.target.value
                  })
                }
              />
              <label className="text-xs font-semibold text-foreground">
                Summary
              </label>
              <textarea
                className="min-h-[140px] rounded-md border border-border bg-background px-2 py-2 text-sm text-foreground"
                value={editDetails.summary}
                onChange={(e) =>
                  setEditDetails({ ...editDetails, summary: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={saveEdit}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
              disabled={savingEdit}
            >
              {savingEdit ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}