"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiodataDocument } from "@/components/biodata/BiodataDocument";
import { dataUrlToBlob, downloadBlob, renderImage, renderPdf, safeFileName } from "@/lib/export";
import { checkUnlock, createOrder, getPayConfig, mockPay, openRazorpay, restorePurchase, verifyPayment, type OrderResp, type PayConfig, type UnlockResp } from "@/lib/pay-client";
import { PRICES, rupees, tierCovers, type Tier } from "@/lib/pricing";
import { emptyBiodata, sampleBiodata, type Biodata } from "@/lib/schema";
import { BRAND } from "@/lib/site";
import { clearUnlock, getUnlock, loadBiodata, saveBiodata, setUnlock, type StoredUnlock } from "@/lib/storage";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { isLang } from "@/lib/languages";
import { ScaledDocument } from "./ScaledDocument";
import { AboutStep, DesignStep, DetailsStep, type Update } from "./steps";
import { Button, Card, Modal, Spinner, inputCls } from "./ui";

const STEPS = [
  { id: "details", label: "Details" },
  { id: "about", label: "About" },
  { id: "design", label: "Design" },
  { id: "download", label: "Download" },
] as const;
type StepId = (typeof STEPS)[number]["id"];

function initialState(): { b: Biodata; step: StepId } {
  let b = loadBiodata();
  let step: StepId = "details";
  const qs = new URLSearchParams(location.search);
  const s = qs.get("step");
  if (s && STEPS.some((x) => x.id === s)) step = s as StepId;
  const t = qs.get("template");
  if (t && TEMPLATES.some((x) => x.id === t)) b = { ...b, templateId: t };
  const lang = qs.get("lang");
  if (lang && isLang(lang) && !b.fields.fullName) b = { ...b, lang };
  const g = qs.get("for");
  if ((g === "girl" || g === "boy") && !b.fields.gender) b = { ...b, fields: { ...b.fields, gender: g === "girl" ? "female" : "male" } };
  return { b, step };
}

