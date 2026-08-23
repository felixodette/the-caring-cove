/** Language-neutral inquiry contract. TypeScript and PHP must agree. */

export const CONTACT_CONTRACT_VERSION = "tcc-contact.v1";
export const PRIVACY_NOTICE_VERSION = "2026-08-17.1";
export const HANDLER_VERSION = "tcc-contact-handler.v1";
export const MAX_BODY_BYTES = 16_384;
export const REQUEST_ID_PATTERN = /^tcc_inq_[a-f0-9]{26}$/;

export const NAME_MIN = 2;
export const NAME_MAX = 100;
export const EMAIL_MAX = 254;
export const PHONE_MIN = 9;
export const PHONE_MAX = 20;
export const RESIDENT_NAME_MAX = 40;

export const INTERESTS = [
  "Prefer not to say",
  "Alzheimer's / Dementia Care",
  "Palliative / End of Life",
  "Specialised Recovery",
  "Respite Stay (Short Term)",
  "24/7 Skilled Nursing",
  "General Inquiry",
] as const;

export const LOCATIONS = [
  "Nairobi (Karen/Lavington)",
  "Other parts of Kenya",
  "Diaspora (Europe/UK/Americas)",
] as const;

export const RELATIONSHIPS = [
  "Adult child / family member",
  "Spouse / partner",
  "Professional referral",
  "Myself",
  "Other",
] as const;

export const URGENCIES = [
  "Immediate (needed now)",
  "Within 2 weeks",
  "1-3 months",
  "Planning ahead",
] as const;

export const CHANNELS = ["WhatsApp", "Phone call", "Email"] as const;

export const TOUR_WINDOWS = [
  "Weekday morning",
  "Weekday afternoon",
  "Weekend",
  "Call me to arrange",
  "Prefer not to say",
] as const;

export type Interest = (typeof INTERESTS)[number];
export type LocationContext = (typeof LOCATIONS)[number];
export type Relationship = (typeof RELATIONSHIPS)[number];
export type Urgency = (typeof URGENCIES)[number];
export type Channel = (typeof CHANNELS)[number];
export type TourWindow = (typeof TOUR_WINDOWS)[number];
export type LeadBand = "hot" | "warm" | "nurture";

export type ContactField =
  | "sender_name"
  | "sender_email"
  | "sender_phone"
  | "interest"
  | "location_context"
  | "relationship"
  | "urgency"
  | "preferred_channel"
  | "tour_window"
  | "resident_first_name"
  | "consent"
  | "policy_version"
  | "request_id";

export type FieldErrors = Partial<Record<ContactField, string>>;

export type ContactInquiry = {
  sender_name: string;
  sender_email: string;
  sender_phone: string;
  interest: Interest;
  location_context: LocationContext;
  relationship: Relationship;
  urgency: Urgency;
  preferred_channel: Channel;
  tour_window: TourWindow;
  resident_first_name: string;
  consent: true;
  policy_version: typeof PRIVACY_NOTICE_VERSION;
  request_id: string;
};

export type LeadScore = {
  score: number;
  band: LeadBand;
  reasons: string[];
  nextAction: string;
};

const INTEREST_SET = new Set<string>(INTERESTS);
const LOCATION_SET = new Set<string>(LOCATIONS);
const RELATIONSHIP_SET = new Set<string>(RELATIONSHIPS);
const URGENCY_SET = new Set<string>(URGENCIES);
const CHANNEL_SET = new Set<string>(CHANNELS);
const TOUR_SET = new Set<string>(TOUR_WINDOWS);

export function payloadHasCrLf(value: string): boolean {
  return /[\r\n]/.test(value);
}

export function cleanPhoneForValidation(phone: string): string {
  return phone.replace(/[^0-9+\s\-()]/g, "").trim();
}

