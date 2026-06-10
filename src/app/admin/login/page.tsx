import { redirect } from "next/navigation";

import { hasValidAdminSession } from "@/lib/adminAuth";
import { loginAction } from "./actions";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams
}: AdminLoginPageProps) {
  if (await hasValidAdminSession()) {
    redirect("/admin");
  }

  const params = searchParams ? await searchParams : undefined;
  const hasError = params?.error === "invalid";

  return (
    <section className="mx-auto grid min-h-screen max-w-md content-start gap-6 px-5 pb-12 pt-36 sm:px-8 sm:pt-40 lg:pt-32">
      <div className="grid gap-3">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#d94a1d]">
          Admin
        </p>
        <h1 className="text-4xl font-extrabold tracking-[-0.045em] text-[#d94a1d]">
          Sign in
        </h1>
      </div>

      <form
        action={loginAction}
        className="grid gap-4 border-2 border-[#d94a1d] bg-[#fffaf1] p-5 shadow-[0_1rem_3rem_rgba(140,49,16,0.1)]"
      >
        <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#d94a1d]">
          Password
          <input
            autoComplete="current-password"
            className="focus-orange rounded-md border border-[#e9a68a] bg-white px-3 py-3 text-base normal-case tracking-normal text-[#2c160e]"
            name="password"
            required
            type="password"
          />
        </label>

        {hasError ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
            Invalid password.
          </p>
        ) : null}

        <button
          className="sketch-button rounded-md bg-[#d94a1d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#bd3d16]"
          type="submit"
        >
          Log in
        </button>
      </form>
    </section>
  );
}
