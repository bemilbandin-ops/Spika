"use client";

import { useActionState } from "react";

import {
  searchEventAction,
  type SearchEventFormState
} from "@/app/search/actions";

const initialState: SearchEventFormState = {};

export function SearchEventForm() {
  const [state, formAction, isPending] = useActionState(
    searchEventAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="grid w-full gap-2 border-2 border-[#d94a1d] bg-[#fffaf1]/95 p-3 shadow-[0_1rem_3rem_rgba(140,49,16,0.1)] sm:grid-cols-[1fr_auto] sm:items-start"
    >
      <div className="grid gap-2">
        <label className="sr-only" htmlFor="eventSearch">
          Search events
        </label>
        <input
          id="eventSearch"
          name="eventSearch"
          type="search"
          placeholder="Enter event ID or URL"
          autoComplete="off"
          className="focus-orange rounded-md border border-[#e9a68a] bg-white px-3 py-2.5 text-base text-[#2c160e]"
        />
        {state.error ? (
          <p className="text-sm font-bold text-red-700" role="alert">
            {state.error}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="sketch-button rounded-md bg-[#d94a1d] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#bd3d16] disabled:cursor-not-allowed disabled:bg-[#b98a78]"
      >
        {isPending ? "Searching..." : "Find event"}
      </button>
    </form>
  );
}