/** Client-only (rendered with ssr:false) so state can be initialised straight from localStorage. */
export default function BiodataMaker() {
  const [init] = useState(initialState);
  const [b, setB] = useState<Biodata | null>(init.b);
  const [step, setStep] = useState<StepId>(init.step);
  const [unlock, setUnlockState] = useState<StoredUnlock | null>(() => getUnlock(init.b.id));
  const [cfg, setCfg] = useState<PayConfig | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [saved, setSaved] = useState<"idle" | "saved" | "nophoto">("idle");
  const exportRef = useRef<HTMLDivElement>(null);

  // Payment config + re-validate any stored unlock token with the server.
  useEffect(() => {
    getPayConfig().then(setCfg).catch(() => {});
    const u = getUnlock(init.b.id);
    if (u) {
      checkUnlock(u.token, init.b.id)
        .then((r) => {
          if (!r.valid) {
            clearUnlock(init.b.id);
            setUnlockState(null);
          }
        })
        .catch(() => {});
    }
  }, [init.b.id]);

  // Autosave (debounced).
  useEffect(() => {
    if (!b) return;
    const t = setTimeout(() => setSaved(saveBiodata(b) ? "saved" : "nophoto"), 400);
    return () => clearTimeout(t);
  }, [b]);

  const update: Update = useCallback((fn) => setB((x) => (x ? fn(x) : x)), []);

  const goto = (s: StepId) => {
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!b) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-stone-500">
        <Spinner />
      </div>
    );
  }

  const tpl = getTemplate(b.templateId);
  const ownedTier = unlock?.tier ?? null;
  const covered = tierCovers(ownedTier, tpl.premium);
  const watermark: false | "free" | "premium" = covered ? false : tpl.premium ? "premium" : "free";
  const idx = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="mx-auto w-full max-w-6xl px-3 pb-28 pt-3 sm:px-5 lg:pb-10">
      {cfg?.mode === "mock" && (
        <div className="mb-3 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-[13px] text-amber-900" data-testid="mock-banner">
          <b>TEST MODE:</b> payments are simulated (no Razorpay keys configured). No real money is charged.
        </div>
      )}
      <nav aria-label="Steps" className="sticky top-0 z-30 -mx-3 mb-4 bg-cream/95 px-3 py-2 backdrop-blur sm:-mx-5 sm:px-5">
        <ol className="grid grid-cols-4 gap-1.5">
          {STEPS.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => goto(s.id)}
                data-testid={`step-${s.id}`}
                className={`flex w-full flex-col items-center rounded-xl px-1 py-1.5 text-[12px] font-semibold transition sm:flex-row sm:justify-center sm:gap-2 sm:text-[14px] ${step === s.id ? "bg-brand text-white" : i < idx ? "bg-brand/10 text-brand" : "bg-white text-stone-600"}`}
                aria-current={step === s.id ? "step" : undefined}
              >
                <span className={`grid h-5 w-5 place-items-center rounded-full text-[11px] ${step === s.id ? "bg-white/20" : "bg-stone-100"}`}>{i + 1}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0">
          {step === "details" && (
            <>
              {!b.fields.fullName && (
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-white p-3 text-[14px] text-stone-600 shadow-sm">
                  <span>New here? See how it works with a sample.</span>
                  <Button variant="secondary" onClick={() => setB({ ...sampleBiodata(), id: b.id })} data-testid="fill-sample">
                    Fill sample data
                  </Button>
                </div>
              )}
              <DetailsStep b={b} update={update} />
            </>
          )}
          {step === "about" && <AboutStep b={b} update={update} />}
          {step === "design" && <DesignStep b={b} update={update} ownedTier={ownedTier} />}
          {step === "download" && (
            <DownloadStep
              b={b}
              setB={setB}
              unlock={unlock}
              cfg={cfg}
              watermark={watermark}
              exportRef={exportRef}
              onUnlocked={(u) => {
                setUnlock(u.biodataId, { token: u.token, tier: u.tier, exp: u.exp, paymentId: u.paymentId });
                setUnlockState({ token: u.token, tier: u.tier, exp: u.exp, paymentId: u.paymentId });
              }}
            />
          )}

          <div className="mt-5 hidden items-center justify-between lg:flex">
            <Button variant="secondary" disabled={idx === 0} onClick={() => goto(STEPS[idx - 1].id)}>
              ← Back
            </Button>
            <span className="text-[13px] text-stone-500">{saved === "nophoto" ? "Saved (photo too large to store)" : saved === "saved" ? "✓ Saved on this device" : ""}</span>
            {idx < STEPS.length - 1 && <Button onClick={() => goto(STEPS[idx + 1].id)}>Next: {STEPS[idx + 1].label} →</Button>}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[13px] text-stone-500">
            <span>Your data is saved only in this browser. Nothing is uploaded.</span>
            <button
              type="button"
              className="font-semibold text-red-700"
              onClick={() => {
                if (confirm("Start a new biodata? The current one will be cleared from this device. A purchase stays linked to the old biodata (restore it with your payment ID).")) {
                  const fresh = emptyBiodata();
                  setB(fresh);
                  setUnlockState(null);
                  goto("details");
                }
              }}
            >
              Start new biodata
            </button>
          </div>
        </div>

        {/* Desktop live preview */}
        <aside className="hidden lg:block">
          <div className="sticky top-20">
            <div className="mb-2 flex items-center justify-between text-[13px] text-stone-600">
              <span>
                Live preview · <b>{tpl.name}</b>
              </span>
              {watermark && <span className="rounded-full bg-stone-200 px-2 py-0.5 text-[11px] font-semibold">{watermark === "premium" ? "Premium preview" : "Free · watermark"}</span>}
            </div>
            <ScaledDocument b={b} watermark={watermark} />
          </div>
        </aside>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),10px)] pt-2.5 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-[auto_1fr_auto] items-center gap-2">
          <Button variant="secondary" disabled={idx === 0} onClick={() => goto(STEPS[idx - 1].id)} aria-label="Back">
            ←
          </Button>
          <Button variant="secondary" onClick={() => setPreviewOpen(true)} data-testid="open-preview">
            👁 Preview
          </Button>
          {idx < STEPS.length - 1 ? (
            <Button onClick={() => goto(STEPS[idx + 1].id)} data-testid="next-step">
              Next →
            </Button>
          ) : (
            <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>⬇ Get</Button>
          )}
        </div>
      </div>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title={`Preview · ${tpl.name}`}>
        <ScaledDocument b={b} watermark={watermark} />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setPreviewOpen(false);
              goto("design");
            }}
          >
            Change design
          </Button>
          <Button
            onClick={() => {
              setPreviewOpen(false);
              goto("download");
            }}
          >
            Download
          </Button>
        </div>
      </Modal>

      {/* Full-size, off-screen copy used for PDF / image export */}
      <div aria-hidden style={{ position: "fixed", left: -10000, top: 0, width: 794, height: 1123, overflow: "hidden", pointerEvents: "none" }}>
        <BiodataDocument ref={exportRef} b={b} watermark={watermark} />
      </div>
    </div>
  );
}

/* ============================== Download / Pay ============================== */

