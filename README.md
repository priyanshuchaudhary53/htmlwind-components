# Htmlwind Components

Free, open-source Tailwind CSS UI components. Copy-paste ready.

## Browse online

→ [htmlwind.com](https://htmlwind.com)

## Run locally

**Requirements:** Node.js 18+

```bash
git clone git@github.com:priyanshuchaudhary53/htmlwind-components.git
cd htmlwind-components

npm install
node scripts/generate-catalog.mjs   # builds catalog.json (sidebar index)
npm run build                        # compiles Tailwind CSS once

npm run dev                          # starts preview server + Tailwind watcher
```

Open [http://localhost:3000](http://localhost:3000) to browse all components.

To preview a single component directly:
```
http://localhost:3000/hero-sections/centered.html
```

## Contributing

1. Fork this repo
2. Add or edit an HTML file in the relevant category folder (e.g. `hero-sections/my-hero.html`)
3. Run `npm run dev` locally to check it renders correctly
4. Open a pull request — keep each PR to a single component or category

**Adding a new category:** Create a new folder with a kebab-case name (e.g. `data-tables/`), add your HTML files, then run `node scripts/generate-catalog.mjs` to refresh the sidebar.

## File structure

```
htmlwind-components/
├── alerts/                     ← component HTML files
├── hero-sections/
├── footers/
├── ...                         ← 23 categories total
├── _dev/
│   ├── index.html              ← component browser UI
│   └── server.mjs              ← local preview server
├── scripts/
│   └── generate-catalog.mjs   ← builds catalog.json
├── src/
│   └── app.css                 ← Tailwind CSS input
├── catalog.json                ← auto-generated, committed
├── package.json
├── tailwind.config.js
└── .gitignore
```

## License

MIT
