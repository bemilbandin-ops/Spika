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

function getCreatorSuggestion(
  suggestions: NonNullable<Awaited<ReturnType<typeof getEventById>>>["suggestions"]
) {
  return suggestions.reduce<(typeof suggestions)[number] | null>(
    (earliest, suggestion) => {
      if (!earliest) {
        return suggestion;
      }

      return suggestion.created_at.getTime() < earliest.created_at.getTime()
        ? suggestion
        : earliest;
    },
    null
  );
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

  const creatorSuggestion = getCreatorSuggestion(event.suggestions);
  const creatorSuggestionTime = creatorSuggestion
    ? formatTime(creatorSuggestion.time)
    : null;

  return (
    <section className="mx-auto grid max-w-4xl gap-6 px-5 pb-12 pt-36 sm:px-8 sm:pt-40 lg:pt-32">
      <div className="grid gap-4">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d94a1d]">
          Private event
        </p>
        <h1 className="text-4xl font-extrabold tracking-[-0.045em] text-[#d94a1d]">
          {event.title}
        </h1>
        {event.description ? (
          <p className="max-w-2xl whitespace-pre-wrap text-base leading-7 text-[#7d4f3c]">
            {event.description}
          </p>
        ) : null}
        {creatorSuggestion ? (
          <p className="rounded-md border border-[#e9a68a] bg-[#fff2df] px-4 py-3 text-sm font-bold text-[#9c3f1d]">
            Creator suggestion from {creatorSuggestion.suggested_by}:{" "}
            {formatDate(creatorSuggestion.date)}
            {creatorSuggestionTime ? ` at ${creatorSuggestionTime}` : ""}
          </p>
        ) : null}
      </div>

      <ShareLink path={`/event/${event.id}`} />

      <p className="rounded-md border border-[#e9a68a] bg-[#fff2df] px-4 py-3 text-sm font-medium text-[#9c3f1d]">
        Privacy note: anyone with this link can view the event details, names,
        date suggestions, and votes.
      </p>

      <div className="grid gap-4">
        <h2 className="text-2xl font-extrabold tracking-[-0.04em] text-[#d94a1d]">
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
                  className="grid gap-4 border-2 border-[#d94a1d] bg-[#fffaf1] p-4 shadow-[0_1rem_3rem_rgba(140,49,16,0.1)]"
                >
                  <div className="grid gap-2">
                    <div>
                      <h3 className="text-xl font-extrabold tracking-[-0.035em] text-[#d94a1d]">
                        {formatDate(suggestion.date)}
                      </h3>
                      {time ? (
                        <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#9a6851]">
                          {time}
                        </p>
                      ) : null}
                    </div>
                    <p className="text-sm text-[#7d4f3c]">
                      Suggested by {suggestion.suggested_by}
                    </p>
                  </div>

                  <dl className="grid grid-cols-3 gap-0 overflow-hidden rounded-md border border-[#e9a68a] text-center">
                    <div className="bg-white px-3 py-2">
                      <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#d94a1d]">
                        Yes
                      </dt>
                      <dd className="text-xl font-extrabold text-[#d94a1d]">
                        {counts.yes}
                      </dd>
                    </div>
                    <div className="border-x border-[#e9a68a] bg-white px-3 py-2">
                      <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#d94a1d]">
                        Maybe
                      </dt>
                      <dd className="text-xl font-extrabold text-[#d94a1d]">
                        {counts.maybe}
                      </dd>
                    </div>
                    <div className="bg-white px-3 py-2">
                      <dt className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#d94a1d]">
                        No
                      </dt>
                      <dd className="text-xl font-extrabold text-[#d94a1d]">
                        {counts.no}
                      </dd>
                    </div>
                  </dl>

                  {suggestion.votes.length ? (
                    <div className="grid gap-2 text-sm text-[#7d4f3c]">
                      <h4 className="font-extrabold uppercase tracking-[0.1em] text-[#d94a1d]">
                        Votes
                      </h4>
                      <ul className="grid gap-1">
                        {suggestion.votes.map((vote) => (
                          <li key={vote.id}>
                            {vote.voter_name}: {voteLabels[vote.choice]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-sm text-[#7d4f3c]">No votes yet.</p>
                  )}

                  <VoteForm eventId={event.id} suggestionId={suggestion.id} />
                </article>
              );
            })}
          </div>
        ) : (
          <p className="border-2 border-[#d94a1d] bg-[#fffaf1] p-5 text-[#7d4f3c] shadow-[0_1rem_3rem_rgba(140,49,16,0.1)]">
            No date suggestions yet. Add the first option below.
          </p>
        )}
      </div>

      <SuggestionForm eventId={event.id} />
    </section>
  );
}
