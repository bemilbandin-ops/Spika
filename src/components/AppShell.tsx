import Link from "next/link";
import type { ReactNode } from "react";

import { APP_NAME } from "@/lib/constants";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-stone-200 bg-white/70">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="text-lg font-bold text-stone-950">
            {APP_NAME}
          </Link>
          <nav aria-label="Primary navigation" className="flex items-center gap-4 text-sm font-medium text-stone-700">
            <Link className="transition hover:text-stone-950" href="/create">
              Create
            </Link>
            <Link className="transition hover:text-stone-950" href="/admin">
              Admin
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl px-5">{children}</main>
    </div>
  );
}
