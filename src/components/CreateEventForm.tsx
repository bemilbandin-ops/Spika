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
      className="grid gap-5 rounded-md border border-stone-200 bg-white p-6 shadow-sm"
    >
      {state.error ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
          role="alert"
        >
          {state.error}
        </p>
      ) : null}

      <label className="grid gap-2 text-sm font-medium text-stone-800">
        Event title
        <input
          type="text"
          name="title"
          required
          maxLength={120}
          placeholder="Team planning dinner"
          className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
        />
      </label>

      <label className="grid gap-2 text-sm font-medium text-stone-800">
        Description
        <textarea
          name="description"
          rows={4}
          maxLength={500}
          placeholder="Add the details guests should know."
          className="resize-y rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-fit rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-stone-400"
      >
        {isPending ? "Creating..." : "Create event"}
      </button>
    </form>
  );
}
