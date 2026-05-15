import Link from "next/link";
import StatPill from "./StatPill";

export default function Hero() {
  return (
    <section className="bg-hero bg-grid text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20">
        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/90">
          Homeowner service requests
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-semibold leading-tight text-white drop-shadow-sm md:text-5xl">
              Post a service request
              <span className="block text-sky-200">and keep jobs on track.</span>
            </h1>
            <p className="max-w-xl text-base text-white/85 md:text-lg">
              Browse open requests, view job details, and update the status when
              work starts or finishes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/jobs/new"
                className="btn-animated rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
              >
                Create a request
              </Link>
              <Link
                href="#jobs"
                className="btn-animated rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/90"
              >
                View requests
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Live overview
            </div>
            <div className="flex flex-col gap-4">
              <StatPill label="Open jobs" value="54" />
              <StatPill label="Trades categories" value="8" />
              <StatPill label="Same-day responses" value="92%" />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-xs text-white/70">
              Update statuses in one click and keep homeowners informed.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
