/**
 * Minimal payment-provider interface. Razorpay and a local mock implement it;
 * Cashfree / Instamojo / PhonePe can be added by implementing the same methods.
 */
export interface CreateOrderInput {
  amountPaise: number;
  receipt: string;
  notes: Record<string, string>;
}

export interface CreatedOrder {
  orderId: string;
  amountPaise: number;
  currency: "INR";
}

export interface VerifyInput {
  orderId: string;
  paymentId: string;
  signature: string;
}

export interface PaymentInfo {
  id: string;
  orderId: string | null;
  status: string; // "captured" | "authorized" | ...
  amountPaise: number;
  createdAt: number; // unix seconds
  notes: Record<string, string>;
}

export interface PaymentProvider {
  name: "razorpay" | "mock";
  /** live / test refer to the gateway's own mode (rzp_live_ / rzp_test_ keys). */
  mode: "live" | "test" | "mock";
  /** Public data the browser needs to open checkout. */
  publicConfig(): { keyId?: string };
  createOrder(input: CreateOrderInput): Promise<CreatedOrder>;
  verifyPayment(input: VerifyInput): Promise<boolean>;
  verifyWebhook(rawBody: string, signature: string | null): boolean;
  fetchPayment(paymentId: string): Promise<PaymentInfo | null>;
}

/** Signed, short-lived blob binding an order to a biodata + tier (keeps the flow stateless). */
export interface OrderTicket {
  oid: string;
  bid: string;
  tier: "basic" | "premium";
  amt: number;
  exp: number;
}
