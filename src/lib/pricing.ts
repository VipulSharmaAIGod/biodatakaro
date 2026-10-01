/**
 * Pricing (INR). Rationale:
 *  - ₹49 "Basic": impulse price for the most common need — remove the watermark on the free designs.
 *  - ₹99 "Premium": unlocks all premium designs + no watermark. Anchors the ₹49 option and lifts average order value.
 *  - Upgrade Basic → Premium for the ₹50 difference, so nobody feels punished for buying Basic first.
 * Unlocks are per biodata (one person), with unlimited edits and re-downloads for a year.
 */
export type Tier = "basic" | "premium";

export const PRICES: Record<Tier, { amountPaise: number; label: string; features: string[] }> = {
  basic: {
    amountPaise: 4900,
    label: "Basic",
    features: ["No watermark on the 3 free designs", "HD PDF + JPG for WhatsApp", "Unlimited edits & re-downloads for 1 year"],
  },
  premium: {
    amountPaise: 9900,
    label: "Premium",
    features: ["All 8 designs incl. 5 premium", "No watermark", "HD PDF + JPG for WhatsApp", "Unlimited edits & re-downloads for 1 year"],
  },
};

export const UPGRADE_PAISE = PRICES.premium.amountPaise - PRICES.basic.amountPaise;
export const UNLOCK_VALIDITY_DAYS = 365;

export function rupees(paise: number) {
  return `₹${Math.round(paise / 100)}`;
}

export function tierCovers(owned: Tier | null | undefined, templatePremium: boolean): boolean {
  if (!owned) return false;
  if (owned === "premium") return true;
  return !templatePremium;
}
