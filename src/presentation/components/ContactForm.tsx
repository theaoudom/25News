'use client';

import { useState } from 'react';
import { siteConfig } from '@/shared/config/site';

/**
 * Lightweight contact form. With no backend mail service wired up, it composes
 * a pre-filled mailto so the message reaches our inbox. Swap the submit handler
 * for an API route (e.g. /api/contact) when a mail provider is configured.
 */
export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `From: ${name} <${email}>%0D%0A%0D%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
      subject || 'Contact form',
    )}&body=${body}`;
  }

  const field = 'w-full rounded-lg border border-[var(--border)] bg-[var(--bg-soft)] px-3 py-2 text-sm outline-none focus:border-brand-600';

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">Name</label>
          <input id="name" required value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
          <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium">Subject</label>
        <input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={field} />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">Message</label>
        <textarea id="message" required rows={6} value={message} onChange={(e) => setMessage(e.target.value)} className={field} />
      </div>
      <button
        type="submit"
        className="justify-self-start rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Send message
      </button>
    </form>
  );
}
