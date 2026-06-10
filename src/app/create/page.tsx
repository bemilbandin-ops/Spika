import type { Metadata } from "next";

import { CreateEventForm } from "@/components/CreateEventForm";

export const metadata: Metadata = {
  title: "Create event",
  description: "Create a private Group Date Planner event."
};

export default function CreateEventPage() {
  return (
    <section className="grid max-w-2xl gap-8 py-12">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Start planning
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-stone-950">
          Create an event
        </h1>
        <p className="text-stone-700">
          Give your event a title and optional details. You will get a private
          link to share with the group.
        </p>
      </div>

      <CreateEventForm />
    </section>
  );
}
