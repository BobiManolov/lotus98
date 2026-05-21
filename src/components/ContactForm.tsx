"use client";

import { useState } from "react";
import { CONTACTS } from "@/content/site";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const subject = encodeURIComponent(`Запитване от сайта — ${name || "Клиент"}`);
    const body = encodeURIComponent(
      `Име: ${name}\nИмейл: ${email}\nТелефон: ${phone}\n\n${message}`,
    );
    window.location.href = `mailto:${CONTACTS.officeLozenets.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-card p-6 shadow-sm"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700">
          Име
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          placeholder="Вашето име"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none ring-accent/30 transition focus:border-accent focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
          Имейл
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Вашият имейл"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none ring-accent/30 transition focus:border-accent focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Вашият телефон"
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none ring-accent/30 transition focus:border-accent focus:ring-2"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700">
          Съобщение
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 outline-none ring-accent/30 transition focus:border-accent focus:ring-2"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-brand-800 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Изпрати
      </button>
      {status === "sent" ? (
        <p className="text-center text-sm text-muted">
          Отворихме имейл клиента ви. Ако не се отвори автоматично, пишете на{" "}
          <a className="text-accent underline" href={`mailto:${CONTACTS.officeLozenets.email}`}>
            {CONTACTS.officeLozenets.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
