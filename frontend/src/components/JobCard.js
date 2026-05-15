import Link from "next/link";
import { formatDate } from "../lib/formatters";

const statusStyles = {
  Open: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
  "In Progress": "border-amber-500/40 bg-amber-500/10 text-amber-200",
  Closed: "border-slate-600/50 bg-slate-700/30 text-slate-200",
};

export default function JobCard({ job, index }) {
  return (
    <Link
      href={`/jobs/${job._id}`}
      className="group flex h-full flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-200">
          {job.category}
        </span>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            statusStyles[job.status] || statusStyles.Open
          }`}
        >
          {job.status}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-white">
          {job.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-400">
          {job.description}
        </p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-slate-400">
        <span className="rounded-full border border-slate-700 px-3 py-1">
          {job.location}
        </span>
        <span className="rounded-full border border-slate-700 px-3 py-1">
          {formatDate(job.createdAt)}
        </span>
        <span className="rounded-full border border-slate-700 px-3 py-1">
          {job.contactName}
        </span>
      </div>
    </Link>
  );
}
