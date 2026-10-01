"use client";
import type { Tier } from "./pricing";
import { BRAND } from "./site";

export interface PayConfig {
  provider: "razorpay" | "mock";
  mode: "live" | "test" | "mock";
  keyId?: string;
  prices: { basic: number; premium: number; upgrade: number };
}

export interface OrderResp {
  orderId: string;
  amountPaise: number;
  currency: "INR";
  ticket: string;
  tier: Tier;
  upgrade: boolean;
  provider: "razorpay" | "mock";
  mode: "live" | "test" | "mock";
  keyId?: string;
}

export interface UnlockResp {
  token: string;
  tier: Tier;
  exp: number;
  biodataId: string;
  paymentId: string;
}

async function post<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error || `Request failed (${res.status})`);
  return data as T;
}

export const getPayConfig = () => fetch("/api/payment/config").then((r) => r.json() as Promise<PayConfig>);
export const createOrder = (biodataId: string, tier: Tier, currentToken?: string) => post<OrderResp>("/api/payment/order", { biodataId, tier, currentToken });
export const verifyPayment = (o: OrderResp, r: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
  post<UnlockResp>("/api/payment/verify", { orderId: r.razorpay_order_id, paymentId: r.razorpay_payment_id, signature: r.razorpay_signature, ticket: o.ticket });
export const mockPay = (orderId: string) => post<{ razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }>("/api/payment/mock-pay", { orderId });
export const restorePurchase = (paymentId: string) => post<UnlockResp>("/api/payment/restore", { paymentId });
export const checkUnlock = (token: string, biodataId: string) => post<{ valid: boolean; tier?: Tier; exp?: number }>("/api/unlock/verify", { token, biodataId });

declare global {
  interface Window {
    Razorpay?: new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void };
  }
}

function loadCheckout(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Razorpay. Check your internet connection."));
    document.head.appendChild(s);
  });
}

/** Opens Razorpay Standard Checkout and resolves with the verified unlock. */
export async function openRazorpay(o: OrderResp, opts: { description: string }): Promise<UnlockResp> {
  await loadCheckout();
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay!({
      key: o.keyId,
      amount: o.amountPaise,
      currency: "INR",
      order_id: o.orderId,
      name: BRAND,
      description: opts.description,
      theme: { color: "#7a1f2b" },
      handler: (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
        verifyPayment(o, resp).then(resolve, reject);
      },
      modal: { ondismiss: () => reject(new Error("cancelled")), confirm_close: true },
    });
    rzp.on("payment.failed", () => {
      /* Razorpay shows its own retry UI; we only reject when the modal closes. */
    });
    rzp.open();
  });
}
