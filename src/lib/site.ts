/** Central brand + site configuration. Change the brand here. */
export const BRAND = "BiodataKaro";
export const BRAND_TAGLINE = "AI Marriage Biodata Maker";

/** Public base URL (no trailing slash). Set NEXT_PUBLIC_SITE_URL in production. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://biodatakaro.com").replace(/\/+$/, "");

/** Placeholders for the owner's details — replace before applying to a payment gateway. */
export const OWNER = {
  legalName: process.env.NEXT_PUBLIC_OWNER_NAME || "[OWNER FULL NAME]",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[CONTACT EMAIL]",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "[CONTACT PHONE]",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "[POSTAL ADDRESS, CITY, STATE, PIN]",
  city: process.env.NEXT_PUBLIC_OWNER_CITY || "[CITY]",
};

export const LAST_UPDATED = "1 October 2026";
