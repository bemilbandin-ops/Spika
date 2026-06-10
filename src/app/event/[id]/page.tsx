import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ShareLink } from "@/components/ShareLink";
import { SuggestionForm } from "@/components/SuggestionForm";
import { VoteForm } from "@/components/VoteForm";
import { getEventById } from "@/lib/data/events";
import type { VoteChoice } from "@/lib/types";
import { getVoteCounts } from "@/lib/utils";
import { validateUuid } from "@/lib/validation";

type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const voteLabels: Record<VoteChoice, string> = {
  yes: "Yes",
  maybe: "Maybe",
  no: "No"
};

export const metadata: Metadata = {
  title: "Group Date Planner event",
  description: "View and vote on a private Group Date Planner event."
};

function formatDate(date: string): string {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeZone: "UTC"
  }).format(parsedDate);
}

function formatTime(time: string | null): string | null {
  return time ? time.slice(0, 5) : null;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const idValidation = validateUuid(id, "Event ID");

  if (!idValidation.ok) {
    notFound();
  }

  const event = await getEventById(idValidation.value);

  if (!event) {
    notFound();
  }

  return (
    <section className="grid max-w-3xl gap-8 py-12">
      <div className="grid gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Private event
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-stone-950">
          {event.title}
        </h1>
        {event.description ? (
          <p className="whitespace-pre-wrap text-stone-700">
            {event.description}
          </p>
        ) : null}
      </div>

      <ShareLink path={`/event/${event.id}`} />

      <p className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Privacy note: anyone with this link can view the event details, names,
        date suggestions, and votes.
      </p>

      <div className="grid gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
          Date suggestions
        </h2>

        {event.suggestions.length ? (
          <div className="grid gap-4">
            {event.suggestions.map((suggestion) => {
              const counts = getVoteCounts(suggestion.votes);
              const time = formatTime(suggestion.time);

              return (
                <article
                  key={suggestion.id}
                  className="grid gap-5 rounded-md border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <div className="grid gap-2">
                    <div>
                      <h3 className="text-xl font-semibold text-stone-950">
                        {formatDate(suggestion.date)}
                      </h3>
                      {time ? (
                        <p className="text-sm text-stone-600">{time}</p>
                      ) : null}
                    </div>
                    <p className="text-sm text-stone-600">
                      Suggested by {suggestion.suggested_by}
                    </p>
                  </div>

                  <dl className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-md bg-green-50 px-3 py-2">
                      <dt className="text-xs font-semibold uppercase text-green-800">
                        Yes
                      </dt>
                      <dd className="text-lg font-bold text-green-900">
                        {counts.yes}
                      </dd>
                    </div>
                    <div className="rounded-md bg-blue-50 px-3 py-2">
                      <dt className="text-xs font-semibold uppercase text-blue-800">
                        Maybe
                      </dt>
                      <dd className="text-lg font-bold text-blue-900">
                        {counts.maybe}
                      </dd>
                    </div>
                    <div className="rounded-md bg-red-50 px-3 py-2">
                      <dt className="text-xs font-semibold uppercase text-red-800">
                        No
                      </dt>
                      <dd className="text-lg font-bold text-red-900">
                        {counts.no}
                      </dd>
                    </div>
                  </dl>

                  {suggestion.votes.length ? (
                    <div className="grid gap-2 text-sm text-stone-700">
                      <h4 className="font-semibold text-stone-900">Votes</h4>
                      <ul className="grid gap-1">
                        {suggestion.votes.map((vote) => (
                          <li key={vote.id}>
                            {vote.voter_name}: {voteLabels[vote.choice]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-stone-600">No votes yet.</p>
                  )}

                  <VoteForm eventId={event.id} suggestionId={suggestion.id} />
                </article>
              );
            })}
          </div>
        ) : (
          <p className="rounded-md border border-stone-200 bg-white p-5 text-stone-700 shadow-sm">
            No date suggestions yet. Add the first option below.
          </p>
        )}
      </div>

      <SuggestionForm eventId={event.id} />
    </section>
  );
}
