import { NextResponse } from "next/server";
import { signBlob } from "@/lib/crypto";
import { activeProvider, mockAllowed } from "@/lib/payments";
import { PRICES, UPGRADE_PAISE } from "@/lib/pricing";
import type { OrderTicket } from "@/lib/payments/types";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { BIODATA_ID_RE, verifyUnlockToken } from "@/lib/unlock-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";


export async function POST(req: Request) {
  const rl = rateLimit(`order:${clientIp(req)}`, 20, 10 * 60_000);
  if (!rl.ok) return NextResponse.json({ error: "Too many attempts. Please wait a few minutes." }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as { biodataId?: string; tier?: string; currentToken?: string };
  const bid = String(body.biodataId || "");
  const tier = body.tier === "premium" ? "premium" : body.tier === "basic" ? "basic" : null;
  if (!BIODATA_ID_RE.test(bid) || !tier) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const provider = activeProvider();
  if (provider.name === "mock" && !mockAllowed()) return NextResponse.json({ error: "Payments are not configured" }, { status: 503 });

  let amount = PRICES[tier].amountPaise;
  let upgrade = false;
  if (tier === "premium" && body.currentToken) {
    const cur = verifyUnlockToken(body.currentToken, bid);
    if (cur?.tier === "basic") {
      amount = UPGRADE_PAISE;
      upgrade = true;
    }
  }

  try {
    const order = await provider.createOrder({
      amountPaise: amount,
      receipt: `bk_${Date.now().toString(36)}`,
      notes: { bid, tier, upgrade: upgrade ? "1" : "0", product: "biodata_unlock" },
    });
    const ticket = signBlob({ oid: order.orderId, bid, tier, amt: order.amountPaise, exp: Math.floor(Date.now() / 1000) + 3 * 3600 } satisfies OrderTicket, "ticket");
    return NextResponse.json({ ...order, ticket, tier, upgrade, provider: provider.name, mode: provider.mode, ...provider.publicConfig() });
  } catch (e) {
    console.error("[payment] order error", (e as Error).message);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
