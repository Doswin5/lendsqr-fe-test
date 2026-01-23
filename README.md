# Lendsqr Frontend Assessment

## Tech Stack
- React
- TypeScript
- SCSS
- json-server (mock API)

## Setup
npm install
npm run dev:all

## Features Implemented
- Login, Dashboard, Users, User Details pages
- Paginated users list with 500 records
- Status updates with optimistic UI
- User details persisted via localStorage
- Fully responsive layout

## Architectural Decisions
- Custom hooks for data fetching (useUsers, useUserStats)
- json-server wrapper to expose X-Total-Count for pagination
- Separation of UI, hooks, and API logic

## Trade-offs
- Stats refresh after updates instead of real-time sync
- Horizontal scroll table on mobile instead of card layout

## Improvements With More Time
- React Query for caching
- Server-side filtering
- More unit test coverage
