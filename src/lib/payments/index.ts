import "server-only";
import { mockProvider } from "./mock";
import { razorpayProvider } from "./razorpay";
import type { PaymentProvider } from "./types";

let cached: PaymentProvider | null = null;

/**
 * Picks the payment provider from env:
 *  - RAZORPAY_KEY_ID + RAZORPAY_KEY_SECRET → Razorpay (test or live depending on key prefix)
 *  - otherwise → mock mode (clearly labelled in the UI), unless PAYMENTS_DISABLE_MOCK=1
 */
export function activeProvider(): PaymentProvider {
  if (cached) return cached;
  const id = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  cached = id && secret ? razorpayProvider(id, secret) : mockProvider;
  return cached;
}

export function mockAllowed() {
  return activeProvider().name === "mock" && process.env.PAYMENTS_DISABLE_MOCK !== "1";
}

export type { PaymentProvider } from "./types";
