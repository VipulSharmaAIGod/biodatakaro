import { NextResponse } from "next/server";
import { verifyUnlockToken } from "@/lib/unlock-token";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { token, biodataId } = (await req.json().catch(() => ({}))) as { token?: string; biodataId?: string };
  const p = token ? verifyUnlockToken(String(token), biodataId ? String(biodataId) : undefined) : null;
  if (!p) return NextResponse.json({ valid: false });
  return NextResponse.json({ valid: true, tier: p.tier, exp: p.exp, biodataId: p.bid, paymentId: p.pid, mode: p.mode });
}
