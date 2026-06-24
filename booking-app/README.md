# PWA Booking & Reservation App

A modern, installable Progressive Web Application for managing appointments and bookings. Built with React 19, TypeScript, Vite, TanStack Query, Convex, and Tailwind CSS.

## 🎯 Features

### Customer Features
- **Browse Services**: View available services with descriptions and durations
- **Real-time Availability**: Date & time picker showing live available slots
- **Easy Booking**: Simple booking form with name, email, and notes
- **My Bookings**: View upcoming and past bookings (requires sign-in)
- **Cancel Bookings**: Cancel upcoming bookings directly from the dashboard
- **PWA Support**: Installable on mobile and desktop devices

### Admin Features
- **Admin Dashboard**: Manage all aspects of the booking system
- **Service Management**: Add, edit, or delete services (name, duration, description)
- **Availability Management**: Set weekly schedule with customizable days and hours
- **Booking Management**: View all upcoming/past bookings
- **Booking Actions**: Cancel or mark bookings as complete

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.7
- **Language**: TypeScript 6.0
- **Build Tool**: Vite 8.1
- **State Management**: TanStack Query (React Query) 5.101.1
- **Backend/Database**: Convex 1.42.0
- **Styling**: Tailwind CSS 4.3.1
- **Date Handling**: date-fns 4.4.0
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
booking-app/
├── public/
│   ├── favicon.svg          # App favicon
│   ├── icons.svg            # Icon sprite sheet
│   └── icons/               # PWA icons directory
├── src/
│   ├── assets/              # Static assets
│   ├── components/          # Reusable UI components
│   │   ├── BookingCard.tsx  # Booking display component
│   │   ├── BookingForm.tsx  # Booking form component
│   │   ├── DateTimePicker.tsx # Date/time slot selector
│   │   └── ServiceCard.tsx  # Service listing component
│   ├── context/             # React context providers
│   ├── pages/               # Page components
│   │   ├── AdminPage.tsx    # Admin dashboard
│   │   ├── AuthPage.tsx     # Authentication page
│   │   ├── BookingPage.tsx  # Main booking flow
│   │   └── MyBookingsPage.tsx # User's bookings
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── App.tsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── convex/                  # Convex backend functions (to be added)
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Convex account (for backend/database)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd booking-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up Convex:
```bash
npx convex dev
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run Oxlint for code quality |

## 🎨 Design System

- **Primary Color**: Deep Navy (#1e3a5f)
- **Accent Color**: Warm Orange/Coral
- **Typography**: Modern sans-serif
- **Theme**: Clean, professional, and trustworthy

## 🔐 Authentication

The app uses Hercules Auth (via Convex) for user authentication:
- Customers must sign in to book appointments
- First user or manually assigned users can have admin role
- Protected routes for admin dashboard and personal bookings

## 📱 PWA Features

- **Installable**: Can be installed on mobile and desktop devices
- **Offline Support**: Offline-friendly shell with service worker
- **App Manifest**: Configured for native-like experience
- **Responsive Design**: Mobile-first responsive layout

## 🗄️ Database Schema (Convex)

The app uses Convex for real-time data synchronization:

- **Users**: User profiles and roles
- **Services**: Available bookable services
- **Availability**: Admin-defined available time slots
- **Bookings**: Customer appointments and status

## 📝 Milestones

- [x] Milestone 1: Core Booking Flow
- [x] Milestone 2: Admin Dashboard
- [x] Milestone 3: Customer Account & My Bookings
- [x] Milestone 4: PWA Support

## 🔧 Configuration

### Tailwind CSS

Tailwind CSS v4 is configured with custom theme colors in `tailwind.config.js`.

### TypeScript

Strict TypeScript configuration is set up in `tsconfig.json` with path aliases.

### Oxlint

Code quality is enforced using Oxlint. To enable type-aware rules, update `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Convex](https://convex.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/)
