'use client';

import { useState } from "react";

export default function Home() {
  const programTypes = {
    "1 Registrations": 1,
    "2 Appointments": 2,
    "4 Certifications": 4,
    "8 Consumer": 8,
    "16 Events": 16,
    "32 Item Workshop": 32,
    "64 Session/Cohort": 64,
    "128 Shopping Cart": 128,
    "256 ReprocessAfterMerge": 256,
    "512 Syllabus/Continuous Learning": 512,
    "1024 Remote Proctoring/BYOP": 1024,
    "2048 Adaptive": 2048
  }


  const [form, setForm] = useState({
    clientName: "",
    contactEmail: "",
    programType: "",
    startDate: "",
    notes: "",
  });
  const [selectedPrograms, setSelectedPrograms] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleProgramCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (e.target.checked) {
      setSelectedPrograms((prev) => [...prev, value]);
    } else {
      setSelectedPrograms((prev) => prev.filter((v) => v !== value));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // Prepare JSON data
    const data = {
      ...form,
      selectedPrograms,
      selectedProgramsSum: selectedPrograms.reduce((a, b) => a + b, 0)
    };
    const json = JSON.stringify(data, null, 2);
    // Trigger download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `program-request-${form.clientName || 'client'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              <div className="border border-2 flex flex-col items-start">
                {Object.entries(programTypes).map(([name, value]) => (
                  <label key={name} className="flex items-center gap-2 py-1">
                    <input
                      type="checkbox"
                      value={value}
                      checked={selectedPrograms.includes(value)}
                      onChange={handleProgramCheckbox}
                    />
                    <span>{name}</span>
                  </label>
                ))}
                <div className="mt-2 text-sm text-gray-700 font-semibold">Sum: {selectedPrograms.reduce((a, b) => a + b, 0)}</div>
              </div>
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
