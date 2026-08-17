"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_FORM_DISABLED,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_WHATSAPP,
} from "@/lib/constants";
import siteContent from "@/content/site-content.json";

const defaultForm = {
  headline: "Request a Private Tour",
  subheadline: "Secure your priority viewing today.",
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

type ContactField = "sender_name" | "sender_email" | "sender_phone";
type FieldErrors = Partial<Record<ContactField, string>>;

function cleanPhoneForValidation(phone: string): string {
  return phone.replace(/[^0-9+\s\-()]/g, "").trim();
}

function validateEmail(email: string): boolean {
  const t = email.trim();
  if (t.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

function validateContactFields(name: string, email: string, phone: string): FieldErrors {
  const errors: FieldErrors = {};
  const n = name.trim();
  if (n.length < 2) {
    errors.sender_name = "Please enter your full name (at least 2 characters).";
  } else if (n.length > 100) {
    errors.sender_name = "Name is too long.";
  }

  const e = email.trim();
  if (!e) {
    errors.sender_email = "Email is required.";
  } else if (!validateEmail(e)) {
    errors.sender_email = "Please enter a valid email address.";
  }

  const p = cleanPhoneForValidation(phone);
  if (p.length < 9) {
    errors.sender_phone = "Please enter a valid phone number.";
  } else if (p.length > 20) {
    errors.sender_phone = "Phone number is too long.";
  }

  return errors;
}

async function parseErrorMessage(response: Response, fallback: string): Promise<string> {
  const ct = response.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) {
    return fallback;
  }
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

export default function ContactForm() {
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const phoneId = `${baseId}-phone`;
  const emailId = `${baseId}-email`;
  const interestId = `${baseId}-interest`;
  const locationId = `${baseId}-location`;

  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [interest, setInterest] = useState(formContent.interests[0] ?? "");
  const [locationContext, setLocationContext] = useState(formContent.locations[0] ?? "");

  const clearContactAndStep = () => {
    setStep(1);
    setSubmitError(null);
    setFieldErrors({});
    setSenderName("");
    setSenderEmail("");
    setSenderPhone("");
    setInterest(formContent.interests[0] ?? "");
    setLocationContext(formContent.locations[0] ?? "");
  };

  const resetAll = () => {
    clearContactAndStep();
    setStatus("idle");
  };

  const goToStep2 = () => {
    setSubmitError(null);
    const errors = validateContactFields(senderName, senderEmail, senderPhone);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    setFieldErrors({});
    setStatus("idle");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitError(null);

    const errors = validateContactFields(senderName, senderEmail, senderPhone);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStep(1);
      setStatus("error");
      setSubmitError("Please check your contact details and try again.");
      return;
    }
    setFieldErrors({});

    const honeypot =
      (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";

    const body = new FormData();
    body.append("sender_name", senderName.trim());
    body.append("sender_email", senderEmail.trim());
    body.append("sender_phone", senderPhone.trim());
    body.append("interest", interest);
    body.append("location_context", locationContext);
    body.append("website", honeypot);

    setStatus("submitting");

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        body,
      });

      if (response.ok) {
        form.reset();
        clearContactAndStep();
        setStatus("success");
        return;
      }

      const message = await parseErrorMessage(response, formContent.errorMessage);
      setSubmitError(message);
      setStatus("error");
    } catch {
      setSubmitError(formContent.errorMessage);
      setStatus("error");
    }
  };

  const selectChevronStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat" as const,
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "1.25rem",
    paddingRight: "2.5rem",
  };

  if (CONTACT_FORM_DISABLED) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-2xl border border-border max-w-xl mx-auto">
        <h3 className="text-2xl font-bold text-foreground mb-2">Contact us directly</h3>
        <p className="text-muted-foreground mb-6 text-sm">
          The online inquiry form is temporarily unavailable. We are not collecting details through
          this page right now. Please phone, email, or WhatsApp us instead.
        </p>
        <ul className="space-y-3 text-sm text-foreground">
          <li>
            <a className="text-primary font-semibold hover:underline" href={`tel:${CONTACT_PHONE_TEL}`}>
              Phone: {CONTACT_PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <a className="text-primary font-semibold hover:underline" href={`mailto:${CONTACT_EMAIL}`}>
              Email: {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <a
              className="text-primary font-semibold hover:underline"
              href={`https://wa.me/${CONTACT_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    );
  }

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
          onClick={() => {
            resetAll();
          }}
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

      <div
        className="flex gap-2 mb-2"
        role="group"
        aria-label="Tour request form progress"
      >
        {[1, 2].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              step >= s ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Step {step} of 2
      </p>

      <form
        onSubmit={handleSubmit}
        className="relative space-y-5"
        noValidate
      >
        <div
          className="absolute -left-[9999px] top-0 w-px h-px overflow-hidden"
          aria-hidden
        >
          <label htmlFor={`${baseId}-website`}>Website</label>
          <input
            type="text"
            id={`${baseId}-website`}
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
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
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor={nameId}
                    className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id={nameId}
                    type="text"
                    name="sender_name"
                    autoComplete="name"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      if (fieldErrors.sender_name) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.sender_name;
                          return next;
                        });
                      }
                    }}
                    aria-invalid={Boolean(fieldErrors.sender_name)}
                    aria-describedby={
                      fieldErrors.sender_name ? `${nameId}-error` : undefined
                    }
                    className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                    placeholder="Jane Doe"
                  />
                  {fieldErrors.sender_name && (
                    <p
                      id={`${nameId}-error`}
                      className="text-destructive text-xs mt-1.5 font-medium"
                      role="alert"
                    >
                      {fieldErrors.sender_name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={phoneId}
                    className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id={phoneId}
                    type="tel"
                    name="sender_phone"
                    autoComplete="tel"
                    value={senderPhone}
                    onChange={(e) => {
                      setSenderPhone(e.target.value);
                      if (fieldErrors.sender_phone) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.sender_phone;
                          return next;
                        });
                      }
                    }}
                    aria-invalid={Boolean(fieldErrors.sender_phone)}
                    aria-describedby={
                      fieldErrors.sender_phone ? `${phoneId}-error` : undefined
                    }
                    className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                    placeholder="+254 7XX XXX XXX"
                  />
                  {fieldErrors.sender_phone && (
                    <p
                      id={`${phoneId}-error`}
                      className="text-destructive text-xs mt-1.5 font-medium"
                      role="alert"
                    >
                      {fieldErrors.sender_phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor={emailId}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  id={emailId}
                  type="email"
                  name="sender_email"
                  autoComplete="email"
                  value={senderEmail}
                  onChange={(e) => {
                    setSenderEmail(e.target.value);
                    if (fieldErrors.sender_email) {
                      setFieldErrors((prev) => {
                        const next = { ...prev };
                        delete next.sender_email;
                        return next;
                      });
                    }
                  }}
                  aria-invalid={Boolean(fieldErrors.sender_email)}
                  aria-describedby={
                    fieldErrors.sender_email ? `${emailId}-error` : undefined
                  }
                  className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base"
                  placeholder="jane@example.com"
                />
                {fieldErrors.sender_email && (
                  <p
                    id={`${emailId}-error`}
                    className="text-destructive text-xs mt-1.5 font-medium"
                    role="alert"
                  >
                    {fieldErrors.sender_email}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={goToStep2}
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
                <label
                  htmlFor={interestId}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Primary Interest
                </label>
                <select
                  id={interestId}
                  name="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base appearance-none cursor-pointer"
                  style={selectChevronStyle}
                >
                  {formContent.interests.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={locationId}
                  className="block text-xs font-bold uppercase text-muted-foreground mb-2"
                >
                  Where are you currently based?
                </label>
                <select
                  id={locationId}
                  name="location_context"
                  value={locationContext}
                  onChange={(e) => setLocationContext(e.target.value)}
                  className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-base appearance-none cursor-pointer"
                  style={selectChevronStyle}
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

        {status === "error" && submitError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-destructive font-semibold text-center p-3 bg-destructive/10 rounded-lg text-sm"
            role="alert"
          >
            {submitError}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
}
