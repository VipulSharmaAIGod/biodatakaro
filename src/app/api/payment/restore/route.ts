import { NextResponse } from "next/server";
import { activeProvider, paymentsAvailable } from "@/lib/payments";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { BIODATA_ID_RE, issueUnlockToken } from "@/lib/unlock-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESTORE_WINDOW_DAYS = 365;

/**
 * Stateless purchase recovery: the customer pastes the Razorpay payment ID from their receipt email/SMS.
 * We fetch the payment from the gateway, check it is captured, and re-issue the token for the biodata
 * recorded in the order notes. Cuts support tickets ("I paid but lost my download").
 */
export async function POST(req: Request) {
  if (!paymentsAvailable()) return NextResponse.json({ error: "Payments are launching soon." }, { status: 503 });
  const rl = rateLimit(`restore:${clientIp(req)}`, 10, 60 * 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const { paymentId } = (await req.json().catch(() => ({}))) as { paymentId?: string };
  const pid = String(paymentId || "").trim();
  if (!/^pay_[A-Za-z0-9]{6,30}$/.test(pid)) return NextResponse.json({ error: "Enter a valid payment ID (starts with pay_)." }, { status: 400 });

  const provider = activeProvider();
  const p = await provider.fetchPayment(pid);
  if (!p) return NextResponse.json({ error: "Payment not found." }, { status: 404 });
  const tier = p.notes.tier === "premium" ? "premium" : p.notes.tier === "basic" ? "basic" : null;
  if (p.status !== "captured" || !tier || !BIODATA_ID_RE.test(p.notes.bid || "") || p.notes.product !== "biodata_unlock") {
    return NextResponse.json({ error: "This payment is not a completed biodata purchase." }, { status: 400 });
  }
  if (Date.now() / 1000 - p.createdAt > RESTORE_WINDOW_DAYS * 86400) return NextResponse.json({ error: "This purchase has expired." }, { status: 400 });

  const { token, payload } = issueUnlockToken({ bid: p.notes.bid, tier, pid: p.id, mode: provider.mode });
  return NextResponse.json({ token, tier: payload.tier, exp: payload.exp, biodataId: payload.bid, paymentId: p.id });
}
