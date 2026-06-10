import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteEventAction, logoutAction } from "@/app/admin/actions";
import { hasValidAdminSession } from "@/lib/adminAuth";
import { listRecentEventsForAdmin } from "@/lib/data/events";

function formatCreatedAt(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

export default async function AdminPage() {
  if (!(await hasValidAdminSession())) {
    redirect("/admin/login");
  }

  const events = await listRecentEventsForAdmin();

  return (
    <section className="grid gap-6 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="grid gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
            Admin
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-stone-950">
            Recent events
          </h1>
        </div>

        <form action={logoutAction}>
          <button
            className="rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:border-stone-400 hover:bg-stone-100"
            type="submit"
          >
            Log out
          </button>
        </form>
      </div>

      {events.length ? (
        <div className="grid gap-3">
          {events.map((event) => (
            <article
              className="grid gap-4 rounded-md border border-stone-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-center"
              key={event.id}
            >
              <div className="grid gap-2">
                <h2 className="text-xl font-semibold text-stone-950">
                  {event.title}
                </h2>
                <p className="text-sm text-stone-600">
                  Created {formatCreatedAt(event.created_at)}
                </p>
                <Link
                  className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
                  href={`/event/${event.id}`}
                >
                  Open event
                </Link>
              </div>

              <form action={deleteEventAction}>
                <input name="eventId" type="hidden" value={event.id} />
                <button
                  className="rounded-md border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50"
                  type="submit"
                >
                  Soft-delete
                </button>
              </form>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-stone-200 bg-white p-5 text-stone-700 shadow-sm">
          No active events found.
        </p>
      )}
    </section>
  );
}
