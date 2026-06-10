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
    <div className="grid gap-3 border-2 border-[#d94a1d] bg-[#fffaf1] p-4 shadow-[0_1rem_3rem_rgba(140,49,16,0.1)] sm:grid-cols-[1fr_auto] sm:items-end">
      <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.08em] text-[#d94a1d]">
        Share this private event link
        <input
          ref={inputRef}
          readOnly
          defaultValue={path}
          className="rounded-md border border-[#e9a68a] bg-white px-3 py-2.5 text-base normal-case tracking-normal text-[#2c160e]"
        />
      </label>
      <button
        type="button"
        onClick={copyShareUrl}
        className="w-fit rounded-full border border-[#d94a1d] px-5 py-2 text-sm font-bold text-[#d94a1d] transition hover:bg-[#d94a1d] hover:text-white"
      >
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
