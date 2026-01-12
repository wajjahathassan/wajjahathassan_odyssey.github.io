# Project Context: Asan GKS Portfolio

## Overview
This is a personal portfolio website designed for a **Global Korea Scholarship (GKS)** application, specifically targeting the **Asan** region. It features a culturally inspired design ("Asan" theme) blending traditional Korean aesthetics with modern web technologies.

The application serves as a digital resume, showcasing projects, certifications, and blog posts. It includes a basic **Content Management System (CMS)** for the owner to dynamically add projects.

## Tech Stack
*   **Frontend Framework:** [React](https://react.dev/) (v18)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
    *   **Theme:** Custom colors (Asan Gold, Green, Red, Paper) and fonts (Noto Serif KR, Inter).
*   **Backend / Database:** [Firebase](https://firebase.google.com/)
    *   **Authentication:** Used for Admin access.
    *   **Firestore:** Used to store Project data.
*   **Routing:** [React Router](https://reactrouter.com/) (v6)
*   **Icons:** [Lucide React](https://lucide.dev/)

## Architecture & Key Directories

### `src/`
*   **`main.jsx`**: Application entry point. Wraps the app in `AuthProvider`.
*   **`App.jsx`**: Defines the main routing structure (`/` and `/admin`).
*   **`firebase.js`**: Firebase initialization. Exports `auth` and `db` instances. **Requires `.env` variables.**

### `src/pages/`
*   **`Home.jsx`**: The main public-facing page.
    *   **Data Fetching**: Attempts to fetch projects from Firestore. Falls back to **mock data** if the database connection fails or is empty.
    *   **Design**: Features a curved hero section and scroll-triggered animations.
*   **`Admin.jsx`**: The CMS dashboard.
    *   **Authentication**: Protected by a login form (Firebase Auth).
    *   **Functionality**: Allows adding new projects to the Firestore `projects` collection.

### `src/context/`
*   **`AuthContext.jsx`**: Manages the authentication state (`currentUser`). Designed to fail gracefully (non-blocking) if Firebase config is missing.

### `src/components/`
*   **`ProjectCard.jsx`**: Reusable component for displaying portfolio items.
*   **`Navbar.jsx`, `Footer.jsx`, `Chatbox.jsx`**: Layout and utility components.

## Configuration
*   **`tailwind.config.js`**: Contains the custom color palette (`asan-gold`, `asan-green`, etc.) and font configuration.
*   **`vite.config.js`**: Standard Vite React configuration.

## Environment Variables
The application relies on a `.env` file for Firebase configuration. Ensure these variables are set for full functionality:
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Development Workflow

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```
Access the app at `http://localhost:5173`.

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Conventions
*   **Resilience**: The application is built to function partially even without a valid backend connection (using mock data in `Home.jsx`).
*   **Styling**: Use Tailwind utility classes for layout and spacing. Use the custom theme colors (`bg-asan-green`, `text-asan-gold`) to maintain the brand identity.
