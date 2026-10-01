"use client";
import { useCallback, useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Button, Modal } from "./ui";

async function cropToDataUrl(src: string, area: Area): Promise<string> {
  const img = new Image();
  img.src = src;
  await img.decode();
  const W = 600;
  const H = 750;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, W, H);
  return c.toDataURL("image/jpeg", 0.86);
}

export function PhotoField({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [err, setErr] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const onFile = (f: File | undefined) => {
    setErr("");
    if (!f) return;
    if (!/^image\/(jpeg|png|webp|gif|bmp)$/.test(f.type)) return setErr("Please choose a JPG, PNG or WebP photo.");
    if (f.size > 20 * 1024 * 1024) return setErr("Photo is too large (max 20 MB).");
    const fr = new FileReader();
    fr.onload = () => {
      setSrc(fr.result as string);
      setZoom(1);
      setCrop({ x: 0, y: 0 });
    };
    fr.readAsDataURL(f);
  };
  const onComplete = useCallback((_: Area, px: Area) => setArea(px), []);

  return (
    <div className="flex items-center gap-4">
      <div className="grid h-[100px] w-[80px] shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed border-stone-300 bg-stone-50 text-center text-[11px] text-stone-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {value ? <img src={value} alt="Your photo" className="h-full w-full object-cover" /> : "No photo"}
      </div>
      <div className="flex flex-col gap-2">
        <input ref={input} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} data-testid="photo-input" />
        <Button variant="secondary" onClick={() => input.current?.click()}>
          {value ? "Change photo" : "Add photo (optional)"}
        </Button>
        {value && (
          <button type="button" className="text-left text-[13px] font-semibold text-red-700" onClick={() => onChange(null)}>
            Remove photo
          </button>
        )}
        {err && <p className="text-[13px] text-red-700">{err}</p>}
        <p className="text-[12px] text-stone-500">Stays on your phone. Never uploaded.</p>
      </div>
      <Modal open={!!src} onClose={() => setSrc(null)} title="Crop your photo">
        <div className="relative h-[360px] w-full overflow-hidden rounded-xl bg-stone-900">
          {src && <Cropper image={src} crop={crop} zoom={zoom} aspect={4 / 5} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onComplete} objectFit="contain" />}
        </div>
        <label className="mt-3 flex items-center gap-3 text-sm text-stone-600">
          Zoom
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} className="w-full accent-[#7a1f2b]" />
        </label>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="secondary" onClick={() => setSrc(null)}>
            Cancel
          </Button>
          <Button
            data-testid="crop-save"
            onClick={async () => {
              if (src && area) onChange(await cropToDataUrl(src, area));
              setSrc(null);
              if (input.current) input.current.value = "";
            }}
          >
            Use photo
          </Button>
        </div>
      </Modal>
    </div>
  );
}
