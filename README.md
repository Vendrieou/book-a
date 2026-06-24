# Book-A 📅

**Book-A** is a general-purpose Progressive Web App (PWA) designed for seamless event booking, scheduling, and reliable user notifications. Built with an offline-first approach, it ensures users can browse, book, and manage their events regardless of their network connection.

## 🚀 Key Features

* **Offline-First Booking:** Browse available events, view schedules, and even initiate bookings without an active internet connection.
* **Smart State Management:** Powered by TanStack Query to cache data heavily, serve stale data while offline, and automatically retry failed actions when the network returns.
* **Background Synchronization:** Offline mutations (like booking an event) are queued and automatically synced with the server the moment the connection is restored.
* **Push Notifications:** Reliable web push notifications to alert users about booking confirmations, upcoming event reminders, and schedule changes.
* **Installable (PWA):** Users can install Book-A directly to their home screens on iOS, Android, and Desktop without going through an app store.

## 🛠️ Architecture & Technologies

Book-A leverages a modern React stack to deliver a robust offline state and native-like experience:

* **Framework:** [Next.js](https://nextjs.org/) (React)
* **Data Fetching & State:** [TanStack Query](https://tanstack.com/query/latest) (React Query)
    * Utilized for aggressive caching, optimistic UI updates, and offline mutation queues.
* **PWA Core:** * **next-pwa / Workbox:** For caching app shells, routing requests, and handling background sync.
    * **IndexedDB:** Integrated with TanStack Query's experimental offline persist plugins to save cache states across reloads.
    * **Web Push API:** For handling incoming notifications.
* **Backend:** Next.js API Routes / Server Actions
* **Database:** PostgreSQL / MongoDB (Prisma or Drizzle ORM recommended)

## 📦 Getting Started

### Prerequisites
* Node.js (v18+)
* npm, yarn, bun, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Vendrieou/book-a.git](https://github.com/Vendrieou/book-a.git)
   cd book-a

```

2. Install dependencies:
```bash
npm install

```


3. Set up environment variables:
Create a `.env.local` file in the root directory and add your database and VAPID keys (for push notifications).
```env
DATABASE_URL=your_database_url
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key
VAPID_PRIVATE_KEY=your_private_key

```


4. Start the development server:
```bash
npm run dev

```



## 🌐 Handling the Offline State

Book-A's offline capabilities are driven by the synergy between Service Workers and TanStack Query:

1. **Cache First:** Static assets (HTML, CSS, JS) are cached by the Service Worker on initial load.
2. **Stale-While-Revalidate:** Event lists are served instantly from TanStack Query's persistent IndexedDB cache.
3. **Offline Mutations:** When a user books offline, TanStack Query pauses the mutation, updates the UI optimistically, and uses the Background Sync API (via the Service Worker) to push the request to the server once connectivity is restored.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the TanStack Query offline sync logic or add new general-purpose booking templates, please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
```
