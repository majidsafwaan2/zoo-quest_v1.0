'use client';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    org: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted! You can connect this to EmailJS or Formspree.');
  };

  return (
    <main className="px-6 py-16 max-w-4xl mx-auto text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>

      {/* Pitch */}
      <p className="text-lg mb-10 text-center">
        We're currently looking for mission-aligned NGOs and conservation groups to pilot this tool.
        Whether you work with endangered species, habitats, or environmental education — this platform
        is designed to emotionally engage your audience and drive real impact.
      </p>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          name="org"
          type="text"
          placeholder="Organization (optional)"
          value={form.org}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <textarea
          name="message"
          rows="4"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center mt-6 text-gray-500">
        Or email us directly at <a href="mailto:your@email.com" className="underline">your@email.com</a>
      </p>
    </main>
  );
}
