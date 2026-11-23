// Draws every picture profile/README.md shows: the banner and one tile per
// tool and game, each in a day and a night version. GitHub strips styling
// from a README, so names and lines are drawn into the pictures here.
//
//   node art/render.mjs
//
// Needs Playwright with Chromium (NODE_PATH pointing at its node_modules
// works) and cwebp on PATH. Writes profile/img/*.webp.

import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

import { tools, games } from "./products.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const src = pathToFileURL(join(here, "src")).href;
const out = join(here, "..", "profile", "img");
const work = join(here, ".build");

// The hub's two themes. Night is the hub's own; day is its light theme.
const themes = {
  night: {
    page: "#0a0c0b", ink: "#f3f5f2", soft: "#aab1ac", line: "rgba(255,255,255,.10)",
    accent: "#9dc76b",
    glow: "radial-gradient(520px 300px at 78% 62%, rgba(157,199,107,.30), transparent 70%), radial-gradient(380px 240px at 20% 0%, rgba(143,211,193,.14), transparent 70%)",
    shadow: "0 18px 40px rgba(0,0,0,.55)",
  },
  day: {
    page: "#eef0ea", ink: "#10140f", soft: "#4d564c", line: "rgba(16,20,15,.12)",
    accent: "#4c7a22",
    glow: "radial-gradient(520px 300px at 78% 62%, rgba(120,170,70,.38), transparent 70%), radial-gradient(380px 240px at 20% 0%, rgba(143,211,193,.30), transparent 70%)",
    shadow: "0 18px 40px rgba(30,40,25,.28)",
  },
};

const base = (t) => `
@font-face { font-family: Manrope; src: url(${src}/manrope.woff2) format("woff2"); font-weight: 200 800; }
* { box-sizing: border-box; margin: 0; }
html, body { background: transparent; }
body { font-family: Manrope, sans-serif; color: ${t.ink}; -webkit-font-smoothing: antialiased; }
#card { position: relative; overflow: hidden; background: ${t.page}; box-shadow: inset 0 0 0 1px ${t.line}; }
`;

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function banner(t, theme) {
  const shot = (night, day) => `url(${src}/${theme === "night" ? night : day})`;
  return `<style>${base(t)}
#card { width: 832px; height: 300px; border-radius: 16px; background: ${t.glow}, ${t.page}; }
.mark { position: absolute; left: 44px; top: 40px; display: flex; align-items: center; gap: 12px; font-size: 22px; letter-spacing: -.01em; }
.mark img { width: 44px; height: 44px; }
.mark b { font-weight: 800; }
.mark span { font-weight: 500; color: ${t.soft}; }
.say { position: absolute; left: 44px; top: 124px; font-weight: 800; font-size: 40px; line-height: 1.04; letter-spacing: -.04em; }
.say i { font-style: normal; color: ${t.accent}; display: block; }
.sub { position: absolute; left: 45px; top: 228px; font-weight: 500; font-size: 14.5px; color: ${t.soft}; }
.win { position: absolute; border-radius: 10px; background-size: cover; background-position: center top; box-shadow: ${t.shadow}, 0 0 0 1px ${t.line}; }
.w1 { width: 262px; height: 164px; right: 108px; top: 30px; transform: perspective(900px) rotateY(-14deg) rotateX(3deg) rotate(-2deg); background-image: ${shot("orc-night.jpg", "orc-day.jpg")}; }
.w2 { width: 212px; height: 132px; right: 22px; top: 136px; transform: perspective(900px) rotateY(-14deg) rotateX(3deg) rotate(2deg); background-image: ${shot("orc-radio-night.webp", "orc-radio-day.webp")}; }
.w3 { width: 176px; height: 99px; right: 226px; top: 176px; transform: perspective(900px) rotateY(-14deg) rotateX(3deg) rotate(-4deg); background-image: url(${src}/tuskhold.jpg); }
</style>
<div id="card">
  <div class="mark"><img src="${src}/orc-icon.png" alt=""><div><b>/orc</b> <span>tools</span></div></div>
  <div class="say">Orc, and everything<i>made around it.</i></div>
  <div class="sub">One app for coding agents. Tools and games around it.</div>
  <div class="win w3"></div><div class="win w1"></div><div class="win w2"></div>
</div>`;
}

// A tool tile is drawn 440px wide, a game tile 216px: two and four to a row
// at GitHub's README width.
function tile(t, theme, p, size) {
  const small = size === "game";
  const pic = typeof p.picture === "string" ? p.picture : p.picture[theme];
  return `<style>${base(t)}
#card { width: ${small ? 216 : 440}px; border-radius: ${small ? 10 : 12}px; }
.pic { display: block; width: 100%; aspect-ratio: 16 / 10; background: url(${src}/${pic}) center top / cover; }
.cap { display: block; padding: ${small ? "10px 12px 12px" : "12px 16px 14px"}; height: ${small ? 74 : 66}px; border-top: 1px solid ${t.line}; }
.nm { display: flex; align-items: center; gap: ${small ? 6 : 8}px; font-weight: 800; font-size: ${small ? 14 : 17}px; letter-spacing: -.02em; line-height: 1.2; }
.nm i { width: ${small ? 7 : 8}px; height: ${small ? 7 : 8}px; border-radius: 50%; flex: none; background: ${p.accent}; }
.ln { display: block; font-weight: 500; font-size: ${small ? 11.5 : 13}px; color: ${t.soft}; margin-top: 3px; line-height: 1.3; }
.tag { font-size: 10px; font-weight: 800; letter-spacing: .04em; padding: 1px 5px; border-radius: 999px; box-shadow: inset 0 0 0 1px ${t.soft}; color: ${t.soft}; }
</style>
<div id="card">
  <span class="pic"></span>
  <span class="cap"><span class="nm"><i></i>${esc(p.name)}${p.adult ? '<span class="tag">18+</span>' : ""}</span><span class="ln">${esc(p.line)}</span></span>
</div>`;
}

async function shoot(page, name, html) {
  const file = join(work, `${name}.html`);
  writeFileSync(file, `<!doctype html><meta charset="utf-8">${html}`);
  await page.goto(pathToFileURL(file).href);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");
  const png = join(work, `${name}.png`);
  await page.locator("#card").screenshot({ path: png, omitBackground: true });
  execFileSync("cwebp", ["-quiet", "-q", "86", "-alpha_q", "100", "-m", "6", png, "-o", join(out, `${name}.webp`)]);
}

rmSync(work, { recursive: true, force: true });
mkdirSync(work, { recursive: true });
mkdirSync(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1000, height: 800 }, deviceScaleFactor: 2 });
for (const [theme, t] of Object.entries(themes)) {
  await shoot(page, `banner-${theme}`, banner(t, theme));
  for (const p of tools) await shoot(page, `${p.slug}-${theme}`, tile(t, theme, p, "tool"));
  for (const p of games) await shoot(page, `${p.slug}-${theme}`, tile(t, theme, p, "game"));
}
await browser.close();
rmSync(work, { recursive: true, force: true });

// The Orc section's screenshot needs no drawing, only the same format.
for (const theme of Object.keys(themes)) {
  execFileSync("cwebp", ["-quiet", "-q", "84", "-m", "6", "-resize", "1664", "0", join(here, "src", `orc-${theme}.jpg`), "-o", join(out, `orc-${theme}.webp`)]);
}
console.log(`wrote ${2 * (2 + tools.length + games.length)} pictures to ${out}`);
