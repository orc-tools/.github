# .github for Orc Tools

The organization profile shown at [github.com/orc-tools](https://github.com/orc-tools).
GitHub reads it from `profile/README.md` in this public repository.

- `profile/README.md`: the page.
- `profile/img/`: its pictures, each in a day and a night version. GitHub shows
  the one that matches the reader's theme.
- `art/`: how the pictures are made. `art/products.mjs` holds the tools and
  games, with the names, lines and links the orc.tools hub uses.

## Redrawing the pictures

GitHub strips styling from a README, so each tile's name and line are drawn
into its picture. After changing `art/products.mjs` or `art/src/`:

```bash
NODE_PATH=<a node_modules with playwright> node art/render.mjs
```

It needs Playwright with Chromium and `cwebp`. Then update the tiles in
`profile/README.md` to match.
