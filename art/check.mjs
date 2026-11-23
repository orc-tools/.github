// Checks profile/README.md against art/products.mjs and profile/img/:
// every tool and game has its tile, link and alt text, and every picture the
// README names exists in both themes.
//
//   node art/check.mjs

import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tools, games } from "./products.mjs";

const profile = join(dirname(fileURLToPath(import.meta.url)), "..", "profile");
const readme = readFileSync(join(profile, "README.md"), "utf8");
const problems = [];

for (const [width, list] of [["49%", tools], ["24%", games]]) {
  for (const p of list) {
    const alt = `${p.name}${p.adult ? " (18+)" : ""}: ${p.line}`;
    const tile = `<a href="${p.url}"><picture><source media="(prefers-color-scheme: dark)" srcset="img/${p.slug}-night.webp"><img src="img/${p.slug}-day.webp" width="${width}" alt="${alt}"></picture></a>`;
    if (!readme.includes(tile)) problems.push(`no tile for ${p.name} matching products.mjs`);
  }
}

const named = [...readme.matchAll(/(?:src|srcset)="(img\/[^"]+)"/g)].map((m) => m[1]);
for (const file of named) if (!existsSync(join(profile, file))) problems.push(`missing ${file}`);
for (const file of named.filter((f) => f.endsWith("-night.webp"))) {
  if (!named.includes(file.replace("-night.webp", "-day.webp"))) problems.push(`${file} has no day version`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(`ok: ${tools.length} tools, ${games.length} games, ${named.length} pictures`);
