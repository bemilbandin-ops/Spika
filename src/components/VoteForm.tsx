"use client";

import { useActionState } from "react";

import {
  submitVoteAction,
  type EventFormState
} from "@/app/event/[id]/actions";

const initialState: EventFormState = {};

type VoteFormProps = {
  eventId: string;
  suggestionId: string;
};

export function VoteForm({ eventId, suggestionId }: VoteFormProps) {
  const [state, formAction, isPending] = useActionState(
    submitVoteAction,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-3">
      <input type="hidden" name="eventId" value={eventId} />
      <input type="hidden" name="suggestionId" value={suggestionId} />

      {state.error ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <label className="grid gap-2 text-sm font-medium text-stone-800">
        Your name
        <input
          type="text"
          name="voterName"
          required
          maxLength={80}
          className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
        />
      </label>

      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium text-stone-800">
          Your vote
        </legend>
        <div className="flex flex-wrap gap-3">
          {(["yes", "maybe", "no"] as const).map((choice) => (
            <label
              key={choice}
              className="flex items-center gap-2 rounded-md border border-stone-300 bg-white px-3 py-2 text-sm font-medium capitalize text-stone-800"
            >
              <input type="radio" name="choice" value={choice} required />
              {choice}
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isPending ? "Saving..." : "Save vote"}
      </button>
    </form>
  );
}
