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
    <section className="grid max-w-md gap-6 py-12">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-700">
          Admin
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-stone-950">
          Sign in
        </h1>
      </div>

      <form
        action={loginAction}
        className="grid gap-4 rounded-md border border-stone-200 bg-white p-5 shadow-sm"
      >
        <label className="grid gap-2 text-sm font-medium text-stone-800">
          Password
          <input
            autoComplete="current-password"
            className="rounded-md border border-stone-300 px-3 py-2 text-base text-stone-950 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
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
          className="rounded-md bg-stone-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-800"
          type="submit"
        >
          Log in
        </button>
      </form>
    </section>
  );
}
