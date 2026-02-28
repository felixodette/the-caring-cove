"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import siteContent from "@/content/site-content.json";

const defaultForm = {
  headline: "Request a Private Tour",
  subheadline: "Our boutique home has only 4 suites. Secure your priority viewing today.",
  cta: "Check Availability & Book Tour",
  successMessage: "Inquiry Sent. We will contact you within 2 hours.",
  errorMessage: "Something went wrong. Please call us directly.",
  interests: [
    "Alzheimer's / Dementia Care",
    "Palliative / End of Life",
    "Post-Op Rehabilitation",
    "Respite Stay (Short Term)",
    "Skilled Nursing / Complex Care",
    "General Inquiry",
  ],
  locations: [
    "Nairobi (Karen/Lavington)",
    "Other parts of Kenya",
    "Diaspora (Europe/UK/Americas)",
  ],
};

const content = (siteContent.contactPage as { form?: typeof defaultForm })?.form;
const formContent = content ?? defaultForm;

const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "/contact-handler.php";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setStep(1);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl border border-border max-w-xl mx-auto text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You</h3>
        <p className="text-muted-foreground mb-6">{formContent.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-primary font-semibold hover:underline"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-2xl shadow-2xl border border-border max-w-xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-foreground mb-2">
        {formContent.headline}
      </h3>
      <p className="text-muted-foreground mb-6 text-sm">
        {formContent.subheadline}
      </p>

      {/* Progress indicator */}
      <div className="flex gap-2 mb-8">
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= s ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="sender_name"
                    required
                    className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="sender_phone"
                    required
                    className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="sender_email"
                  required
                  className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                  placeholder="jane@example.com"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                  Primary Interest
                </label>
                <select
                  name="interest"
                  className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem",
                    paddingRight: "2.5rem",
                  }}
                >
                  {formContent.interests.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                  Where are you currently based?
                </label>
                <select
                  name="location_context"
                  className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.75rem center",
                    backgroundSize: "1.25rem",
                    paddingRight: "2.5rem",
                  }}
                >
                  {formContent.locations.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Diaspora leads receive WhatsApp-first follow-up for time zone
                  convenience.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-border py-4 rounded-xl font-bold text-foreground hover:bg-muted/30 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex-[2] flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    formContent.cta
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive font-semibold text-center p-3 bg-destructive/10 rounded-lg text-sm"
          >
            {formContent.errorMessage}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
