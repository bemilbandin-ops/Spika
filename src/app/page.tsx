import Link from "next/link";

type DemoPlace = {
  name: string;
  icon: "coffee" | "pizza" | "tree" | "bowling" | "burger";
  selected?: boolean;
};

const demoTimes = ["Fri 6 PM", "Fri 7 PM", "Fri 8 PM", "Sat 12 PM", "Sat 2 PM"];
const demoGuests = ["Alex", "Jamie", "Taylor", "Morgan", "Casey"];
const demoVotes = [
  [true, true, true, false, true],
  [false, true, true, false, true],
  [true, true, false, false, true],
  [false, true, true, true, false],
  [true, true, false, true, true]
];

const demoPlaces: DemoPlace[] = [
  { name: "The Daily Grind", icon: "coffee" },
  { name: "Tony's Pizza", icon: "pizza" },
  { name: "Riverside Park", icon: "tree", selected: true },
  { name: "City Lanes", icon: "bowling" },
  { name: "Northside Diner", icon: "burger" }
];

function PlaceIcon({ icon }: { icon: DemoPlace["icon"] }) {
  if (icon === "coffee") {
    return (
      <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 48 48">
        <path d="M13 19h20v9a9 9 0 0 1-9 9h-2a9 9 0 0 1-9-9z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M33 22h3a5 5 0 0 1 0 10h-3" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M17 10c-3 4 3 5 0 9M24 10c-3 4 3 5 0 9M31 10c-3 4 3 5 0 9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "pizza") {
    return (
      <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 48 48">
        <path d="M16 9c12 0 22 10 22 22L17 39z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M18 16c6 1 11 6 13 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        <circle cx="23" cy="24" r="2" fill="currentColor" />
        <circle cx="30" cy="31" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "tree") {
    return (
      <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 48 48">
        <path d="m24 7 12 17h-7l8 10H11l8-10h-7z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
        <path d="M24 34v7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
      </svg>
    );
  }

  if (icon === "bowling") {
    return (
      <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 48 48">
        <path d="M21 35c0-7 4-10 4-16 0-4-1-8-1-10 0-2 1-3 3-3s3 1 3 3c0 2-1 6-1 10 0 6 4 9 4 16z" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="35" cy="31" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="33" cy="28" r="1.3" fill="currentColor" />
        <circle cx="37" cy="28" r="1.3" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-11 w-11" viewBox="0 0 48 48">
      <path d="M12 24c1-9 7-14 12-14s11 5 12 14z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 28h24M14 34h20a3 3 0 0 1-3 3H17a3 3 0 0 1-3-3z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 17h.1M25 15h.1M30 18h.1" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-8 pt-36 sm:px-8 sm:pt-40 lg:px-12 lg:pt-32">
      <div className="orange-panel orange-glow absolute bottom-5 right-[-5rem] top-5 hidden w-[58vw] bg-[#d94a1d] lg:block" />

      <div className="relative z-10 grid min-h-[calc(100vh-10rem)] items-center gap-8 lg:grid-cols-[0.74fr_1.26fr]">
        <div className="max-w-[30rem]">
          <div className="mb-8 h-[2px] w-28 bg-[#d94a1d]" />
          <h1 className="text-[clamp(3.2rem,5.5vw,6.2rem)] font-extrabold leading-[1.04] tracking-[-0.055em] text-[#d94a1d]">
            Pick a time
            <br />
            and a place.
          </h1>
          <Link
            href="/create"
            className="sketch-button mt-10 inline-flex min-w-56 items-center justify-center rounded-md bg-[#d94a1d] px-7 py-3.5 text-lg font-bold text-white transition hover:bg-[#bd3d16]"
          >
            Plan My Group Date
          </Link>
        </div>

        <div className="relative w-full max-w-full justify-self-end overflow-x-auto pb-2 lg:w-[61vw] lg:overflow-visible lg:pb-0">
          <div className="orange-panel orange-glow absolute inset-[-2rem_-8rem_-6rem_4rem] -z-10 bg-[#d94a1d] lg:hidden" />
          <div className="min-w-[47rem] border-2 border-[#d94a1d] bg-[#fffaf1]/95 text-[#d94a1d] shadow-[0_1.4rem_4rem_rgba(140,49,16,0.16)]">
            <div className="grid grid-cols-[minmax(6.5rem,1.1fr)_repeat(5,minmax(5.8rem,1fr))] items-center gap-0 border-b border-[#e38d6e] px-6 py-7">
              <div className="text-xs font-extrabold uppercase tracking-tight">
                Best Times
              </div>
              {demoTimes.map((time, index) => (
                <div key={time} className="flex justify-center">
                  <span
                    className={[
                      "rounded-full border border-[#d94a1d] px-4 py-1.5 text-sm font-extrabold",
                      index === 1 ? "sketch-button bg-[#d94a1d] text-white" : "bg-[#fffaf1]"
                    ].join(" ")}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>

            <div className="divide-y divide-[#e9a68a]">
              {demoGuests.map((guest, rowIndex) => (
                <div
                  key={guest}
                  className="grid grid-cols-[minmax(6.5rem,1.1fr)_repeat(5,minmax(5.8rem,1fr))] items-center px-6 py-3.5"
                >
                  <div className="text-base font-extrabold">{guest}</div>
                  {demoVotes[rowIndex].map((hasVote, voteIndex) => (
                    <div key={`${guest}-${voteIndex}`} className="flex justify-center">
                      <span
                        className={[
                          "h-4 w-4 rounded-full border-2 border-[#d94a1d]",
                          hasVote ? "bg-[#d94a1d]" : "bg-transparent"
                        ].join(" ")}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-w-[47rem] grid-cols-[1.22fr_repeat(5,1fr)] border-x-2 border-b-2 border-[#d94a1d] bg-[#fffaf1] text-[#d94a1d]">
            <div className="flex items-center justify-center border-r border-[#e9a68a] px-4 text-sm font-extrabold uppercase">
              Pick a Place
            </div>
            {demoPlaces.map((place) => (
              <div
                key={place.name}
                className={[
                  "grid min-h-28 place-items-center border-r border-[#e9a68a] px-3 py-4 text-center last:border-r-0 [&_svg]:h-8 [&_svg]:w-8",
                  place.selected ? "sketch-button bg-[#d94a1d] text-white" : ""
                ].join(" ")}
              >
                <PlaceIcon icon={place.icon} />
                <p className="mt-2 text-sm font-extrabold leading-tight">
                  {place.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
