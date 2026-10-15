# FitZone Fitness Studio

A modern, responsive, single-page website for **FitZone Fitness Studio**, built with pure HTML5 and CSS3 (no JavaScript, no external frameworks or libraries).

---

##  Features

- **Pure HTML5 & CSS3**: 100% vanilla implementation with zero JavaScript and no CSS frameworks (no Bootstrap, Tailwind, etc.).
- **Semantic HTML5 Landmarks**: Built using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<address>`, `<table>`, and `<footer>` for maximum accessibility and SEO structure.
- **Strict Heading Hierarchy**: Contains exactly one `<h1>` in the Hero section (`Build Strength. Become Stronger.`), with section titles using `<h2>` and card headers using `<h3>`.
- **Working Navigation Links**: Header anchor links smoothly scroll to each section with fixed-header clearance (`scroll-margin-top`).
- **Global `box-sizing: border-box` & CSS Custom Properties**: Consistent box model globally with custom CSS variables (`:root`) managing the color palette and design tokens.
- **Real Use of Flexbox & CSS Grid**:
  - **Flexbox**: Navigation bar, price alignment, checklist items with custom checkmarks, card vertical distribution, and footer layout.
  - **CSS Grid**: About section 2-column layout, feature cards, Trainer Bio 3-column grid, Membership Plans 3-column grid, and contact details list.
- **Responsive & Zero Horizontal Scroll**: Fully responsive across mobile, tablet, and desktop devices without horizontal overflow. Tables feature a dedicated touch-friendly scroll container on small screens.
- **Pure CSS Mobile Navigation**: Mobile hamburger menu powered entirely through the CSS checkbox hack (`#nav-toggle:checked ~ .nav-menu`).

---

##  Page Sections

1. **Header & Navigation**: Brand logo with neon lime accent and anchor navigation links.
2. **Hero Section**: High-impact headline with neon accents, supporting mission statement, and full-width container divider rule.
3. **About Section**: Brand philosophy, "Explore Membership" CTA, and feature highlight cards (*Expert Trainers* & *Supportive Community*).
4. **Class Schedule Section**: Centered section heading with left-aligned session schedule table (Class, Day, Time, Trainer, Level).
5. **Trainer Bio Section**: 3-card grid highlighting dedicated trainers (James Carter, Sarah Mitchell, and Daniel Brooks) with photos, roles, bios, and direct contact emails.
6. **Membership Plans Section**: 3-tier pricing grid (*Basic*, *Standard*, *Premium*) with feature checklists and call-to-action buttons.
7. **Contact / Footer Section**: Direct contact channels (Email, Phone, Address) and studio copyright.

---

##  File Structure

```text
Assignment-Esther/
├── index.html              # Semantic single-page HTML structure
├── styles.css              # Custom CSS3 styles, variables, grid, and flexbox layouts
├── README.md               # Project documentation
└── images/
    ├── james-carter.png    # Strength Training trainer image
    ├── sarah-mitchell.png  # Group Fitness trainer image
    └── daniel-brooks.png   # Personal Training trainer image
```

---

##  How to View

1. **Directly in Browser**: Double-click `index.html` or open it with your preferred web browser (Chrome, Safari, Firefox, Edge).
2. **Local Development Server**:
   ```bash
 
    http.server 8000
   ```
   Open `http://localhost:8000` in your browser.

