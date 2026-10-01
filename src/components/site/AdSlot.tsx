/**
 * Reserved ad placement. Intentionally renders nothing for now (no ad code is shipped).
 * To enable AdSense later: set NEXT_PUBLIC_ADSENSE_CLIENT, add the AdSense script in app/(site)/layout.tsx,
 * and render an <ins className="adsbygoogle" .../> here. Keep a fixed min-height to avoid layout shift (CLS).
 * Do NOT place ads inside the biodata maker flow or near the payment buttons.
 */
export function AdSlot({ id }: { id: string; minHeight?: number }) {
  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT) return null;
  return <div data-ad-slot={id} aria-hidden className="mx-auto my-8 max-w-3xl" />;
}
