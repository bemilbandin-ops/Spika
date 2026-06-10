export default function CreateEventPage() {
  return (
    <section className="grid max-w-2xl gap-8 py-12">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Placeholder
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-stone-950">
          Create an event
        </h1>
        <p className="text-stone-700">
          This form shell is not connected to a database yet. Event persistence
          arrives in a later task.
        </p>
      </div>

      <form className="grid gap-5 rounded-md border border-stone-200 bg-white p-6 shadow-sm">
        <label className="grid gap-2 text-sm font-medium text-stone-800">
          Event title
          <input
            type="text"
            name="title"
            placeholder="Team planning dinner"
            className="rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-stone-800">
          Description
          <textarea
            name="description"
            rows={4}
            placeholder="Add the details guests should know."
            className="resize-none rounded-md border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-blue-500"
          />
        </label>
        <button
          type="button"
          className="w-fit rounded-md bg-stone-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Save placeholder
        </button>
      </form>
    </section>
  );
}