function DownloadStep({
  b,
  setB,
  unlock,
  cfg,
  watermark,
  exportRef,
  onUnlocked,
}: {
  b: Biodata;
  setB: (b: Biodata) => void;
  unlock: StoredUnlock | null;
  cfg: PayConfig | null;
  watermark: false | "free" | "premium";
  exportRef: React.RefObject<HTMLDivElement | null>;
  onUnlocked: (u: UnlockResp) => void;
}) {
  const tpl = getTemplate(b.templateId);
  const [busy, setBusy] = useState<"" | "pdf" | "jpg" | "share" | "pay">("");
  const [err, setErr] = useState("");
  const [mockOrder, setMockOrder] = useState<{ o: OrderResp; resolve: (u: UnlockResp) => void; reject: (e: Error) => void } | null>(null);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [paidMsg, setPaidMsg] = useState("");
  const name = safeFileName(b.fields.fullName || "");
  const locked = watermark === "premium";
  const canShare = typeof navigator !== "undefined" && "canShare" in navigator;

  const doExport = async (kind: "pdf" | "jpg" | "share") => {
    if (!exportRef.current) return;
    setErr("");
    setBusy(kind);
    try {
      if (kind === "pdf") {
        downloadBlob(await renderPdf(exportRef.current, `${b.fields.fullName || "Marriage"} Biodata`), `${name}.pdf`);
      } else {
        const url = await renderImage(exportRef.current, { type: "jpeg", pixelRatio: 2, quality: 0.92 });
        const blob = dataUrlToBlob(url);
        if (kind === "share") {
          const file = new File([blob], `${name}.jpg`, { type: "image/jpeg" });
          if (navigator.canShare?.({ files: [file] })) await navigator.share({ files: [file], title: "Biodata" });
          else downloadBlob(blob, `${name}.jpg`);
        } else downloadBlob(blob, `${name}.jpg`);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setErr("Export failed. Please try again. " + ((e as Error).message || ""));
    } finally {
      setBusy("");
    }
  };

  const buy = async (tier: Tier) => {
    setErr("");
    setBusy("pay");
    try {
      const o = await createOrder(b.id, tier, unlock?.token);
      const desc = `${PRICES[tier].label} biodata unlock`;
      const u =
        o.provider === "mock"
          ? await new Promise<UnlockResp>((resolve, reject) => setMockOrder({ o, resolve, reject }))
          : await openRazorpay(o, { description: desc });
      onUnlocked(u);
      setPaidMsg(`Payment successful 🎉 ${PRICES[u.tier].label} unlocked. Payment ID: ${u.paymentId} (keep it to restore later).`);
    } catch (e) {
      if ((e as Error).message !== "cancelled") setErr((e as Error).message);
    } finally {
      setBusy("");
      setMockOrder(null);
    }
  };

  const price = (t: Tier) => (t === "premium" && unlock?.tier === "basic" ? cfg?.prices.upgrade ?? 5000 : PRICES[t].amountPaise);

  return (
    <div className="flex flex-col gap-4">
      <div className="lg:hidden">
        <ScaledDocument b={b} watermark={watermark} />
      </div>

      {paidMsg && (
        <p role="status" className="rounded-xl bg-emerald-50 p-3 text-[14px] text-emerald-900" data-testid="paid-msg">
          {paidMsg}
        </p>
      )}

      <Card>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[17px] font-bold text-stone-900">Download</h3>
          <span data-testid="status-badge" className={`rounded-full px-2.5 py-1 text-[12px] font-bold ${watermark ? "bg-stone-100 text-stone-700" : "bg-emerald-100 text-emerald-800"}`}>
            {!watermark ? `✓ ${unlock?.tier === "premium" ? "Premium" : "Basic"} · No watermark` : locked ? "Premium design (locked)" : "Free · with watermark"}
          </span>
        </div>
        {locked ? (
          <p className="mb-3 rounded-xl bg-amber-50 p-3 text-[14px] text-amber-900">
            <b>{tpl.name}</b> is a premium design. Unlock Premium to download it, or pick a free design.
          </p>
        ) : null}
        <div className="grid gap-2 sm:grid-cols-3">
          <Button onClick={() => doExport("pdf")} disabled={!!busy || locked} data-testid="dl-pdf">
            {busy === "pdf" ? <Spinner /> : "📄"} PDF
          </Button>
          <Button variant="secondary" onClick={() => doExport("jpg")} disabled={!!busy || locked} data-testid="dl-jpg">
            {busy === "jpg" ? <Spinner /> : "🖼"} Image (JPG)
          </Button>
          {canShare && (
            <Button variant="secondary" onClick={() => doExport("share")} disabled={!!busy || locked}>
              {busy === "share" ? <Spinner /> : "🟢"} Share on WhatsApp
            </Button>
          )}
        </div>
        {err && <p className="mt-3 rounded-xl bg-red-50 p-3 text-[13px] text-red-800">{err}</p>}
      </Card>

      {unlock?.tier !== "premium" && (
        <Card className="border-gold/60">
          <h3 className="text-[17px] font-bold text-stone-900">Remove watermark &amp; unlock designs</h3>
          <p className="mt-1 text-[14px] text-stone-600">One-time payment for this biodata. UPI, cards, netbanking. No subscription, no login.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["basic", "premium"] as Tier[])
              .filter((t) => !(t === "basic" && unlock?.tier === "basic"))
              .map((t) => (
                <div key={t} className={`relative rounded-2xl border-2 p-4 ${t === "premium" ? "border-brand bg-brand/[0.03]" : "border-stone-200"}`}>
                  {t === "premium" && <span className="absolute -top-3 right-3 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold text-white">MOST POPULAR</span>}
                  <div className="flex items-baseline justify-between">
                    <span className="text-[16px] font-bold text-stone-900">{PRICES[t].label}</span>
                    <span className="text-[24px] font-extrabold text-brand">{rupees(price(t))}</span>
                  </div>
                  {t === "premium" && unlock?.tier === "basic" && <p className="text-[12px] text-emerald-700">Upgrade price (you already have Basic)</p>}
                  <ul className="mt-2 space-y-1 text-[13px] text-stone-700">
                    {PRICES[t].features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                  <Button className="mt-3 w-full" variant={t === "premium" ? "primary" : "secondary"} disabled={!!busy} onClick={() => buy(t)} data-testid={`buy-${t}`}>
                    {busy === "pay" ? <Spinner /> : null} Pay {rupees(price(t))}
                  </Button>
                </div>
              ))}
          </div>
          <p className="mt-3 text-[12px] text-stone-500">
            Secure payment via {cfg?.provider === "razorpay" ? "Razorpay" : "Razorpay (test mode)"}. By paying you agree to our <Link href="/terms" className="underline">Terms</Link> and{" "}
            <Link href="/refund-policy" className="underline">Refund Policy</Link>.
          </p>
        </Card>
      )}

      <div className="text-center">
        <button type="button" className="text-[14px] font-semibold text-brand underline" onClick={() => setRestoreOpen(true)} data-testid="restore-open">
          Already paid? Restore purchase
        </button>
      </div>

      <Modal open={!!mockOrder} onClose={() => mockOrder?.reject(new Error("cancelled"))} title="Test payment (no real money)">
        {mockOrder && (
          <div className="flex flex-col gap-3" data-testid="mock-checkout">
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-[13px] text-amber-900">
              <b>MOCK CHECKOUT</b> — Razorpay keys are not configured, so this simulates Razorpay Standard Checkout. Order <code>{mockOrder.o.orderId}</code>.
            </div>
            <div className="flex items-baseline justify-between rounded-xl bg-stone-50 p-3">
              <span className="font-semibold">{BRAND} · {PRICES[mockOrder.o.tier].label}</span>
              <span className="text-xl font-extrabold">{rupees(mockOrder.o.amountPaise)}</span>
            </div>
            <Button
              data-testid="mock-pay-success"
              onClick={async () => {
                try {
                  const r = await mockPay(mockOrder.o.orderId);
                  mockOrder.resolve(await verifyPayment(mockOrder.o, r));
                } catch (e) {
                  mockOrder.reject(e as Error);
                }
              }}
            >
              Simulate successful payment
            </Button>
            <Button variant="secondary" onClick={() => mockOrder.reject(new Error("cancelled"))}>
              Cancel
            </Button>
          </div>
        )}
      </Modal>

      <RestoreModal
        open={restoreOpen}
        onClose={() => setRestoreOpen(false)}
        onRestored={(u) => {
          if (u.biodataId !== b.id) setB({ ...b, id: u.biodataId });
          onUnlocked(u);
          setRestoreOpen(false);
          setPaidMsg(`Purchase restored ✓ ${PRICES[u.tier].label} unlocked.`);
        }}
      />
    </div>
  );
}

function RestoreModal({ open, onClose, onRestored }: { open: boolean; onClose: () => void; onRestored: (u: UnlockResp) => void }) {
  const [pid, setPid] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <Modal open={open} onClose={onClose} title="Restore purchase">
      <p className="text-[14px] text-stone-600">
        Enter the payment ID from your Razorpay receipt (email/SMS). It starts with <code>pay_</code>.
      </p>
      <input className={`${inputCls} mt-3`} placeholder="pay_XXXXXXXXXXXXXX" value={pid} onChange={(e) => setPid(e.target.value.trim())} data-testid="restore-input" />
      {err && <p className="mt-2 text-[13px] text-red-700">{err}</p>}
      <Button
        className="mt-3 w-full"
        disabled={busy || !pid}
        data-testid="restore-submit"
        onClick={async () => {
          setBusy(true);
          setErr("");
          try {
            onRestored(await restorePurchase(pid));
          } catch (e) {
            setErr((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? <Spinner /> : null} Restore
      </Button>
    </Modal>
  );
}
