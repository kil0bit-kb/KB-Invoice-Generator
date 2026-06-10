# 🧾 KB Invoice Generator

A premium, lightning-fast native desktop application for generating professional invoice PDFs, built using **Tauri v2**, **Vite**, and **Vanilla TypeScript**.

KB Invoice Generator allows users to design, edit, and export beautiful, print-ready invoices directly from a clean desktop interface. It is designed to run completely offline with no external tracking or cloud requirements.

---

## ✨ Key Features

* ✍️ **Direct Inline Editing**: Click and type directly on the live A4 paper invoice preview. Layout dimensions, margins, and alignments adjust dynamically.
* 📈 **Auto-Growing Text Fields**: Address and notes areas grow automatically as you type to prevent scrollbars or text cutting off in the final PDF.
* 🎨 **Dynamic Accent Color Picker**: Choose a brand theme color from swatches or a custom color picker. Table columns, titles, borders, and totals style colors adapt instantly.
* 🛠️ **Deep Customization Toggles**: Hide or show individual sections (e.g. Logo, Client Address, Shipping Charge, Bank Block, Routing Codes, Payment Terms, Notes) via simple sidebar checkboxes.
* ↕️ **Drag-and-Drop Reordering**: Rearrange invoice line items dynamically using visual drag handles (`⋮⋮`). Totals are recalculated instantly.
* 💾 **Local Backups (JSON)**: Export your invoice settings and drafts to a local `.json` file and import it back at any time to resume editing.
* 🔄 **Calculations Engine**: Real-time calculations of subtotal, tax %, discount %, shipping, and grand totals.
* 🖨️ **Print-to-PDF Ready**: Strips away all editor panels, action buttons, drag handles, and borders on print. Suppresses default browser print headers (date/time/title) and footers (URL/page numbers) automatically for a clean, clean PDF document.

---

## 🚀 Tech Stack

* **Frontend**: HTML5, Vanilla TypeScript, CSS3 Custom Variables (Vanilla CSS)
* **Desktop Container**: [Tauri v2](https://tauri.app/) (Rust-backed native wrapper)
* **Build Tool**: [Vite](https://vite.dev/)

---

## 📂 Project Structure

```
├── .gitignore               # Files ignored by git (dist, node_modules, etc.)
├── index.html               # Main application template viewport
├── package.json             # NPM package scripts and dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite bundler configurations
├── icon.png                 # App icon source image
├── src/
│   ├── assets/              # Static frontend assets (icons, images)
│   ├── data.ts              # Default invoice data and calculations
│   ├── main.ts              # DOM Controller, Event Bindings & State Sync
│   ├── styles.css           # UI layout and print media style rules
│   ├── templates.ts         # Invoice structural rendering templates (Modern & Classic)
│   ├── types.ts             # TypeScript interface definitions
│   └── vite-env.d.ts        # Vite environment asset declarations
└── src-tauri/
    ├── Cargo.toml           # Rust package manifest
    ├── tauri.conf.json      # Tauri app configuration (Window settings, bundle, icons)
    ├── build.rs             # Tauri compilation builder
    ├── capabilities/        # Desktop window permission sets
    └── icons/               # Generated desktop launcher app icons
```

---

## 🛠️ Installation & Setup

To run or build this application locally, you will need to set up the [Tauri Prerequisites](https://v2.tauri.app/start/prerequisites/).

### 1. Prerequisites (Windows)
* Install **[Node.js](https://nodejs.org/)** (LTS recommended)
* Install **[Rust](https://www.rust-lang.org/)** (via rustup)
* Install **Build Tools for Visual Studio** (with the C++ build tools workload)

### 2. Install Dependencies
Clone the repository and run:
```bash
npm install
```

### 3. Development Server
To launch the frontend live-reload server alongside the Tauri native desktop window:
```bash
npm run tauri dev
```

### 4. Build Production Installer
To clean compile and package the application into a standalone Windows installer (`.exe` and `.msi` setup bundles):
```bash
npm run tauri build
```
Once complete, the built installers will be located at:
`src-tauri/target/release/bundle/`

---

## 📄 License

This project is licensed under the MIT License.
