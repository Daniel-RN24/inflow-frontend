export function getCssColor(name, fallback = "#000000") {
  if (typeof window === "undefined") return fallback;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!value) return fallback;
  const hex = oklchToHex(value);
  return hex || fallback;
}

/* -------- Helpers de gradiente para Chart.js -------- */

export function hexToRgba(hex, alpha = 1) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function lightenHex(hex, amount = 0.2) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full.slice(0, 6), 16);
  const r = Math.min(255, ((n >> 16) & 255) + Math.round(amount * 255));
  const g = Math.min(255, ((n >> 8) & 255) + Math.round(amount * 255));
  const b = Math.min(255, (n & 255) + Math.round(amount * 255));
  return `rgb(${r}, ${g}, ${b})`;
}

export function interpolateHex(from, to, t = 0.5) {
  const clean = (h) => {
    const c = h.replace("#", "");
    return c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
  };
  const f = clean(from);
  const g = clean(to);
  const fr = parseInt(f.slice(0, 2), 16);
  const fgG = parseInt(f.slice(2, 4), 16);
  const fb = parseInt(f.slice(4, 6), 16);
  const tr = parseInt(g.slice(0, 2), 16);
  const tg = parseInt(g.slice(2, 4), 16);
  const tb = parseInt(g.slice(4, 6), 16);
  const rr = Math.round(fr + (tr - fr) * t);
  const rg = Math.round(fgG + (tg - fgG) * t);
  const rb = Math.round(fb + (tb - fb) * t);
  return `rgb(${rr}, ${rg}, ${rb})`;
}

export function verticalGradient(colorHex, alphaTop = 0.35, alphaBottom = 0) {
  return (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return hexToRgba(colorHex, alphaTop);
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    );
    gradient.addColorStop(0, hexToRgba(colorHex, alphaTop));
    gradient.addColorStop(1, hexToRgba(colorHex, alphaBottom));
    return gradient;
  };
}

export function radialGradient(colorHex, lightenAmount = 0.2) {
  const lighter = lightenHex(colorHex, lightenAmount);
  return (context) => {
    const { ctx, chartArea } = context.chart;
    if (!chartArea) return colorHex;
    const center = {
      x: (chartArea.left + chartArea.right) / 2,
      y: (chartArea.top + chartArea.bottom) / 2,
    };
    const radius = Math.min(chartArea.width, chartArea.height) / 2;
    const gradient = ctx.createRadialGradient(
      center.x,
      center.y,
      radius * 0.3,
      center.x,
      center.y,
      radius * 1.1,
    );
    gradient.addColorStop(0, lighter);
    gradient.addColorStop(1, colorHex);
    return gradient;
  };
}

function oklchToHex(input) {
  const match = input.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
  );
  if (!match) return null;
  const [, l, c, h, alpha] = match;
  const { r, g, b } = oklabToSrgb({
    l: parseFloat(l),
    a: parseFloat(c) * Math.cos((parseFloat(h) * Math.PI) / 180),
    b: parseFloat(c) * Math.sin((parseFloat(h) * Math.PI) / 180),
  });

  let a = 1;
  if (alpha != null) {
    a = alpha.includes("%") ? parseFloat(alpha) / 100 : parseFloat(alpha);
  }

  const toHex = (v) =>
    Math.round(Math.max(0, Math.min(1, v)) * 255)
      .toString(16)
      .padStart(2, "0");

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a === 1 ? hex : `${hex}${toHex(a)}`;
}

function oklabToSrgb({ l, a, b }) {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ ** 3;
  const m3 = m_ ** 3;
  const s3 = s_ ** 3;

  let r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let bl = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const linearToGamma = (c) =>
    c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;

  r = linearToGamma(r);
  g = linearToGamma(g);
  bl = linearToGamma(bl);

  return { r, g, b: bl };
}