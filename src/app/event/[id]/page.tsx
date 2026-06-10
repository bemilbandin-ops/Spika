type EventPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;

  return (
    <section className="grid max-w-2xl gap-5 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
        Event placeholder
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-stone-950">
        Event: {id}
      </h1>
      <p className="text-stone-700">
        Event data, date suggestions, and voting will be connected in a later
        task. This route currently renders without database environment
        variables.
      </p>
    </section>
  );
}
