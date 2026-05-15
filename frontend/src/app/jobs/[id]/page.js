"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import {
  deleteJob,
  fetchJobById,
  updateJobStatus,
} from "../../../lib/jobs";
import { formatDate } from "../../../lib/formatters";

const statuses = ["Open", "In Progress", "Closed"];

export default function JobDetailsPage({ params }) {
  const { id } = use(params);
  const [job, setJob] = useState(null);
  const [status, setStatus] = useState("Open");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    fetchJobById(id)
      .then((data) => {
        if (isMounted) {
          setJob(data);
          setStatus(data.status || "Open");
        }
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || "Failed to load job.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleStatusChange = async (event) => {
    const nextStatus = event.target.value;
    setStatus(nextStatus);
    setUpdating(true);

    try {
      const updated = await updateJobStatus(id, { status: nextStatus });
      setJob(updated);
    } catch (err) {
      setError(err?.message || "Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this job request?")) return;
    setUpdating(true);

    try {
      await deleteJob(id);
      router.push("/");
    } catch (err) {
      setError(err?.message || "Failed to delete job.");
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="h-56 rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <div className="h-4 w-32 animate-pulse rounded-full bg-slate-700" />
            <div className="mt-4 h-8 w-2/3 animate-pulse rounded-full bg-slate-700" />
            <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <div className="mx-auto w-full max-w-4xl px-6 py-12">
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-300">
            {error || "Job not found."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <Link href="/" className="text-sm font-semibold text-slate-400">
          Back to requests
        </Link>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm card-shadow">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 px-8 py-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span className="rounded-full bg-blue-500/15 px-3 py-1 text-blue-200">
                {job.category}
              </span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-emerald-200">
                {job.status}
              </span>
            </div>
            <Link
              href="/jobs/new"
              className="btn-animated rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200"
            >
              + New request
            </Link>
          </div>
          <div className="px-8 py-8">
            <h1 className="text-2xl font-semibold text-slate-100">
              {job.title}
            </h1>
            <div className="mt-4 grid gap-4 text-sm text-slate-400 md:grid-cols-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Location
                </div>
                <div className="mt-2 text-slate-200">{job.location}</div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Posted
                </div>
                <div className="mt-2 text-slate-200">
                  {formatDate(job.createdAt)}
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Client
                </div>
                <div className="mt-2 text-slate-200">{job.contactName}</div>
              </div>
            </div>
            <div className="mt-6 border-t border-slate-800 pt-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Request details
              </div>
              <p className="mt-3 text-sm text-slate-300">{job.description}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                Status
                <select
                  value={status}
                  onChange={handleStatusChange}
                  disabled={updating}
                  className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-semibold text-slate-100"
                >
                  {statuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={handleDelete}
                disabled={updating}
                className="btn-animated rounded-full border border-red-500/40 px-4 py-2 text-xs font-semibold text-red-200"
              >
                Delete request
              </button>
              {error ? (
                <span className="text-xs text-red-200">{error}</span>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
