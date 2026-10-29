# Kishor Gogoi — QA Engineering Portfolio

An interactive React portfolio for showcasing QA engineering experience, software testing projects, automation skills, certifications, and professional contact information.

The site is designed as a recruiter-friendly presentation of practical quality engineering work. It combines an editorial portfolio layout with interactive testing demonstrations, project case studies, technical skill visualizations, and a browsable 3D certification registry.

## Contents

- [Overview](#overview)
- [Key features](#key-features)
- [Technology stack](#technology-stack)
- [Architecture and project structure](#architecture-and-project-structure)
- [Prerequisites](#prerequisites)
- [Installation and setup](#installation-and-setup)
- [Usage guide](#usage-guide)
- [Testing and validation](#testing-and-validation)
- [Deployment](#deployment)
- [Security and limitations](#security-and-limitations)
- [Potential improvements](#potential-improvements)
- [Contributing](#contributing)
- [Author and links](#author-and-links)

## Overview

This project is a single-page professional portfolio for **Kishor Gogoi**, focused on manual testing, test automation, software quality, and full-stack engineering projects.

It helps recruiters and engineering teams:

- Review QA engineering capabilities and technical tooling.
- Explore software projects and their technology stacks.
- Run a client-side validation demonstration in the interactive QA Lab.
- Browse verified credentials and open available certificate documents.
- Download and preview role-specific resumes.
- Contact Kishor through email, LinkedIn, or GitHub.

The application is a static frontend. It does not expose a custom backend API or persist user data.

## Key features

- Responsive single-page portfolio with fixed navigation and section anchors.
- Introductory hero and professional profile presentation.
- Experience and education sections.
- Interactive project and case-study catalogue, including repository links and test-suite details where available.
- Technical expertise section with filterable skill categories and grid/sphere visualizations.
- Interactive QA Lab with:
  - Email and password validation scenarios.
  - Remember-me behavior.
  - Individual test execution.
  - Run-all and reset controls.
  - Assertion results and execution logs.
- 3D certification book with:
  - Scroll-driven page-turn interaction.
  - Previous/next certificate controls.
  - Responsive mobile behavior.
  - Certificate detail modal and available PDF documents.
- Resume library with multiple QA-focused resume PDFs.
- Recruiter summary view for quickly reviewing skills, experience, projects, and certifications.
- Contact section with working email, LinkedIn, GitHub, availability, and clipboard copy behavior.
- Responsive navigation drawer and a draggable floating cloud mascot.
- Reduced-motion support in selected animated experiences.

## Screenshots and live demo

No repository screenshots or verified deployment URL are currently configured.

For a stronger public project presentation, consider adding:

- A desktop screenshot of the hero and navigation.
- A mobile screenshot of the responsive portfolio layout.
- A screenshot of the QA Lab showing test results.
- A screenshot of the 3D certification book and certificate controls.

Do not add a live demo URL until a deployed portfolio URL has been confirmed.

## Technology stack

### Frontend

- React 19
- React DOM 19
- Vite 8
- Tailwind CSS 4 through `@tailwindcss/vite`
- Framer Motion
- Motion
- Lucide React

### 3D and interaction

- Three.js
- React Three Fiber
- React Three Drei
- Canvas-generated certificate textures
- Browser APIs including `IntersectionObserver`, `Clipboard API`, and `local scroll/navigation APIs`

### Development and quality tooling

- ESLint 10
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- Vite production bundler

### External resources

- Google Fonts: Space Grotesk, Inter, JetBrains Mono, Playfair Display, and Cormorant Garamond.
- Linked project repositories and project-specific external links defined in the source.

There is no backend service, database, authentication service, or required environment-variable integration in this repository.

## Architecture and project structure

The application is a client-rendered React single-page application. `App.jsx` composes the portfolio sections and owns the state for shared overlays such as the preloader, resume modal, recruiter view, and test-suite modal.

```text
.
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── certificates/       # Certificate PDF documents
│   ├── cv/                 # Resume PDF documents
│   ├── favicon.svg
│   └── mascot/             # Mascot static assets
└── src/
    ├── App.jsx             # Root composition and shared modal state
    ├── main.jsx            # React entry point
    ├── index.css           # Global styles and section-specific styles
    ├── visual-system.css   # Shared visual system overrides
    ├── assets/             # Images and bundled static assets
    └── components/
        ├── Hero.jsx
        ├── Navbar.jsx
        ├── Sidebar.jsx
        ├── TestPlan.jsx
        ├── BeyondTheConsole.jsx
        ├── Education.jsx
        ├── CoverageReport.jsx
        ├── PipelineRuns.jsx
        ├── QALab.jsx
        ├── QualityGates.jsx
        ├── CertBookCanvas.jsx
        ├── Deploy.jsx
        ├── ResumeModal.jsx
        ├── RecruiterView.jsx
        ├── TestSuiteModal.jsx
        ├── CloudMascot.jsx
        └── ...              # Supporting UI and visualization components
```

### Main data flow

1. `src/main.jsx` mounts `App` into the root DOM element.
2. `App.jsx` renders the page sections in portfolio order.
3. Section components manage local interaction state, animations, and browser events.
4. `QualityGates.jsx` supplies certificate metadata to `CertBookCanvas.jsx`, which renders the interactive Three.js book.
5. `PipelineRuns.jsx` supplies project metadata and opens `TestSuiteModal.jsx` for project-specific test-suite views.
6. Resume and recruiter actions open modal views without a route change.
7. Static files under `public/` are served from the site root, such as `/certificates/...` and `/cv/...`.

## Prerequisites

- Node.js with npm. The repository does not declare an `engines` field; use a current maintained Node.js LTS release compatible with Vite 8.
- A modern browser with JavaScript enabled.
- WebGL support is recommended for the 3D certification and skills experiences. The rest of the portfolio remains usable without interacting with those visualizations.

## Installation and setup

### 1. Clone the repository

```bash
git clone https://github.com/KISHOR403/3D-Portfolio.git
cd 3D-Portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

No environment variables are required for the current implementation. No `.env` or `.env.example` file is needed to run the portfolio locally.

### 4. Start the development server

```bash
npm run dev
```

Vite will print the local URL, normally:

```text
http://localhost:5173
```

### 5. Verify the application

Open the printed URL in a modern browser and verify that:

- The preloader completes and the portfolio sections render.
- Navigation anchors move to the expected sections.
- The QA Lab accepts input and displays test results.
- Certificate navigation and available PDF actions work.
- Resume and recruiter modals open.
- Contact links point to the configured email, LinkedIn, and GitHub destinations.

## Usage guide

### Navigate the portfolio

Use the fixed navigation or mobile menu to jump to Experience, Projects, QA Lab, Skills, Certifications, and Contact.

### Explore projects

Open a project repository or demo from the Projects section. Where available, use the test-suite action to inspect the project's documented testing information.

### Run the QA Lab

1. Enter values in the demo login fields.
2. Run an individual validation or run all available scenarios.
3. Review pass/fail results and the execution log.
4. Use **Reset** to clear the form and test state.

The QA Lab is a browser-side demonstration. It does not authenticate against a real account or service.

### Browse certifications

Scroll through the certification section to turn the 3D book pages, or use the previous/next controls. Select **View Official Document (PDF)** when a PDF is available for the active credential.

### Review resumes

Use the resume action in the navigation or recruiter view to select and preview one of the role-specific PDF resumes under `public/cv/`.

### Contact

The contact section provides:

- Email: `kishorgogoi403@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/kishorgogoi/`
- GitHub: `https://github.com/KISHOR403`

The email row also provides a clipboard copy action when supported by the browser.

## Testing and validation

The repository currently provides linting and production-build scripts, but no dedicated unit, integration, or end-to-end test runner is configured in `package.json`.

### Production build

```bash
npm run build
```

This creates the Vite production output in `dist/`.

### Preview the production build

```bash
npm run preview
```

Open the local URL printed by Vite.

### ESLint

```bash
npm run lint
```

This runs ESLint across the repository. At the time of documentation, the command reports existing issues in legacy/supporting source files; it should be treated as a quality check that still needs cleanup rather than as a passing CI gate.

For a focused check of a component:

```bash
npx eslint src/components/Deploy.jsx
```

## Deployment

No hosting provider or deployment configuration is committed to this repository.

Because this is a Vite static frontend, a generic deployment workflow is:

```bash
npm install
npm run build
```

Publish the generated `dist/` directory using a static hosting provider such as Vercel, Netlify, GitHub Pages, or an equivalent platform. Configure the provider's build command as `npm run build` and its output directory as `dist`.

The final public URL should be added to this README only after deployment has been completed and verified.

## Security and limitations

- The QA Lab is a client-side demonstration and must not be used for real credentials.
- The portfolio does not implement authentication, authorization, server-side validation, or data persistence.
- External project, LinkedIn, GitHub, and font requests depend on network availability.
- The 3D sections depend on browser WebGL support and may require reduced-motion or performance adjustments on lower-powered devices.
- PDF files in `public/` are directly addressable static assets.
- Do not add credentials, API keys, private certificates, or other sensitive files to the repository.

## Potential improvements

The following are potential improvements, not currently implemented features:

- Add a verified deployed portfolio URL and curated screenshots.
- Add automated component and browser-level tests for the QA Lab, navigation, modals, and contact actions.
- Resolve the remaining repository-wide ESLint findings and add linting to CI.
- Add performance budgets or lazy loading for heavier 3D experiences.
- Add a deployment workflow with build verification.
- Add a confirmed open-source license if the repository is intended for external reuse.

## Contributing

This repository is primarily a personal portfolio. If you want to propose a change:

1. Fork the repository.
2. Create a focused branch.
3. Make the smallest change that addresses the issue.
4. Run `npm run build` and the relevant ESLint command.
5. Open a pull request describing the change and validation performed.

Avoid committing generated `dist/` output, dependency directories, credentials, or personal documents that are not intended to be public.

## License

No license file or confirmed open-source license is currently present in the repository. All rights remain with the repository owner unless a license is added.

## Author and links

**Kishor Gogoi**

- Email: [kishorgogoi403@gmail.com](mailto:kishorgogoi403@gmail.com)
- LinkedIn: [linkedin.com/in/kishorgogoi](https://www.linkedin.com/in/kishorgogoi/)
- GitHub: [KISHOR403](https://github.com/KISHOR403)
- Repository: [KISHOR403/3D-Portfolio](https://github.com/KISHOR403/3D-Portfolio)
