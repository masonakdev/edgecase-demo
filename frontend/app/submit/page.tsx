"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  location: z.string().max(128).optional().or(z.literal("")),
  category: z.string().min(1, "Category is required"),
  objectType: z.string().min(1, "Object type is required"),
  jumpType: z.string().min(1, "Jump type is required"),
  injuries: z.string().max(64).optional(),
  suit: z.string().max(32).optional(),
  canopy: z.string().max(32).optional(),
  container: z.string().max(32).optional(),
  pilotChuteSize: z
    .string()
    .optional()
    .refine(
      (v) => v === undefined || v === "" || !Number.isNaN(Number(v)),
      "Must be a number"
    ),
  sliderConfig: z.string().max(8).optional(),
  deployMethod: z.string().min(1, "Deploy method is required"),
  delaySeconds: z
    .string()
    .min(1, "Delay seconds is required")
    .refine((v) => !Number.isNaN(Number(v)), "Must be a number"),
  weather: z.string().min(1, "Weather is required"),
  possibleFactors: z.string().max(128).optional(),
  occurredAt: z
    .string()
    .min(1, "Date of incident is required")
    .refine(
      (v) => !Number.isNaN(Date.parse(v)),
      "Must be a valid date"
    ),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export default function SubmitIncidentPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      category: "",
      objectType: "",
      jumpType: "",
      injuries: "",
      suit: "",
      canopy: "",
      container: "",
      pilotChuteSize: "",
      sliderConfig: "",
      deployMethod: "",
      delaySeconds: "",
      weather: "",
      possibleFactors: "",
      occurredAt: "",
      summary: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/incidents/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: values.location || undefined,
          category: values.category,
          objectType: values.objectType,
          jumpType: values.jumpType,
          injuries: values.injuries || undefined,
          suit: values.suit || undefined,
          canopy: values.canopy || undefined,
          container: values.container || undefined,
          pilotChuteSize:
            values.pilotChuteSize && values.pilotChuteSize !== ""
              ? Number(values.pilotChuteSize)
              : undefined,
          sliderConfig: values.sliderConfig || undefined,
          deployMethod: values.deployMethod,
          delaySeconds: Number(values.delaySeconds),
          weather: values.weather,
          possibleFactors: values.possibleFactors || undefined,
          occurredAt: values.occurredAt,
          summary: values.summary,
        }),
      });

      if (response.status === 201) {
        const data = await response.json();
        setSuccessMessage(
          `Incident submitted for review. Reference ID: ${data.id}`
        );
        form.reset();
        return;
      }

      let data: any = null;
      try {
        data = await response.json();
      } catch {
      }

      if (response.status === 400 && data && data.errors) {
        Object.entries<string>(data.errors).forEach(([field, message]) => {
          form.setError(field as any, { message });
        });
        setServerError("Please fix the highlighted errors.");
      } else {
        setServerError(
          data?.message || "Something went wrong submitting the incident."
        );
      }
    } catch (err) {
      console.error(err);
      setServerError("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold mb-2">Submit an Incident</h1>
      <p className="text-sm text-muted-foreground mb-6">
        This form is public. You don&apos;t need an account to submit an
        incident. Avoid including real names, phone numbers, or other identifying information.
      </p>

      {serverError && (
        <div className="mb-4 rounded-md border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive-foreground">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 rounded-md border border-primary/60 bg-primary/10 px-3 py-2 text-sm text-primary-foreground">
          {successMessage}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-card border border-border rounded-xl p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Undisclosed cliffs, Norway" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Near-fatality, servere, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="objectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Object type</FormLabel>
                  <FormControl>
                    <Input placeholder="Building, span, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jumpType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jump type</FormLabel>
                  <FormControl>
                    <Input placeholder="Sub-terminal, wingsuit, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="suit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suit (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Slick, wingsuit model, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="canopy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Canopy (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Model and size" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="container"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Container (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Container model" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pilotChuteSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pilot chute size (optional)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g. 36" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="sliderConfig"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slider config (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Up, down, off, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deployMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deploy method</FormLabel>
                  <FormControl>
                    <Input placeholder="Stowed, static-line, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="delaySeconds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Delay (seconds)</FormLabel>
                  <FormControl>
                    <Input type="number" min={0} max={60} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="weather"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weather</FormLabel>
                <FormControl>
                  <Input placeholder="Wind, visibility, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="possibleFactors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Possible contributing factors (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Fatigue, unfamiliar object, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="occurredAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of incident</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="injuries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Injuries (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Broken femur, minor sprain, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Summary</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Describe what happened, what went well, what didn&apos;t, and key lessons."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit incident"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}