'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
        <div className="w-24 h-24 bg-teal text-paper rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-ink">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="font-fraunces text-4xl text-ink mb-4">Message sent!</h1>
        <p className="font-sans text-xl text-ink/80 mb-8">
          Thanks for reaching out. I'll get back to you within 24 hours (usually much sooner unless I have resin on my hands).
        </p>
        <button onClick={() => setSubmitted(false)} className="text-coral font-bold underline">Send another message</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="font-fraunces text-5xl md:text-6xl text-ink mb-6">Say Hello</h1>
        <p className="font-sans text-xl text-ink/80 max-w-2xl mx-auto">
          Got a question about an order? Want to request a custom piece? Just want to talk about resin? Drop a note below.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 max-w-4xl mx-auto">
        {/* Form */}
        <div className="flex-1 bg-paper p-8 rounded-[32px] border-2 border-ink shadow-[8px_8px_0px_#2B1B3D]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-sans font-bold text-ink mb-2">Name</label>
                <input required type="text" className="w-full bg-paper-deep border-2 border-ink rounded-xl px-4 py-3 font-sans focus:outline-none focus:ring-2 focus:ring-teal" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block font-sans font-bold text-ink mb-2">Email</label>
                <input required type="email" className="w-full bg-paper-deep border-2 border-ink rounded-xl px-4 py-3 font-sans focus:outline-none focus:ring-2 focus:ring-teal" placeholder="jane@example.com" />
              </div>
            </div>

            <div>
              <label className="block font-sans font-bold text-ink mb-2">Topic</label>
              <select required className="w-full bg-paper-deep border-2 border-ink rounded-xl px-4 py-3 font-sans focus:outline-none focus:ring-2 focus:ring-teal appearance-none">
                <option value="">Select a topic...</option>
                <option value="general">General Inquiry</option>
                <option value="order">Order Issue</option>
                <option value="custom">Custom Order Request</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-sans font-bold text-ink mb-2">Order Number <span className="text-ink/50 font-normal">(optional)</span></label>
              <input type="text" className="w-full bg-paper-deep border-2 border-ink rounded-xl px-4 py-3 font-sans focus:outline-none focus:ring-2 focus:ring-teal" placeholder="AN-2026-XXXXX" />
            </div>

            <div>
              <label className="block font-sans font-bold text-ink mb-2">Message</label>
              <textarea required className="w-full bg-paper-deep border-2 border-ink rounded-xl px-4 py-3 font-sans focus:outline-none focus:ring-2 focus:ring-teal h-32 resize-none" placeholder="Write your message here..."></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-coral text-paper py-4 rounded-xl font-bold text-lg border-2 border-ink shadow-[4px_4px_0px_#2B1B3D] hover:translate-y-1 hover:shadow-[2px_2px_0px_#2B1B3D] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            <p className="text-center font-sans text-sm text-ink/70">We usually reply within 24 hours.</p>
          </form>
        </div>

        {/* Info */}
        <div className="w-full md:w-72 shrink-0 space-y-8">
          <div>
            <h3 className="font-fraunces text-2xl text-ink mb-4">Direct Contact</h3>
            <div className="space-y-4 font-sans text-ink">
              <a href="mailto:hello@theartnook.com" className="flex items-center gap-3 hover:text-coral transition-colors">
                <span className="text-xl">✉️</span> hello@theartnook.com
              </a>
              <a href="https://wa.me/919876543210" className="flex items-center gap-3 hover:text-teal transition-colors">
                <span className="text-xl">💬</span> WhatsApp Us
              </a>
              <a href="https://instagram.com/theartnook" className="flex items-center gap-3 hover:text-orchid transition-colors">
                <span className="text-xl">📸</span> @theartnook
              </a>
            </div>
          </div>
          
          <div className="bg-paper-deep p-6 rounded-2xl border-2 border-ink border-dashed">
            <h3 className="font-fraunces text-lg text-ink mb-2">Studio Hours</h3>
            <p className="font-sans text-ink/80 text-sm mb-1">Mon - Fri: 10am - 6pm</p>
            <p className="font-sans text-ink/80 text-sm">Sat: 10am - 2pm</p>
            <p className="font-caveat text-xl text-coral mt-4">Closed on Sundays for drying!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
