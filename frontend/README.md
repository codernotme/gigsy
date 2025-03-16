# Gigsy Frontend

This is the frontend for **Gigsy** - a campus-focused freelancing and collaboration platform that empowers students through project opportunities, event participation, and rewards.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📚 Key Features

The Gigsy frontend implements these core functionalities:

- **Authentication & Access:** Login, registration, and campus ambassador verification
- **Project Browsing & Bidding:** Find projects and place bids using your bid allocation
- **Gigbits System:** View and earn platform tokens through various activities
- **Event Management:** Discover and register for campus events
- **Leaderboards:** Track top performers and your own ranking
- **User Profiles:** Showcase your skills, projects, and Gigbits

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS 4
- **Language:** TypeScript
- **State Management:** React Context API + SWR for data fetching
- **Other Tools:** ESLint, PostCSS

## 📂 Project Structure

```
gigsy/frontend/
├── app/               # Next.js App Router
│   ├── (auth)/        # Authentication routes (login, register)
│   ├── dashboard/     # User dashboard pages
│   ├── projects/      # Project browsing and management
│   ├── events/        # Event listings and registration
│   ├── leaderboard/   # Performance tracking
│   └── profile/       # User profiles
├── components/        # Shared React components
├── lib/               # Utilities, hooks, and helpers
└── public/            # Static assets
```

## 🌟 Contributing

We welcome contributions! Please check out our contribution guidelines in the root repository.

## 📜 License

Gigsy is licensed under the MIT License. See the LICENSE file for details.
