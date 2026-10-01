import "server-only";
import { mockProvider } from "./mock";
import { razorpayProvider } from "./razorpay";
import type { PaymentProvider } from "./types";

let cached: PaymentProvider | null = null;

/**
 * Picks the payment provider from env:
 *  - RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET → Razorpay (test or live depending on key prefix)
 *  - otherwise → mock mode (clearly labelled in the UI), unless PAYMENTS_DISABLE_MOCK=1.
 *    Safety: on a Vercel *production* deployment mock mode is OFF by default (set PAYMENTS_ALLOW_MOCK=1 to force it on),
 *    so a missing key can never turn into free unlocks on the live site.
 */
export function activeProvider(): PaymentProvider {
  if (cached) return cached;
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  cached = id && secret ? razorpayProvider(id, secret) : mockProvider;
  return cached;
}

export function mockAllowed() {
  if (activeProvider().name !== "mock") return false;
  if (process.env.PAYMENTS_DISABLE_MOCK === "1") return false;
  if (process.env.VERCEL_ENV === "production" && process.env.PAYMENTS_ALLOW_MOCK !== "1") return false;
  return true;
}

export type { PaymentProvider } from "./types";
