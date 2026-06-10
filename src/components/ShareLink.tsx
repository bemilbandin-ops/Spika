"use client";

import { useEffect, useRef, useState } from "react";

type ShareLinkProps = {
  path: string;
};

export function ShareLink({ path }: ShareLinkProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = new URL(path, window.location.origin).toString();
    }
  }, [path]);

  async function copyShareUrl() {
    const shareUrl = new URL(path, window.location.origin).toString();

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  }

  return (
    <div className="grid gap-3 rounded-md border border-stone-200 bg-white p-4 shadow-sm">
      <label className="grid gap-2 text-sm font-medium text-stone-800">
        Share this private event link
        <input
          ref={inputRef}
          readOnly
          defaultValue={path}
          className="rounded-md border border-stone-300 px-3 py-2 text-stone-900"
        />
      </label>
      <button
        type="button"
        onClick={copyShareUrl}
        className="w-fit rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:bg-stone-50"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
