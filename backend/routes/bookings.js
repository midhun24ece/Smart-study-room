const express = require('express');
const Booking = require('../models/Booking');
const Room = require('../models/Room');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const room = await Room.findById(req.body.roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    const existingBookings = await Booking.countDocuments({
      roomId: req.body.roomId,
      date: req.body.date,
      timeSlot: req.body.timeSlot,
      status: 'Booked'
    });
    
    if (existingBookings >= room.capacity) {
      return res.status(400).json({ error: 'Room capacity full for this time slot' });
    }
    
    const booking = new Booking(req.body);
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate('roomId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId roomId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'Cancelled' },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;