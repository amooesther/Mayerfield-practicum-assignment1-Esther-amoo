# FitZone Fitness Studio — React + Tailwind Rebuild

A responsive, single-page web application for **FitZone Fitness Studio**, built with **React 19**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features & Requirements

- **Single Central Data File (`src/data.js`)**:
  - All listed items (`trainers`, `schedule`, `plans`, and `aboutFeatures`) are structured as arrays of objects in one central data file.
  - Zero copy-pasted JSX: all cards, schedule rows, pricing tiers, and feature cards are dynamically rendered using `.map()`.
- **Real Filter on Main Grid (`useState`)**:
  - The Trainer Bio section features an interactive category filter (`All`, `Strength`, `Group`, `Personal`) powered by React's `useState`.
  - Filter buttons provide active visual states and real-time list filtering with accessible ARIA tags (`role="group"`, `aria-pressed`).
- **Controlled Components Reused per Item**:
  - **`QuantityStepper.jsx`**: Controlled numeric stepper (`value` + `onChange`) for booking weekly trainer sessions, with min/max clamps and disabled states.
  - **`StarRating.jsx`**: Controlled 5-star rating component (`value` + `onChange`) for rating trainers, storing state per item ID in the parent component.
- **Pure CSS Responsive Navigation**:
  - Mobile hamburger menu toggles smoothly with a CSS checkbox hack and Tailwind transitions (no JavaScript required for menu open/close).
  - Smooth-scrolling navigation with sticky header and section offset clearance (`scroll-margin-top`).
- **Tailwind Design System**:
  - Custom dark-mode color palette:
    - Page background: `#101010`
    - Card background: `#1c1c1c`
    - Accent / Neon lime: `#c8ff00`
    - Borders & Dividers: `#282828` / `#222222`
  - Typography: Clean `Inter` font stack.
- **Semantic HTML5 Landmarks**:
  - Structured with `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<address>`, `<table>`, and `<footer>` for maximum accessibility and SEO structure.

---

## 📁 File Structure

```text
Assignment-Esther/
├── index.html                  # HTML entry point with Vite module script
├── package.json                # Project dependencies and npm scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration with custom theme
├── README.md                   # Project documentation
├── public/
│   ├── favicon.svg             # Favicon
│   └── images/                 # Trainer photos served at root
│       ├── daniel-brooks.png
│       ├── james-carter.png
│       └── sarah-mitchell.png
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Main layout and top-level state management
    ├── index.css               # Tailwind directives and global styles
    ├── data.js                 # Central source of truth (arrays of objects)
    ├── data/                   # Modular re-exports
    │   ├── plans.js
    │   ├── schedule.js
    │   └── trainers.js
    └── components/
        ├── Header.jsx          # Sticky header with CSS hamburger toggle
        ├── Hero.jsx            # Hero section with primary CTA
        ├── About.jsx           # Studio philosophy and feature highlight cards
        ├── ClassSchedule.jsx   # Responsive class timetable
        ├── TrainerBio.jsx      # Main grid with category filter & trainer cards
        ├── MembershipPlans.jsx # 3-tier membership pricing cards
        ├── QuantityStepper.jsx # Controlled session booking stepper per trainer
        ├── StarRating.jsx      # Controlled 5-star rating per trainer
        └── Footer.jsx          # Contact details, address, and studio copyright
```

---

## 🛠️ Technology Stack

- **React 19**
- **Vite**
- **Tailwind CSS v3**
- **PostCSS & Autoprefixer**

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

### Installation

```bash
npm install
```

### Development Server

To start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open the printed URL (typically `http://localhost:5173`) in your browser.

### Production Build

To compile and bundle the application for production:

```bash
npm run build
```

The production output will be generated in the `dist/` directory.

### Preview Production Build

To test the compiled production build locally:

```bash
npm run preview
```
