import Link from "next/link";

import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <section className="grid gap-8 py-16">
      <div className="grid max-w-3xl gap-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Simple event planning
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
          {APP_NAME}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-stone-700">
          {APP_DESCRIPTION} This foundation is ready for event data, voting, and
          admin tools in later tasks.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/create"
          className="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          Create an event
        </Link>
        <Link
          href="/event/example-id"
          className="rounded-md border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:border-stone-400 hover:bg-white"
        >
          View example event
        </Link>
      </div>
    </section>
  );
}
