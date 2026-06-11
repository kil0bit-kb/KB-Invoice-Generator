# KB Invoice Generator

A offline-first desktop app for generating clean, print-ready invoice PDFs. Built on Tauri v2 + Vite + TypeScript. No cloud, no tracking, no BS.

## What it does

You pick a template, fill in your details directly on the invoice (click anything and type), and hit Export PDF. That's it. Everything happens locally.

The invoice preview is live. Change a quantity, the total updates. Toggle a section off, it disappears. Switch accent color, the whole invoice recolors instantly. No save button, no form submits.

## Features worth knowing

- **Click-to-edit everything** every field on the invoice paper is an input. Nothing is behind a form modal.
- **Live calculations** subtotal, discount %, tax %, shipping recalculate on every keystroke. Discount and tax inputs exist both on the invoice and in the sidebar and stay in sync.
- **Auto due date** set an invoice date + payment terms like "Net 30" and the due date fills itself.
- **Drag to reorder line items** grab the `⋮⋮` handle, drop anywhere.
- **Visibility toggles** 16 checkboxes to show/hide sections (logo, bank block, routing codes, client address, etc). You can also hit the `×` that appears on hover directly on the invoice.
- **Brand color** 6 presets + custom picker. Applies via CSS variable instantly, no re-render.
- **Logo upload** reads as base64, embeds directly. No external file dependency.
- **Drafts** save named drafts to `localStorage`, load or delete anytime.
- **JSON backup** export the full invoice state to a `.json` file, import it back later. The logo data is included.
- **Clean PDF output** `Ctrl+P` or Export PDF. The print stylesheet strips all editor chrome. `@page { margin: 0 }` kills browser headers/footers. The document title is set to the invoice number so the save dialog defaults to the right filename.

## Templates

Two templates ship currently:

- **Template 1 (Modern)** company on top left, invoice number top right, footer has company info + bank details side by side
- **Template 2 (Classic)** same structure but with a bold accent-colored rule under the header

Both share the same items table, calculation block, and footer logic.

## Stack

| | |
|---|---|
| Desktop | Tauri v2 (Rust) |
| Build | Vite 6 |
| Language | TypeScript 5.6 |
| Styling | Vanilla CSS + custom properties |
| PDF | `window.print()` + print stylesheet |
| Storage | localStorage + JSON file export |

No framework. No component library. The whole UI is a single `invoiceData` state object that gets rendered to an HTML string via `renderTemplate()` and injected with `innerHTML`. Fast, tiny bundle, zero overhead.

## Getting started

You need the [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/). Node.js, Rust, and on Windows the MSVC build tools.

```bash
npm install
npm run tauri dev     # dev window with hot reload
npm run tauri build   # produces .exe + .msi in src-tauri/target/release/bundle/
```

## License

MIT
