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
    <section className="mx-auto grid max-w-5xl gap-6 px-5 pb-12 pt-36 sm:px-8 sm:pt-40 lg:pt-32">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="grid gap-3">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d94a1d]">
            Admin
          </p>
          <h1 className="text-4xl font-extrabold tracking-[-0.045em] text-[#d94a1d]">
            Recent events
          </h1>
        </div>

        <form action={logoutAction}>
          <button
            className="rounded-full border border-[#d94a1d] px-5 py-2 text-sm font-bold text-[#d94a1d] transition hover:bg-[#d94a1d] hover:text-white"
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
              className="grid gap-4 border-2 border-[#d94a1d] bg-[#fffaf1] p-4 shadow-[0_1rem_3rem_rgba(140,49,16,0.1)] md:grid-cols-[1fr_auto] md:items-center"
              key={event.id}
            >
              <div className="grid gap-2">
                <h2 className="text-xl font-extrabold tracking-[-0.035em] text-[#d94a1d]">
                  {event.title}
                </h2>
                <p className="text-sm text-[#7d4f3c]">
                  Created {formatCreatedAt(event.created_at)}
                </p>
                <Link
                  className="text-sm font-extrabold uppercase tracking-[0.1em] text-[#d94a1d] transition hover:text-[#8f2b0f]"
                  href={`/event/${event.id}`}
                >
                  Open event
                </Link>
              </div>

              <form action={deleteEventAction}>
                <input name="eventId" type="hidden" value={event.id} />
                <button
                  className="rounded-full border border-[#d94a1d] px-5 py-2 text-sm font-bold text-[#d94a1d] transition hover:bg-[#d94a1d] hover:text-white"
                  type="submit"
                >
                  Soft-delete
                </button>
              </form>
            </article>
          ))}
        </div>
      ) : (
        <p className="border-2 border-[#d94a1d] bg-[#fffaf1] p-5 text-[#7d4f3c] shadow-[0_1rem_3rem_rgba(140,49,16,0.1)]">
          No active events found.
        </p>
      )}
    </section>
  );
}
