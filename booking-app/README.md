# PWA Booking & Reservation App

A modern, installable Progressive Web Application for managing appointments and bookings. Built with React 19, TypeScript, Vite, TanStack Query, Convex, and Tailwind CSS.

## 🎯 Features

### Core Booking (Milestone 1) ✅
- **Service Listing**: View services with duration, price, and buffer time
- **Real-time Availability**: Date & time picker showing live available slots with buffer time support
- **Easy Booking**: Simple booking form with name, email, and notes
- **Instant Confirmation**: Immediate booking confirmation
- **LocalStorage Persistence**: Data persists across sessions

### Admin Dashboard (Milestone 2) ✅
- **Admin Dashboard**: Manage all aspects of the booking system
- **Service Management**: Add, edit, or delete services with:
  - Name, description, duration
  - Price tracking
  - **Buffer time configuration** - Time between appointments for cleaning/preparation
- **Availability Management**: Set weekly schedule with customizable days and hours
- **Booking Management**: View all upcoming/past bookings
- **Booking Actions**: Cancel or mark bookings as complete
- **Reminder Tracking**: See which bookings have had reminders sent

### Customer Account & My Bookings (Milestone 3) ✅
- **Sign-in Required**: Hercules Auth integration ready
- **My Bookings**: View upcoming and past bookings
- **Cancel Bookings**: Cancel upcoming bookings directly from the dashboard
- **Waitlist Enrollment**: Join waitlist for fully booked slots

### PWA Support (Milestone 4) ✅
- **Installable**: Works on mobile and desktop devices
- **App Manifest**: Proper PWA manifest configuration
- **Icons**: Complete icon set for all platforms
- **Offline Shell**: Basic offline functionality

### Advanced Features (NEW!) 🚀
- **Buffer Times**: Configurable gap between appointments to prevent overlap and allow preparation time
- **Smart Waitlist**: Automatic notification system when cancellations occur
- **Recurring Bookings**: Support for repeating appointments (e.g., weekly sessions)
- **Automated Reminders**: Track and send appointment reminders to reduce no-shows
- **Enhanced Slot Calculation**: Intelligent time slot generation that accounts for service duration + buffer time

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
│   │   ├── AuthContext.tsx  # Authentication context
│   │   └── BookingContext.tsx # Booking state management
│   ├── pages/               # Page components
│   │   ├── AdminPage.tsx    # Admin dashboard with buffer time support
│   │   ├── AuthPage.tsx     # Authentication page
│   │   ├── BookingPage.tsx  # Main booking flow
│   │   └── MyBookingsPage.tsx # User's bookings
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # All type definitions (Service, Booking, Waitlist, etc.)
│   ├── utils/               # Utility functions
│   │   ├── cn.ts            # Class name utility
│   │   └── dateUtils.ts     # Date/time utilities with buffer time calculation
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

## 🎨 Design System

### Colors
- **Primary**: Deep Navy (#1a365d) - Trustworthy, professional
- **Accent**: Warm Gold/Orange - Friendly, inviting
- **Background**: Clean whites and light grays
- **Text**: High contrast for readability

### Typography
- Modern sans-serif font stack
- Clear hierarchy with proper sizing
- Optimized for mobile and desktop

## 🔐 Authentication

The app is designed to work with Hercules Auth. Currently using mock authentication for development. To enable real authentication:

1. Set up Hercules Auth in your project
2. Update `src/context/AuthContext.tsx` with real auth logic
3. Protect routes requiring authentication

## 📱 PWA Configuration

To make the app installable:

1. Ensure `manifest.json` is properly configured in `public/`
2. Register service worker in `main.tsx`
3. Generate icons for all required sizes
4. Test installation on mobile and desktop

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run Oxlint linter

## 📊 Database Schema (Convex)

The app uses Convex for real-time data synchronization. Key collections:

- **users**: User accounts and roles
- **services**: Available services with duration and buffer times
- **bookings**: Customer appointments
- **availabilities**: Weekly schedule configuration
- **waitlist**: Customers waiting for cancelled slots
- **recurringBookings**: Repeating appointment patterns
- **reminders**: Appointment reminder tracking

## 🚧 Next Steps

1. **Convex Integration**: Replace localStorage with Convex backend
2. **Email Notifications**: Integrate email service for reminders and waitlist
3. **Calendar Sync**: Add Google/Apple Calendar integration
4. **Payment Processing**: Integrate Stripe for paid services
5. **Multi-staff Support**: Extend to support multiple service providers

## 📝 License

MIT License - feel free to use this template for your projects!
