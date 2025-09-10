'use client';

import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    clientName: "",
    contactEmail: "",
    programType: "",
    startDate: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">New Program Setup</h1>
        <p className="mb-6 text-gray-600 text-center">
          Welcome to the ITS New Program Request Form. Please fill out the details below to get started quickly and seamlessly.
        </p>
        {submitted ? (
          <div className="text-green-600 text-center font-semibold">Thank you! Your request has been submitted.</div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-black">Client Name</span>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring"
                placeholder="e.g. Acme Corp"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-black">Contact Email</span>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring"
                placeholder="e.g. contact@acme.com"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium text-black">Program Type</span>
              <select
                name="programType"
                value={form.programType}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring"
              >
                <option value="">Select type...</option>
                <option value="Standard">Standard</option>
                <option value="Custom">Custom</option>
                <option value="Pilot">Pilot</option>
              </select>
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">Start Date</span>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                required
                className="border rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="font-medium">Additional Notes</span>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="border rounded px-3 py-2 focus:outline-none focus:ring"
                placeholder="Any special requirements or comments?"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors mt-2"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
