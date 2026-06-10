import type { Metadata } from "next";

import { CreateEventForm } from "@/components/CreateEventForm";

export const metadata: Metadata = {
  title: "Create event",
  description: "Create a private Group Date Planner event."
};

export default function CreateEventPage() {
  return (
    <section className="mx-auto grid min-h-screen max-w-2xl content-start gap-6 px-5 pb-12 pt-36 sm:px-8 sm:pt-40 lg:pt-32">
      <div className="grid gap-3">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d94a1d]">
          Start planning
        </p>
        <h1 className="text-4xl font-extrabold tracking-[-0.045em] text-[#d94a1d]">
          Create an event
        </h1>
        <p className="text-base leading-7 text-[#7d4f3c]">
          Give your event a title, optional details, your name, and the first
          date and time for the group to consider.
        </p>
      </div>

      <CreateEventForm />
    </section>
  );
}
