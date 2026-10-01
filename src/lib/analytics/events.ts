/** Site code written into every ANALYTICS line, plus the allowed event names. */
export const ANALYTICS_SITE = "biodatakaro";

/** Events the browser may send to /api/t. Anything else is dropped. */
export const CLIENT_EVENTS = [
  "pageview",
  "builder_start",
  "ai_generate",
  "preview_template",
  "download_free_pdf",
  "download_free_jpg",
  "download_paid_pdf",
  "download_paid_jpg",
  "share_image",
  "checkout_open",
  "download_step_view",
] as const;
export type ClientEvent = (typeof CLIENT_EVENTS)[number];

/** Events only the server writes (after verification). */
export type ServerEvent = "order_created" | "payment_success" | "restore";
