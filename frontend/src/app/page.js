"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import FilterBar from "../components/FilterBar";
import JobCard from "../components/JobCard";
import { fetchJobs } from "../lib/jobs";

const categories = [
  "All",
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
];


export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");

  const params = useMemo(() => {
    const nextParams = {};
    if (category !== "All") nextParams.category = category;
    return nextParams;
  }, [category]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError("");

    fetchJobs(params)
      .then((data) => {
        if (isMounted) setJobs(data);
      })
      .catch((err) => {
        if (isMounted) {
          setError(err?.message || "Unable to load jobs.");
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [params]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />

      <section className="bg-slate-950 px-6 py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <FilterBar
            categories={categories}
            activeCategory={category}
            onCategoryChange={setCategory}
          />

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-52 rounded-2xl border border-slate-200 bg-white/70 p-6"
                >
                  <div className="h-4 w-24 animate-pulse rounded-full bg-slate-200" />
                  <div className="mt-4 h-6 w-3/4 animate-pulse rounded-full bg-slate-200" />
                  <div className="mt-3 h-4 w-full animate-pulse rounded-full bg-slate-200" />
                  <div className="mt-6 h-10 w-32 animate-pulse rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-6 py-5 text-sm text-red-200">
              {error}
            </div>
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-8 text-sm text-slate-300">
              No requests match this category yet. Try another category.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {jobs.map((job, index) => (
                <JobCard key={job._id} job={job} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
