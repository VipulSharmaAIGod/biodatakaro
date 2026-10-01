import { NextResponse } from "next/server";
import { readBlob } from "@/lib/crypto";
import { activeProvider } from "@/lib/payments";
import { issueUnlockToken } from "@/lib/unlock-token";
import type { OrderTicket } from "@/lib/payments/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { orderId?: string; paymentId?: string; signature?: string; ticket?: string };
  const ticket = readBlob<OrderTicket>(String(body.ticket || ""), "ticket");
  if (!ticket || ticket.oid !== body.orderId || ticket.exp < Date.now() / 1000) {
    return NextResponse.json({ error: "Order not recognised. If money was debited, use 'Restore purchase' with your payment ID." }, { status: 400 });
  }
  const provider = activeProvider();
  const ok = await provider.verifyPayment({ orderId: String(body.orderId), paymentId: String(body.paymentId || ""), signature: String(body.signature || "") });
  if (!ok) return NextResponse.json({ error: "Payment verification failed." }, { status: 400 });

  const { token, payload } = issueUnlockToken({ bid: ticket.bid, tier: ticket.tier, pid: String(body.paymentId), mode: provider.mode });
  return NextResponse.json({ token, tier: payload.tier, exp: payload.exp, biodataId: payload.bid, paymentId: payload.pid });
}
