import Link from "next/link";
import type { ReactNode } from "react";

import { APP_NAME } from "@/lib/constants";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="flex w-full flex-wrap items-start justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12 lg:py-7">
          <Link href="/" className="brand-mark" aria-label={APP_NAME}>
            <span>Group</span>
            <span>Date</span>
            <span>Planner</span>
          </Link>
          <nav
            aria-label="Primary navigation"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#d94a1d]"
          >
            <Link
              className="rounded-full border border-[#d94a1d]/40 bg-[#fffaf1]/80 px-3 py-1.5 transition hover:bg-[#d94a1d] hover:text-white"
              href="/create"
            >
              Create
            </Link>
            <Link
              className="rounded-full border border-[#d94a1d]/40 bg-[#fffaf1]/80 px-3 py-1.5 transition hover:bg-[#d94a1d] hover:text-white"
              href="/admin"
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
