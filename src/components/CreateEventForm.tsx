"use client";

import { useActionState } from "react";

import {
  createEventAction,
  type CreateEventFormState
} from "@/app/create/actions";

const initialState: CreateEventFormState = {};

export function CreateEventForm() {
  const [state, formAction, isPending] = useActionState(
    createEventAction,
    initialState
  );

  return (
    <form
      action={formAction}
      className="grid gap-4 border-2 border-[#d94a1d] bg-[#fffaf1] p-5 shadow-[0_1.4rem_4rem_rgba(140,49,16,0.12)]"
    >
      {state.error ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#d94a1d]">
        Event title
        <input
          type="text"
          name="title"
          required
          maxLength={120}
          placeholder="Team planning dinner"
          className="focus-orange rounded-md border border-[#e9a68a] bg-white px-3 py-2.5 text-base normal-case tracking-normal text-[#2c160e]"
        />
      </label>

      <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#d94a1d]">
        Description
        <textarea
          name="description"
          rows={4}
          maxLength={500}
          placeholder="Add the details guests should know."
          className="focus-orange resize-y rounded-md border border-[#e9a68a] bg-white px-3 py-2.5 text-base normal-case tracking-normal text-[#2c160e]"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="sketch-button w-fit rounded-md bg-[#d94a1d] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#bd3d16] disabled:cursor-not-allowed disabled:bg-[#b98a78]"
      >
        {isPending ? "Creating..." : "Create event"}
      </button>
    </form>
  );
}
