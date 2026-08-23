"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader2, Phone, MessageCircle } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_FORM_DISABLED,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP,
} from "@/lib/constants";
import {
  CHANNELS,
  CONTACT_CONTRACT_VERSION,
  type ContactField,
  type FieldErrors,
  INTERESTS,
  LOCATIONS,
  PRIVACY_NOTICE_VERSION,
  RELATIONSHIPS,
  TOUR_WINDOWS,
  URGENCIES,
  createRequestId,
  validateInquiry,
} from "@/lib/contact/contract";
import siteContent from "@/content/site-content.json";

const defaultCopy = {
  headline: "Request a Private Tour",
  subheadline: "Four suites. We will tell you honestly if we are a fit.",
  cta: "Send tour request",
  successMessage:
    "We have your request. A team member will contact you within 2 hours during business hours.",
  errorMessage: "Something went wrong. Please call or WhatsApp us directly.",
};

const content = (siteContent.contactPage as { form?: typeof defaultCopy })?.form;
const formContent = { ...defaultCopy, ...content };

const CONTACT_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || `/${["contact", "handler.php"].join("-")}`;
const SUBMIT_TIMEOUT_MS = 15000;

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base";

const selectChevronStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 0.75rem center",
  backgroundSize: "1.25rem",
  paddingRight: "2.5rem",
};

function stepForField(field: ContactField): number {
  if (field === "relationship" || field === "urgency" || field === "interest") return 1;
  if (
    field === "sender_name" ||
    field === "sender_phone" ||
    field === "sender_email" ||
    field === "preferred_channel" ||
    field === "location_context"
  ) {
    return 2;
  }
  return 3;
}

async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
  const ct = response.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) return fallback;
  try {
    const data = (await response.json()) as { message?: unknown };
    if (typeof data.message === "string" && data.message.trim() && data.message !== "Success") {
      return data.message.trim();
    }
  } catch {
    /* ignore */
  }
  return fallback;
}

