const mongoose = require('mongoose');
const User = require('./models/User');
const Room = require('./models/Room');
require('dotenv').config();

async function seedDatabase() {
  try {
    const admin = new User({
      name: 'Admin User',
      email: 'admin@college.edu',
      password: 'admin123',
      role: 'admin'
    });
    
    const student = new User({
      name: 'John Doe',
      email: 'john@college.edu',
      password: 'student123',
      role: 'student'
    });
    
    await admin.save();
    await student.save();
    
    const rooms = [
      { roomName: 'Study Room A', roomType: 'Study Room', capacity: 6, availableSlots: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'] },
      { roomName: 'Computer Lab 1', roomType: 'Lab', capacity: 20, availableSlots: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'] },
      { roomName: 'Study Room B', roomType: 'Study Room', capacity: 4, availableSlots: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'] }
    ];
    
    await Room.insertMany(rooms);
    
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

if (require.main === module) {
  // Run directly
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => seedDatabase())
    .then(() => process.exit(0))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
} else {
  // Run as module
  seedDatabase();
}