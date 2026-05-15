import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3 text-slate-100">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white">
            TM
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-100">
            TradeMatch
          </span>
        </Link>
        <Link
          href="/jobs/new"
          className="btn-animated inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          + New request
        </Link>
      </div>
    </header>
  );
}