function WhatsAppLink({
  text,
  className,
  children,
}: {
  text: string;
  className?: string;
  children: ReactNode;
}) {
  const href = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(text)}`;
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function ContactForm() {
  const baseId = useId();
  const ids = {
    name: `${baseId}-name`,
    phone: `${baseId}-phone`,
    email: `${baseId}-email`,
    interest: `${baseId}-interest`,
    location: `${baseId}-location`,
    relationship: `${baseId}-relationship`,
    urgency: `${baseId}-urgency`,
    channel: `${baseId}-channel`,
    tour: `${baseId}-tour`,
    resident: `${baseId}-resident`,
    consent: `${baseId}-consent`,
    website: `${baseId}-website`,
  };

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [requestId, setRequestId] = useState("");

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [interest, setInterest] = useState<(typeof INTERESTS)[number]>("Prefer not to say");
  const [locationContext, setLocationContext] = useState<(typeof LOCATIONS)[number]>(LOCATIONS[0]);
  const [relationship, setRelationship] = useState("");
  const [urgency, setUrgency] = useState("");
  const [preferredChannel, setPreferredChannel] = useState<(typeof CHANNELS)[number]>("WhatsApp");
  const [tourWindow, setTourWindow] = useState<(typeof TOUR_WINDOWS)[number]>("Call me to arrange");
  const [residentFirstName, setResidentFirstName] = useState("");
  const [consent, setConsent] = useState(false);

  const inquiryDraft = useMemo(
    () => ({
      sender_name: senderName,
      sender_email: senderEmail,
      sender_phone: senderPhone,
      interest,
      location_context: locationContext,
      relationship,
      urgency,
      preferred_channel: preferredChannel,
      tour_window: tourWindow,
      resident_first_name: residentFirstName,
      consent,
      policy_version: PRIVACY_NOTICE_VERSION,
      request_id: requestId || "tcc_inq_00000000000000000000000000",
    }),
    [
      senderName,
      senderEmail,
      senderPhone,
      interest,
      locationContext,
      relationship,
      urgency,
      preferredChannel,
      tourWindow,
      residentFirstName,
      consent,
      requestId,
    ],
  );

  const clearForm = () => {
    setStep(1);
    setSubmitError(null);
    setFieldErrors({});
    setSenderName("");
    setSenderEmail("");
    setSenderPhone("");
    setInterest("Prefer not to say");
    setLocationContext(LOCATIONS[0]);
    setRelationship("");
    setUrgency("");
    setPreferredChannel("WhatsApp");
    setTourWindow("Call me to arrange");
    setResidentFirstName("");
    setConsent(false);
    setRequestId("");
  };

  const showFieldError = (errorId: string, key: ContactField) => {
    const message = fieldErrors[key];
    if (!message) return null;
    return (
      <p id={errorId} className="text-destructive text-xs mt-1.5 font-medium" role="alert">
        {message}
      </p>
    );
  };

  const applyErrors = (errors: FieldErrors) => {
    setFieldErrors(errors);
    const first = (Object.keys(errors) as ContactField[])[0];
    if (first) setStep(stepForField(first));
  };

  const goNext = (from: number) => {
    setSubmitError(null);
    const result = validateInquiry(inquiryDraft);
    const blocking = Object.fromEntries(
      Object.entries(result.errors).filter(([key]) => stepForField(key as ContactField) <= from),
    ) as FieldErrors;
    if (Object.keys(blocking).length > 0) {
      applyErrors(blocking);
      return;
    }
    setFieldErrors({});
    setStatus("idle");
    setStep(from + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitError(null);

    const activeRequestId = requestId || createRequestId();
    setRequestId(activeRequestId);

    const result = validateInquiry({ ...inquiryDraft, request_id: activeRequestId, consent });
    if (!result.ok || !result.value) {
      applyErrors(result.errors);
      setStatus("error");
      setSubmitError("Please check the highlighted fields and try again.");
      return;
    }

    const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    const body = new FormData();
    for (const [key, value] of Object.entries(result.value)) {
      body.append(key, String(value));
    }
    body.append("website", honeypot);
    body.append("contract_version", CONTACT_CONTRACT_VERSION);

    setStatus("submitting");
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body,
        signal: controller.signal,
      });

      if (response.ok) {
        const data = (await response.json().catch(() => null)) as { request_id?: string } | null;
        form.reset();
        clearForm();
        setRequestId(data?.request_id || activeRequestId);
        setStatus("success");
        return;
      }

      const message = await parseErrorMessage(response, formContent.errorMessage);
      setSubmitError(message);
      setStatus("error");
    } catch {
      setSubmitError(formContent.errorMessage);
      setStatus("error");
    } finally {
      window.clearTimeout(timer);
    }
  };

  const describedBy = (errorId: string, key: ContactField) =>
    fieldErrors[key] ? errorId : undefined;

  if (CONTACT_FORM_DISABLED) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-border max-w-xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Talk with us about a private tour
        </h3>
        <p className="text-muted-foreground mb-6 text-sm">
          The online form is off while we finish privacy and delivery checks. Phone and WhatsApp
          still reach the same intake desk. We respond within 2 hours during business hours.
        </p>
        <div className="grid gap-3">
          <a
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all"
            href={`tel:${CONTACT_PHONE_TEL}`}
          >
            <Phone className="w-5 h-5" aria-hidden />
            Call {CONTACT_PHONE_DISPLAY}
          </a>
          <WhatsAppLink
            text="Hello The Caring Cove, I would like to arrange a private tour."
            className="flex items-center justify-center gap-2 border-2 border-border py-4 rounded-xl font-bold text-foreground hover:bg-muted/30 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-green-600" aria-hidden />
            WhatsApp the intake desk
          </WhatsAppLink>
          <a
            className="text-primary font-semibold text-center hover:underline text-sm"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            Email {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-2xl border border-border max-w-xl mx-auto"
      >
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Request received</h3>
        <p className="text-muted-foreground mb-4 text-center">{formContent.successMessage}</p>
        {requestId ? (
          <p className="text-xs text-center text-muted-foreground mb-6">
            Reference <span className="font-mono text-foreground">{requestId}</span>
          </p>
        ) : null}
        <ol className="text-sm text-foreground space-y-2 mb-6 list-decimal list-inside">
          <li>We contact you on the channel you chose.</li>
          <li>We book a private tour of the Karen home.</li>
          <li>If it may be a fit, we plan an assessment. If not, we say so.</li>
        </ol>
        <div className="grid gap-3">
          <a
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all"
            href={`tel:${CONTACT_PHONE_TEL}`}
          >
            <Phone className="w-5 h-5" aria-hidden />
            Call now if this is urgent
          </a>
          <WhatsAppLink
            text={`Hello The Caring Cove, I just sent a tour request${requestId ? ` (${requestId})` : ""}. Please follow up on WhatsApp.`}
            className="flex items-center justify-center gap-2 border-2 border-border py-4 rounded-xl font-bold text-foreground hover:bg-muted/30 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-green-600" aria-hidden />
            Continue on WhatsApp
          </WhatsAppLink>
        </div>
        <button
          type="button"
          onClick={() => {
            clearForm();
            setStatus("idle");
          }}
          className="mt-6 w-full text-primary font-semibold hover:underline text-sm"
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
      <h3 className="text-2xl font-bold text-foreground mb-2">{formContent.headline}</h3>
      <p className="text-muted-foreground mb-6 text-sm">{formContent.subheadline}</p>

      <div className="flex gap-2 mb-2" role="group" aria-label="Tour request form progress">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${step >= s ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Step {step} of 3
      </p>

      <form onSubmit={handleSubmit} className="relative space-y-5" noValidate>
        <div className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden" aria-hidden>
          <label htmlFor={ids.website}>Website</label>
          <input type="text" id={ids.website} name="website" tabIndex={-1} autoComplete="off" />
        </div>

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
              <div>
                <label
                  htmlFor={ids.relationship}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Who is this inquiry for?
                </label>
                <select
                  id={ids.relationship}
                  name="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.relationship)}
                  aria-describedby={describedBy(`${ids.relationship}-error`, "relationship")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={selectChevronStyle}
                >
                  <option value="">Select relationship</option>
                  {RELATIONSHIPS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {showFieldError(`${ids.relationship}-error`, "relationship")}
              </div>
              <div>
                <label
                  htmlFor={ids.urgency}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  How soon is care needed?
                </label>
                <select
                  id={ids.urgency}
                  name="urgency"
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.urgency)}
                  aria-describedby={describedBy(`${ids.urgency}-error`, "urgency")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={selectChevronStyle}
                >
                  <option value="">Select timing</option>
                  {URGENCIES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {showFieldError(`${ids.urgency}-error`, "urgency")}
              </div>
              <div>
                <label
                  htmlFor={ids.interest}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Care need
                </label>
                <select
                  id={ids.interest}
                  name="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value as (typeof INTERESTS)[number])}
                  aria-invalid={Boolean(fieldErrors.interest)}
                  aria-describedby={describedBy(`${ids.interest}-error`, "interest")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={selectChevronStyle}
                >
                  {INTERESTS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  High-level only. Do not include diagnoses in this form.
                </p>
                {showFieldError(`${ids.interest}-error`, "interest")}
              </div>
              <button
                type="button"
                onClick={() => goNext(1)}
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : step === 2 ? (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor={ids.name}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Your name
                </label>
                <input
                  id={ids.name}
                  type="text"
                  name="sender_name"
                  autoComplete="name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.sender_name)}
                  aria-describedby={describedBy(`${ids.name}-error`, "sender_name")}
                  className={inputClass}
                  placeholder="Jane Doe"
                />
                {showFieldError(`${ids.name}-error`, "sender_name")}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={ids.phone}
                    className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                  >
                    Phone / WhatsApp
                  </label>
                  <input
                    id={ids.phone}
                    type="tel"
                    name="sender_phone"
                    autoComplete="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.sender_phone)}
                    aria-describedby={describedBy(`${ids.phone}-error`, "sender_phone")}
                    className={inputClass}
                    placeholder="+254 7XX XXX XXX"
                  />
                  {showFieldError(`${ids.phone}-error`, "sender_phone")}
                </div>
                <div>
                  <label
                    htmlFor={ids.email}
                    className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    id={ids.email}
                    type="email"
                    name="sender_email"
                    autoComplete="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    aria-invalid={Boolean(fieldErrors.sender_email)}
                    aria-describedby={describedBy(`${ids.email}-error`, "sender_email")}
                    className={inputClass}
                    placeholder="jane@example.com"
                  />
                  {showFieldError(`${ids.email}-error`, "sender_email")}
                </div>
              </div>
              <div>
                <label
                  htmlFor={ids.channel}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Preferred contact channel
                </label>
                <select
                  id={ids.channel}
                  name="preferred_channel"
                  value={preferredChannel}
                  onChange={(e) => setPreferredChannel(e.target.value as (typeof CHANNELS)[number])}
                  aria-invalid={Boolean(fieldErrors.preferred_channel)}
                  aria-describedby={describedBy(`${ids.channel}-error`, "preferred_channel")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={selectChevronStyle}
                >
                  {CHANNELS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {showFieldError(`${ids.channel}-error`, "preferred_channel")}
              </div>
              <div>
                <label
                  htmlFor={ids.location}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Where are you currently based?
                </label>
                <select
                  id={ids.location}
                  name="location_context"
                  value={locationContext}
                  onChange={(e) => setLocationContext(e.target.value as (typeof LOCATIONS)[number])}
                  aria-invalid={Boolean(fieldErrors.location_context)}
                  aria-describedby={describedBy(`${ids.location}-error`, "location_context")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={selectChevronStyle}
                >
                  {LOCATIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Diaspora families usually hear from us first on WhatsApp.
                </p>
                {showFieldError(`${ids.location}-error`, "location_context")}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitError(null);
                    setStatus("idle");
                    setStep(1);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-border py-4 rounded-xl font-bold text-foreground hover:bg-muted/30 transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => goNext(2)}
                  className="flex-[2] flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor={ids.tour}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Preferred tour window
                </label>
                <select
                  id={ids.tour}
                  name="tour_window"
                  value={tourWindow}
                  onChange={(e) => setTourWindow(e.target.value as (typeof TOUR_WINDOWS)[number])}
                  aria-invalid={Boolean(fieldErrors.tour_window)}
                  aria-describedby={describedBy(`${ids.tour}-error`, "tour_window")}
                  className={`${inputClass} appearance-none cursor-pointer`}
                  style={selectChevronStyle}
                >
                  {TOUR_WINDOWS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {showFieldError(`${ids.tour}-error`, "tour_window")}
              </div>
              <div>
                <label
                  htmlFor={ids.resident}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Resident first name (optional)
                </label>
                <input
                  id={ids.resident}
                  type="text"
                  name="resident_first_name"
                  autoComplete="off"
                  value={residentFirstName}
                  onChange={(e) => setResidentFirstName(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.resident_first_name)}
                  aria-describedby={describedBy(`${ids.resident}-error`, "resident_first_name")}
                  className={inputClass}
                  placeholder="First name only"
                />
                {showFieldError(`${ids.resident}-error`, "resident_first_name")}
              </div>
              <div className="rounded-xl border border-border p-4 bg-muted/20">
                <label
                  htmlFor={ids.consent}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <input
                    id={ids.consent}
                    name="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-invalid={Boolean(fieldErrors.consent)}
                    aria-describedby={describedBy(`${ids.consent}-error`, "consent")}
                    className="mt-1 h-4 w-4 rounded border-primary"
                  />
                  <span>
                    I want The Caring Cove to use these details to follow up about a private tour. I
                    have read the{" "}
                    <a className="text-primary font-semibold underline" href="#inquiry-privacy">
                      inquiry notice
                    </a>{" "}
                    (version {PRIVACY_NOTICE_VERSION}).
                  </span>
                </label>
                {showFieldError(`${ids.consent}-error`, "consent")}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitError(null);
                    setStatus("idle");
                    setStep(2);
                  }}
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
                      <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
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

        {status === "error" && submitError ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive font-semibold text-center p-3 bg-destructive/10 rounded-lg text-sm"
            role="alert"
          >
            {submitError}
          </motion.p>
        ) : null}
      </form>
    </motion.div>
  );
}
