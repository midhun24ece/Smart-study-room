const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  roomType: { type: String, required: true },
  capacity: { type: Number, required: true },
  availableSlots: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);