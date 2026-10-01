"use client";
import { emptyBiodata, type Biodata } from "./schema";
import type { Tier } from "./pricing";

const KEY = "bk:biodata:v1";
const TOKENS = "bk:unlock:v1";

export function loadBiodata(): Biodata {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const b = JSON.parse(raw) as Biodata;
      if (b && b.v === 1 && typeof b.id === "string") {
        const base = emptyBiodata();
        return { ...base, ...b, fields: { ...b.fields }, about: { ...base.about, ...b.about }, custom: b.custom || [] };
      }
    }
  } catch {}
  return emptyBiodata();
}

export function saveBiodata(b: Biodata): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...b, updatedAt: Date.now() }));
    return true;
  } catch {
    // Quota exceeded (very large photo) — retry without the photo so text is never lost.
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...b, photo: null, updatedAt: Date.now() }));
    } catch {}
    return false;
  }
}

export interface StoredUnlock {
  token: string;
  tier: Tier;
  exp: number;
  paymentId?: string;
}

function readTokens(): Record<string, StoredUnlock> {
  try {
    return JSON.parse(localStorage.getItem(TOKENS) || "{}");
  } catch {
    return {};
  }
}
export function getUnlock(bid: string): StoredUnlock | null {
  const t = readTokens()[bid];
  return t && t.exp * 1000 > Date.now() ? t : null;
}
export function setUnlock(bid: string, u: StoredUnlock) {
  const all = readTokens();
  all[bid] = u;
  localStorage.setItem(TOKENS, JSON.stringify(all));
}
export function clearUnlock(bid: string) {
  const all = readTokens();
  delete all[bid];
  localStorage.setItem(TOKENS, JSON.stringify(all));
}
