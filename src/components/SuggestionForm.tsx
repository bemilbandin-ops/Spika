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
      className="grid gap-4 border-2 border-[#d94a1d] bg-[#fffaf1] p-4 shadow-[0_1rem_3rem_rgba(140,49,16,0.1)]"
    >
      <input type="hidden" name="eventId" value={eventId} />

      <div className="grid gap-1">
        <h2 className="text-xl font-extrabold tracking-[-0.035em] text-[#d94a1d]">
          Suggest another date
        </h2>
        <p className="text-sm text-[#7d4f3c]">
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

      <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#d94a1d]">
        Your name
        <input
          type="text"
          name="suggestedBy"
          required
          maxLength={80}
          className="focus-orange rounded-md border border-[#e9a68a] bg-white px-3 py-2.5 text-base normal-case tracking-normal text-[#2c160e]"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#d94a1d]">
          Date
          <input
            type="date"
            name="date"
            required
            className="focus-orange rounded-md border border-[#e9a68a] bg-white px-3 py-2.5 text-base normal-case tracking-normal text-[#2c160e]"
          />
        </label>

        <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#d94a1d]">
          Time optional
          <input
            type="time"
            name="time"
            className="focus-orange rounded-md border border-[#e9a68a] bg-white px-3 py-2.5 text-base normal-case tracking-normal text-[#2c160e]"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="sketch-button w-fit rounded-md bg-[#d94a1d] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#bd3d16] disabled:cursor-not-allowed disabled:bg-[#b98a78]"
      >
        {isPending ? "Adding..." : "Add suggestion"}
      </button>
    </form>
  );
}
