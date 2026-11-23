// The tools and games the profile shows, with the names, lines, colours and
// links the orc.tools hub uses (its src/lib/products.ts). Change them there
// first, then here, then run render.mjs and update profile/README.md.

export const tools = [
  { slug: "orc-radio", name: "Orc Radio", line: "The music Orc composes, on a loop.", accent: "#8fd3c1",
    url: "https://radio.orc.tools", picture: { night: "orc-radio-night.webp", day: "orc-radio-day.webp" } },
  // MCP Manager has no site of its own, so it links to its page on the hub.
  { slug: "mcp-manager", name: "MCP Manager", line: "One MCP list for Claude Code and Codex.", accent: "#78a9c2",
    url: "https://orc.tools/projects/mcp-manager", picture: { night: "mcp-manager-night.png", day: "mcp-manager-day.png" } },
  { slug: "orc-design-system", name: "Orc Design System", line: "The look every Orc thing shares.", accent: "#e69257",
    url: "https://ds.orc.tools", picture: { night: "orc-design-system-night.png", day: "orc-design-system-day.png" } },
  { slug: "orc-tokenizer", name: "Orc Tokenizer", line: "See how a prompt splits into tokens.", accent: "#d5b05c",
    url: "https://tokenizer.orc.tools", picture: { night: "orc-tokenizer-night.png", day: "orc-tokenizer-day.png" } },
];

export const games = [
  { slug: "orc-flags", name: "Orc Flags", line: "Name it. Draw it. Pin it.", accent: "#f0705c",
    url: "https://flags.orc.tools", picture: { night: "orc-flags-night.png", day: "orc-flags-day.png" } },
  { slug: "orc-rapids", name: "Orc Rapids", line: "Paddle an orc down a mountain river.", accent: "#ffb627",
    url: "https://orcrapids.com", picture: "orc-rapids.jpg" },
  { slug: "orc-survivors", name: "Orc Survivors", line: "Cleave the horde. Conquer the mire.", accent: "#e0524b",
    url: "https://survivors.orc.tools", picture: "orc-survivors.jpg" },
  { slug: "tuskhold", name: "Tuskhold", line: "One gate. Every gremlin in the world.", accent: "#e3b65e",
    url: "https://tower2.orc.tools", picture: "tuskhold.jpg" },
  { slug: "swamp-simulator", name: "Swamp Simulator", line: "Five minutes, one sword, one swamp.", accent: "#9fc3d6",
    url: "https://swamp.orc.tools", picture: "swamp-simulator.jpg" },
  { slug: "orc-shibuya", name: "Orc Shibuya", line: "Punch everyone.", accent: "#ff3b6b", adult: true,
    url: "https://shibuya.orc.tools", picture: "orc-shibuya.jpg" },
  { slug: "orc-fibs", name: "Orc Fibs", line: "Carve a fib. Throw your axe at the truth.", accent: "#e8502a",
    url: "https://fibbage.orc.tools", picture: "orc-fibs.jpg" },
  { slug: "orc-spymaster", name: "Orc Spymaster", line: "Two clans. One table. One troll under it.", accent: "#6fae4a",
    url: "https://spymaster.orc.tools", picture: "orc-spymaster.jpg" },
];
