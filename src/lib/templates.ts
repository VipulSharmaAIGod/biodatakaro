export type TemplateId = "classic" | "minimal" | "floral" | "royal" | "mandala" | "peacock" | "emerald" | "sidebar";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  premium: boolean;
  description: string;
  swatch: [string, string];
}

export const TEMPLATES: TemplateMeta[] = [
  { id: "classic", name: "Classic Maroon", premium: false, description: "Cream paper, maroon double border, gold accents", swatch: ["#7a1f2b", "#c9a227"] },
  { id: "minimal", name: "Simple Elegant", premium: false, description: "Clean white layout with navy lines", swatch: ["#1e3a5f", "#e5e7eb"] },
  { id: "floral", name: "Rose Floral", premium: false, description: "Soft pink with floral corners", swatch: ["#be185d", "#fce7f3"] },
  { id: "royal", name: "Royal Gold", premium: true, description: "Deep maroon with ornate gold frame", swatch: ["#4a0e17", "#d4af37"] },
  { id: "mandala", name: "Saffron Mandala", premium: true, description: "Festive saffron with mandala art", swatch: ["#c2410c", "#fde68a"] },
  { id: "peacock", name: "Peacock Teal", premium: true, description: "Teal and gold peacock-feather motif", swatch: ["#0f5e63", "#e3b23c"] },
  { id: "emerald", name: "Emerald Arabesque", premium: true, description: "Emerald green with geometric star pattern", swatch: ["#065f46", "#d9b65d"] },
  { id: "sidebar", name: "Modern Sidebar", premium: true, description: "Two-column modern layout with photo sidebar", swatch: ["#1f2a44", "#e8b04b"] },
];

export const FREE_TEMPLATE_IDS = TEMPLATES.filter((t) => !t.premium).map((t) => t.id);
export function getTemplate(id: string): TemplateMeta {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}