export function validateEmail(email: string): boolean {
  const t = email.trim();
  if (t.length === 0 || t.length > EMAIL_MAX) return false;
  if (payloadHasCrLf(t)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}

export function createRequestId(
  randomBytes: (size: number) => Uint8Array = defaultRandomBytes,
): string {
  const bytes = randomBytes(13);
  let hex = "";
  for (const b of bytes) hex += b.toString(16).padStart(2, "0");
  return `tcc_inq_${hex}`;
}

function defaultRandomBytes(size: number): Uint8Array {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function inSet<T extends string>(value: string, set: Set<string>): value is T {
  return set.has(value);
}

export function validateInquiry(input: Record<string, unknown>): {
  ok: boolean;
  value?: ContactInquiry;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  const sender_name = asString(input.sender_name).trim();
  const sender_email = asString(input.sender_email).trim();
  const sender_phone = cleanPhoneForValidation(asString(input.sender_phone));
  const interest = asString(input.interest).trim();
  const location_context = asString(input.location_context).trim();
  const relationship = asString(input.relationship).trim();
  const urgency = asString(input.urgency).trim();
  const preferred_channel = asString(input.preferred_channel).trim();
  const tour_window = asString(input.tour_window).trim() || "Call me to arrange";
  const resident_first_name = asString(input.resident_first_name).trim();
  const policy_version = asString(input.policy_version).trim();
  const request_id = asString(input.request_id).trim();
  const consentRaw = input.consent;
  const consent =
    consentRaw === true ||
    consentRaw === "true" ||
    consentRaw === "1" ||
    consentRaw === "on" ||
    consentRaw === "yes";

  const headerFields = [
    sender_name,
    sender_email,
    sender_phone,
    interest,
    location_context,
    relationship,
    urgency,
    preferred_channel,
    tour_window,
    resident_first_name,
    policy_version,
    request_id,
  ];
  if (headerFields.some(payloadHasCrLf)) {
    errors.sender_name = "Please remove line breaks and try again.";
    return { ok: false, errors };
  }

  if (sender_name.length < NAME_MIN) {
    errors.sender_name = "Please enter your full name (at least 2 characters).";
  } else if (sender_name.length > NAME_MAX) {
    errors.sender_name = "Name is too long.";
  }

  if (!sender_email) {
    errors.sender_email = "Email is required.";
  } else if (!validateEmail(sender_email)) {
    errors.sender_email = "Please enter a valid email address.";
  }

  if (sender_phone.length < PHONE_MIN) {
    errors.sender_phone = "Please enter a valid phone number.";
  } else if (sender_phone.length > PHONE_MAX) {
    errors.sender_phone = "Phone number is too long.";
  }

  if (!inSet<Interest>(interest, INTEREST_SET)) {
    errors.interest = "Please choose a care need from the list.";
  }
  if (!inSet<LocationContext>(location_context, LOCATION_SET)) {
    errors.location_context = "Please choose where you are based.";
  }
  if (!inSet<Relationship>(relationship, RELATIONSHIP_SET)) {
    errors.relationship = "Please tell us who this inquiry is for.";
  }
  if (!inSet<Urgency>(urgency, URGENCY_SET)) {
    errors.urgency = "Please choose how soon care is needed.";
  }
  if (!inSet<Channel>(preferred_channel, CHANNEL_SET)) {
    errors.preferred_channel = "Please choose how we should reach you.";
  }
  if (!inSet<TourWindow>(tour_window, TOUR_SET)) {
    errors.tour_window = "Please choose a tour window.";
  }
  if (resident_first_name.length > RESIDENT_NAME_MAX) {
    errors.resident_first_name = "First name is too long.";
  }
  if (!consent) {
    errors.consent = "Please confirm you want us to use these details to follow up.";
  }
  if (policy_version !== PRIVACY_NOTICE_VERSION) {
    errors.policy_version = "Please refresh the page and submit again.";
  }
  if (!REQUEST_ID_PATTERN.test(request_id)) {
    errors.request_id = "Please refresh the page and submit again.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: {},
    value: {
      sender_name,
      sender_email,
      sender_phone,
      interest: interest as Interest,
      location_context: location_context as LocationContext,
      relationship: relationship as Relationship,
      urgency: urgency as Urgency,
      preferred_channel: preferred_channel as Channel,
      tour_window: tour_window as TourWindow,
      resident_first_name,
      consent: true,
      policy_version: PRIVACY_NOTICE_VERSION,
      request_id,
    },
  };
}

export function scoreInquiry(inquiry: ContactInquiry): LeadScore {
  let score = 0;
  const reasons: string[] = [];

  const urgencyPoints: Record<Urgency, number> = {
    "Immediate (needed now)": 40,
    "Within 2 weeks": 30,
    "1-3 months": 15,
    "Planning ahead": 5,
  };
  score += urgencyPoints[inquiry.urgency];
  reasons.push(`Urgency: ${inquiry.urgency}`);

  const relationshipPoints: Record<Relationship, number> = {
    "Spouse / partner": 20,
    "Adult child / family member": 15,
    "Professional referral": 12,
    Myself: 10,
    Other: 5,
  };
  score += relationshipPoints[inquiry.relationship];

  const locationPoints: Record<LocationContext, number> = {
    "Nairobi (Karen/Lavington)": 15,
    "Other parts of Kenya": 10,
    "Diaspora (Europe/UK/Americas)": 18,
  };
  score += locationPoints[inquiry.location_context];

  if (inquiry.interest !== "Prefer not to say" && inquiry.interest !== "General Inquiry") {
    score += 10;
    reasons.push("Specific care need named");
  }

  if (inquiry.tour_window !== "Prefer not to say" && inquiry.tour_window !== "Call me to arrange") {
    score += 10;
    reasons.push("Tour window chosen");
  }

  if (inquiry.preferred_channel === "WhatsApp" || inquiry.preferred_channel === "Phone call") {
    score += 5;
  }

  const band: LeadBand = score >= 70 ? "hot" : score >= 45 ? "warm" : "nurture";
  const nextAction =
    band === "hot"
      ? "Call or WhatsApp within 15 minutes. Offer a same-day or next-day private tour."
      : band === "warm"
        ? "Respond within 2 hours. Confirm a tour window this week."
        : "Respond within 2 hours. Send the admissions path and offer a no-pressure conversation.";

  return { score, band, reasons, nextAction };
}

export function whatsappInquiryText(
  inquiry: Pick<ContactInquiry, "sender_name" | "urgency" | "interest">,
): string {
  return `Hello The Caring Cove, this is ${inquiry.sender_name}. I sent a tour inquiry (${inquiry.urgency}; ${inquiry.interest}). Please follow up on WhatsApp.`;
}

export const CONTACT_CONTRACT = {
  version: CONTACT_CONTRACT_VERSION,
  privacy_notice_version: PRIVACY_NOTICE_VERSION,
  handler_version: HANDLER_VERSION,
  max_body_bytes: MAX_BODY_BYTES,
  bounds: {
    name_min: NAME_MIN,
    name_max: NAME_MAX,
    email_max: EMAIL_MAX,
    phone_min: PHONE_MIN,
    phone_max: PHONE_MAX,
    resident_name_max: RESIDENT_NAME_MAX,
  },
  enums: {
    interests: [...INTERESTS],
    locations: [...LOCATIONS],
    relationships: [...RELATIONSHIPS],
    urgencies: [...URGENCIES],
    channels: [...CHANNELS],
    tour_windows: [...TOUR_WINDOWS],
  },
} as const;
