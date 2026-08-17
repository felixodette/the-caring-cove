/** Production site URL - used for SEO, sitemap, robots, canonical URLs */
export const SITE_URL = "https://thecaringcove.co.ke";

/** Holding-release contact fallbacks — replace via canonical fact registry in Phase 2 */
export const CONTACT_PHONE_DISPLAY = "+254 748 583 879";
export const CONTACT_PHONE_TEL = "+254748583879";
export const CONTACT_EMAIL = "info@thecaringcove.co.ke";
export const CONTACT_WHATSAPP =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "254748583879";

/** Phase E holding: web form disabled until privacy and transport gates pass */
export const CONTACT_FORM_DISABLED =
  process.env.NEXT_PUBLIC_CONTACT_FORM_DISABLED !== "enabled";
