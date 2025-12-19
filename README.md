# Smart Study Room Booking System

A React-based web application for managing study room bookings in educational institutions.

## Features

### 👤 Student Features
- **Authentication**: Register and login with email/password
- **Room Browsing**: View available study rooms and labs
- **Real-time Booking**: Check availability and book time slots
- **Booking Management**: View and cancel personal bookings
- **Dashboard**: Overview of bookings and quick actions

### 👨‍💼 Admin Features
- **Room Management**: Add and manage study rooms
- **Booking Overview**: Monitor all bookings across the system
- **Analytics**: View usage statistics and reports
- **User Management**: Role-based access control

## Technology Stack

- **Frontend**: React 18, Tailwind CSS, React Router
- **State Management**: React Context API
- **Styling**: Tailwind CSS with custom components
- **Icons**: Heroicons (SVG)
- **Date Handling**: Native JavaScript Date API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation bar
│   └── ProtectedRoute.jsx # Route protection
├── context/            # React Context providers
│   └── AuthContext.js  # Authentication context
├── pages/              # Main application pages
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   ├── Dashboard.jsx   # User dashboard
│   ├── Rooms.jsx       # Room browsing and booking
│   ├── MyBookings.jsx  # User's booking history
│   └── AdminPanel.jsx  # Admin management panel
├── utils/              # Utility functions
│   └── api.js          # Mock API functions
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

### Demo Credentials

**Admin Account**:
- Email: `admin@college.edu`
- Password: `admin123`

**Student Account**:
- Email: `john@college.edu`
- Password: `student123`

## Core Functionality

### 🔐 Authentication System
- JWT-based authentication (simulated)
- Role-based access control (Student/Admin)
- Protected routes and components
- Persistent login sessions

### 🏢 Room Management
- Room types: Study Rooms, Labs, Conference Rooms
- Capacity management
- Time slot configuration
- Real-time availability checking

### 📅 Booking System
- **Conflict Prevention**: Prevents double booking
- **Date Validation**: Only future dates allowed
- **Time Slot Management**: Predefined time slots
- **Cancellation Logic**: Cancel before start time
- **Status Tracking**: Booked/Cancelled status

### 🛡️ Security Features
- Input validation and sanitization
- Role-based route protection
- Secure authentication flow
- Error handling and user feedback

## Key Components

### AuthContext
Manages user authentication state and provides:
- Login/logout functionality
- User role checking
- Token management
- Authentication persistence

### API Layer
Mock API functions simulating backend operations:
- User authentication
- Room CRUD operations
- Booking management
- Availability checking

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layouts
- Touch-friendly interface
- Accessible design patterns

## Business Logic

### Availability Check Algorithm
```javascript
// Check if a time slot is available
const isSlotAvailable = (roomId, date, timeSlot) => {
  const existingBooking = bookings.find(booking => 
    booking.roomId === roomId && 
    booking.date === date && 
    booking.timeSlot === timeSlot &&
    booking.status === 'Booked'
  );
  return !existingBooking;
};
```

### Booking Conflict Prevention
- Real-time availability checking
- Atomic booking operations
- Optimistic UI updates
- Error handling and rollback

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Configuration
Create a `.env` file for environment variables:
```
REACT_APP_API_URL=your_backend_url
REACT_APP_JWT_SECRET=your_jwt_secret
```

## Future Enhancements

- **Backend Integration**: Connect to real API endpoints
- **Email Notifications**: Booking confirmations and reminders
- **Calendar Integration**: Export bookings to calendar apps
- **Advanced Analytics**: Usage reports and insights
- **Mobile App**: React Native implementation
- **Real-time Updates**: WebSocket integration
- **Payment Integration**: Paid booking options

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.