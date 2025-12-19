# Smart Study Booking Backend

MongoDB-powered backend for the Smart Study Room Booking System.

## Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Seed the database:
```bash
npm run seed
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

- POST /api/auth/login
- POST /api/auth/register
- GET /api/rooms
- POST /api/rooms
- GET /api/rooms/:id/available-slots
- POST /api/bookings
- GET /api/bookings/user/:userId
- GET /api/bookings
- PATCH /api/bookings/:id/cancel

## Environment Variables

Create `.env` file with:
```
MONGODB_URI=mongodb+srv://midhuneh:midhun%402025@cluster0.bgwfazg.mongodb.net/smart-study-booking
JWT_SECRET=your-secret-key
PORT=5000
```