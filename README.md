# My Portfolio Frontend
> **Part of a MERN stack application:** MongoDB, Express, React, Node.js

> **Backend Repository:** [github.com/jumaber/portfolio\_backend](https://github.com/jumaber/portfolio_backend)


[![Vite](https://img.shields.io/badge/bundler-vite-blue)]() [![React](https://img.shields.io/badge/framework-react-61dafb)]() [![TailwindCSS](https://img.shields.io/badge/style-tailwindcss-38b2ac)]() [![License: MIT](https://img.shields.io/badge/license-MIT-green)]()

An interactive, Vite-powered React portfolio site with the following features:

* Static pages (Home, Impressum) sourcing content dynamically from the backend
* Dynamic project content from a headless API 
* Firebase authentication for secure access
* Drag-to-reorder project cards to control featured order on the Home page (powered by @dnd-kit)
* Rich-text content blocks via Editor.js for flexible page editing
* Cloudinary image hosting for optimized media delivery
* Stylized toast notifications with react-hot-toast
* Integrated analytics via Google Analytics (Looker Studio)



---

## Tech Stack

* [React](https://reactjs.org/) (with Vite)
* [Tailwind CSS](https://tailwindcss.com/)
* [React Router v6](https://reactrouter.com/)
* [Firebase Authentication](https://firebase.google.com/docs/auth)
* [@dnd-kit/core](https://github.com/clauderic/dnd-kit) +
  [@dnd-kit/sortable](https://github.com/clauderic/dnd-kit/tree/main/packages/sortable) +
  [@dnd-kit/utilities](https://github.com/clauderic/dnd-kit/tree/main/packages/utilities) (drag-to-reorder project cards)
* [Editor.js](https://editorjs.io/) (rich-text content blocks)
* [Cloudinary](https://cloudinary.com/) (image hosting)
* [react-hot-toast](https://github.com/timolins/react-hot-toast) (stylized toast notifications)
* [lucide-react](https://lucide.dev/) (icon library)
* [Google Analytics](https://lookerstudio.google.com/) (integrated analytics via Looker Studio)

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Available Scripts](#available-scripts)
4. [Project Structure](#project-structure)
5. [Configuration](#configuration)
6. [Usage & Screenshots](#usage--screenshots)
7. [Component Library](#component-library)
8. [Testing](#testing)
9. [Deployment](#deployment)
10. [Contributing](#contributing)
11. [License](#license)

---

### Prerequisites

* Node.js ≥ 16
* npm ≥ 8

### Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/you/portfolio-frontend.git
cd portfolio-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment**

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```ini
VITE_API_URL=https://api.your-portfolio.com
```

4. **Start development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Available Scripts

* `npm run dev` – Start Vite dev server
* `npm run build` – Bundle for production to `dist/`
* `npm run preview` – Preview production build locally
* `npm run lint` – Run ESLint
* `npm run format` – Run Prettier

---

### Project Structure

```bash
.
├── src/
│   ├── assets/               # Images, fonts, media
│   ├── components/           # Reusable UI & dashboard widgets
│   │   ├── dashboard/        # Dashboard layout, buttons and drag‑and‑drop editor
│   │   ├── edit/ 
│   │   │   └── pages/        # Components for editing text in all sorts of pages/projects
│   │   │     └── home/       # Block editor components (EditHomeAbout, EditHomeContact, etc.)
│   │   │     └── imprint/    # Block editor components (EditImprintContent)
│   │   │   └── projects/     # Block editor components (EditCard, EditHero, EditListField, etc.)
│   │   ├── home/             # Home Components (HomeIntro, CardGrid, About, etc.)
│   │   ├── pages/            # Static Pages components (TextBlock)
│   │   ├── projects/         # Dynamic Projects components (Intro, Hero, Challenge, etc.)
│   ├── pages/                # Pages (Dashboard, Home, ImprintPage, Login, SingleProject, etc.)
│   │   ├── edit/             # Pages for Editing (EditHome, EditImprint, EditPage, etc.)
│   │   ├── new/              # Pages for adding new pages or projects (NewPage, NewProject)
│   ├── firebase.js           # Firebase auth config
│   ├── App.jsx               # Root component & router setup
│   └── main.jsx              # App entry point
├── public/
│   └── index.html           # HTML template
├── .gitignore
├── README.md
├── package.json
├── tailwind.config.js
└── vite.config.js
└── _redirects

```

---

### Configuration

Provide required variables in `.env.local`:

```ini
VITE_API_URL=       # e.g. https://api.my-portfolio.com
```

---

### Usage & Screenshots

*Below are examples of the core UI:*

![Home Page Screenshot](https://res.cloudinary.com/jumaber/image/upload/v1752243902/Screenshot_2025-07-11_at_16.16.33_2_pzf5te.png)
![Dashboard Screenshot](https://res.cloudinary.com/jumaber/image/upload/v1752243902/Screenshot_2025-07-11_at_16.17.06_2_chyhop.png)
![Project Editor Screenshot](https://res.cloudinary.com/jumaber/image/upload/v1752243902/Screenshot_2025-07-11_at_16.19.22_2_phwmn1.png)


---

## Component Library

A high-level overview of your core components, grouped by functionality:

- **Common Components**:  
  Reusable UI elements like `Button`, `DefaultImage`, `Footer`, `NavBar`, `LoadingScreen`, `ScrollTracker`, and the `useProjectClickTracker` hook.

- **Dashboard & Editor**:  
  Includes the main `Dashboard` layout and block-editor components:
  `EditHome`, `EditIntro`, `EditHero`, `EditCard`, `EditListField`,  
  `EditProcess`, `EditWireframes`, `EditCustomHtml`, `EditPage`, `EditImprint`

- **Page-Level Components**:  
  Top-level pages: `Home`, `SingleProject`, `SinglePage`, `ImprintPage`,  
  `Login`, `PageNotFound`, `NewPage`, `NewProject`

- **Content Block Components**:  
  - **Home Page Blocks**: `About`, `Card`, `CardGrid`, `Contact`, `Experience`, `HomeIntro`, `TextBlock`  
  - **Project Page Blocks**: `Challenge`, `CustomHtml`, `HeroImage`, `Intro`, `Learnings`, `Outcome`, `Process`, `RelatedProjects`, `Wireframes`

---

### Testing

```bash
npm run test       # Jest + React Testing Library
npm run test:coverage
```

---

### Deployment

**Netlify**:

1. Connect your GitHub repo.
2. Set `NODE_ENV=production` and `VITE_API_URL` in the dashboard.
3. Build Command: `npm run build`
4. Publish Directory: `dist/`

---

### License

MIT © Júlia Marí Bernaus
