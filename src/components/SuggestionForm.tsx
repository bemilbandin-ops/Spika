"use client";

import { useActionState } from "react";

import {
  addSuggestionAction,
  type EventFormState
} from "@/app/event/[id]/actions";

const initialState: EventFormState = {};

type SuggestionFormProps = {
  eventId: string;
};

export function SuggestionForm({ eventId }: SuggestionFormProps) {
  const [state, formAction, isPending] = useActionState(
    addSuggestionAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="grid gap-4 rounded-md border border-stone-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="eventId" value={eventId} />

      <div className="grid gap-1">
        <h2 className="text-xl font-semibold text-stone-950">
          Suggest another date
        </h2>
        <p className="text-sm text-stone-600">
          Add your name and the date you want the group to consider.
        </p>
      </div>

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
          name="suggestedBy"
          required
          maxLength={80}
          className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-stone-800">
          Date
          <input
            type="date"
            name="date"
            required
            className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-stone-800">
          Time optional
          <input
            type="time"
            name="time"
            className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isPending ? "Adding..." : "Add suggestion"}
      </button>
    </form>
  );
}
