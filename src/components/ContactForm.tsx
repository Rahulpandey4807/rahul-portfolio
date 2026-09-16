"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

type Errors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    // honeypot field — real users never fill this in
    company: "",
  });

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) next.email = "Please enter your email.";
    else if (!validateEmail(values.email))
      next.email = "Please enter a valid email address.";
    if (!values.subject.trim()) next.subject = "Please add a subject.";
    if (!values.message.trim()) next.message = "Please add a message.";
    else if (values.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (values.company) return; // honeypot triggered, silently ignore
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setValues({ name: "", email: "", subject: "", message: "", company: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-md border border-ink-600 bg-ink-900/60 px-4 py-3 text-ink-100 placeholder:text-ink-400 transition-colors focus:border-amber outline-none";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field, hidden from real users and screen readers */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(e) => setValues({ ...values, company: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm text-ink-300">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClasses}
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm text-ink-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClasses}
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm text-ink-300">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          required
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={inputClasses}
          value={values.subject}
          onChange={(e) => setValues({ ...values, subject: e.target.value })}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 text-sm text-red-400">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-ink-300">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`${inputClasses} resize-none`}
          value={values.message}
          onChange={(e) => setValues({ ...values, message: e.target.value })}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-amber px-6 py-3.5 text-sm font-medium text-ink-950 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          "Send message"
        )}
      </button>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-center gap-2 rounded-md bg-teal/10 px-4 py-3 text-sm text-teal"
          >
            <CheckCircle2 size={16} />
            Message sent successfully. Thank you for reaching out!
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="error"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-center gap-2 rounded-md bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            <AlertCircle size={16} />
            Unable to send your message. Please try again or contact me
            directly via email.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
