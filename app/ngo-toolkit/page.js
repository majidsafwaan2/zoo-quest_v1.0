'use client';
import { useState } from 'react';

export default function NGOToolkit() {
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
      <h1 className="text-4xl font-bold mb-6 text-center">NGO Toolkit</h1>

      <p className="text-lg text-center mb-10">
        This chatbot is designed for animal nonprofits, zoos, and conservation groups who want to emotionally engage their audience.
        Below are step-by-step instructions to embed it on your own website.
      </p>

      {/* Step-by-Step Instructions */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">How to Add It to Your Website</h2>

        <ol className="list-decimal space-y-4 pl-5 text-md text-gray-700">
          <li>
            <strong>Choose where you want it:</strong> You can embed the chatbot into an existing web page
            (like your donation or education page), or create a new one (e.g., <code>/chatbot</code>).
          </li>
          <li>
            <strong>Copy this code snippet:</strong> Paste it directly into your site’s HTML.
            <div className="relative mt-2">
              <pre
                className="bg-gray-100 rounded p-4 overflow-x-auto text-sm whitespace-pre-wrap"
                id="embed-code"
              >
{`<iframe 
  src="https://yourdomain.org/chat" 
  width="100%" 
  height="600" 
  style="border:none">
</iframe>`}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`<iframe 
  src="https://yourdomain.org/chat" 
  width="100%" 
  height="600" 
  style="border:none">
</iframe>`);
                  alert('Copied to clipboard!');
                }}
                className="absolute top-2 right-2 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Copy
              </button>
            </div>
          </li>
          <li>
            <strong>Publish your changes:</strong> Save and update your website. The chatbot should now appear and work instantly.
          </li>
        </ol>

        <p className="mt-6 text-sm text-gray-500">
          Note: This uses our hosted version. To self-host, customize, or contribute, view the GitHub repository below.
        </p>
      </section>

      {/* GitHub Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Self-Host or Customize</h2>
        <a
          href="https://github.com/your-github-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          View on GitHub
        </a>
      </section>

      {/* Questions Form */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Have Any Questions?</h2>
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
        <p className="text-sm text-center mt-6 text-gray-500">
          Or email us at <a href="mailto:your@email.com" className="underline">your@email.com</a>
        </p>
      </section>
    </main>
  );
}
