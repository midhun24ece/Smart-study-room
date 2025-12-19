const express = require('express');
const Room = require('../models/Room');
const Booking = require('../models/Booking');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:roomId/available-slots', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { date } = req.query;
    
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    
    const bookedSlots = await Booking.find({ roomId, date, status: 'Booked' }).select('timeSlot');
    const bookedTimeSlots = bookedSlots.map(b => b.timeSlot);
    
    const availableSlots = room.availableSlots.filter(slot => !bookedTimeSlots.includes(slot));
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;