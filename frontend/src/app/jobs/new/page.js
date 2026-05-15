"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/Header";
import { createJob } from "../../../lib/jobs";

const categories = ["Plumbing", "Electrical", "Painting", "Joinery"];

const initialState = {
  title: "",
  category: "Plumbing",
  location: "",
  description: "",
  contactName: "",
  contactEmail: "",
};

export default function NewJobPage() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      if (!formData.title || !formData.location || !formData.description) {
        setError("Please fill in all required fields.");
        setSubmitting(false);
        return;
      }
      if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
        setError("Please enter a valid email.");
        setSubmitting(false);
        return;
      }
      await createJob(formData);
      router.push("/");
    } catch (err) {
      setError(err?.message || "Failed to create job.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-10">
        <Link href="/" className="text-sm font-semibold text-slate-400">
          Back to jobs
        </Link>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-sm card-shadow">
          <div className="rounded-3xl rounded-b-none bg-gradient-to-r from-slate-900 via-blue-900 to-blue-600 px-8 py-6 text-white">
            <h1 className="text-2xl font-semibold">Create a new request</h1>
            <p className="mt-1 text-sm text-white/70">
              Describe the work and we will share it with local tradespeople.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 px-8 py-8 md:grid-cols-2"
          >
            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-300 md:col-span-2">
              Request title
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Leaking kitchen tap needs urgent repair"
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-normal text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-300">
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-normal text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-300">
              Location
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Glasgow, G12"
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-normal text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-300 md:col-span-2">
              Request details
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the work needed, any relevant details, preferred timing..."
                rows={5}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-normal text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-300">
              Your name
              <input
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="e.g. Margaret Dunlop"
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-normal text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none"
                required
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-300">
              Email
              <input
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="e.g. margaret@email.com"
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-normal text-slate-100 shadow-sm focus:border-blue-400 focus:outline-none"
                required
              />
            </label>

            {error ? (
              <div className="md:col-span-2 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <div className="md:col-span-2 flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="btn-animated rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Creating..." : "Create request"}
              </button>
              <Link href="/" className="text-sm font-semibold text-slate-400">
                Back to requests
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
