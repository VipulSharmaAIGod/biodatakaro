import { NextResponse } from "next/server";
import { activeProvider, paymentsAvailable } from "@/lib/payments";
import { PRICES, UPGRADE_PAISE } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export function GET() {
  const p = activeProvider();
  return NextResponse.json({
    provider: p.name,
    mode: p.mode,
    available: paymentsAvailable(),
    ...p.publicConfig(),
    prices: { basic: PRICES.basic.amountPaise, premium: PRICES.premium.amountPaise, upgrade: UPGRADE_PAISE },
  });
}
