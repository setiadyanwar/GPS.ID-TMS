# GPS.ID TMS Dashboard

A modern Transportation Management System (TMS) Dashboard built for GPS.ID. This application allows users to securely log in, monitor real-time vehicle statuses, manage fleet operations, and view detailed telemetry data (Speed, ACC, Location, etc.).

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **UI Components:** [Sonner](https://sonner.emilkowal.ski/) (Toasts), [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

## 🏗️ Architecture & Patterns

This project strictly follows a **Feature-Sliced Design / Domain-Driven Design (DDD)** approach to ensure maximum scalability and maintainability.

- `src/app/` - Global routing (`App.tsx`), layout wrappers, and Route Guards (`ProtectedRoute.tsx`).
- `src/pages/` - Core domain features (e.g., `Login`, `VehicleList`). Each feature encapsulates its own `api`, `components`, `hooks`, `utils`, and `service` to prevent business logic leakage.
- `src/shared/` - Reusable cross-domain elements:
  - `ui/` - Abstracted UI components (Adapter Pattern applied, e.g., `Toast`, `Card`, `Tooltip`).
  - `store/` - Global states (Session, Search) using Zustand.
  - `api/` - Axios interceptors and central HTTP configurations.
- `src/widgets/` - Standalone complex layout components like `Sidebar` and `Dashboard`.

## ✨ Key Features

- **Authentication System:** Secure login flow with global session state (Zustand) and Protected Route interception.
- **Dynamic Status Calculation:** Pure utility functions calculate real-time vehicle status (`Running`, `Stop`, `Parking`) strictly based on ACC and Speed metrics.
- **Robust Error Handling:** Unified API error interception mapped to user-friendly global toast notifications.
- **Responsive Layout:** Sidebar navigation with smooth transition animations tailored for desktop and mobile viewports.
- **Search & Query:** Client/Server synchronized state management for robust vehicle querying.

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Copy the example environment file and configure your API Base URL.
```bash
cp .env.example .env
```
*(Open `.env` and ensure `VITE_API_BASE_URL` is correctly set).*

3. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

---
*Developed as part of the GPS.ID Frontend Developer 💖 Technical Test.*
