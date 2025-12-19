import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await api.getRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedRoom, selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      const roomId = selectedRoom._id || selectedRoom.id;
      const slots = await api.getAvailableSlots(roomId, selectedDate);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleBookRoom = async (timeSlot) => {
    setBookingLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await api.createBooking({
        userId: user.id,
        roomId: selectedRoom._id || selectedRoom.id,
        date: selectedDate,
        timeSlot: timeSlot
      });
      
      alert('Room booked successfully!');
      fetchAvailableSlots(); // Refresh available slots
      navigate('/my-bookings');
    } catch (error) {
      alert('Error booking room: ' + error.message);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading rooms...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse & Book Rooms</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Room List */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
          <div className="space-y-4">
            {rooms.map((room) => (
              <div
                key={room._id || room.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  (selectedRoom?._id || selectedRoom?.id) === (room._id || room.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedRoom(room)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{room.roomName}</h3>
                    <p className="text-gray-600">{room.roomType}</p>
                    <p className="text-sm text-gray-500">Capacity: {room.capacity} people</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Book Selected Room</h2>
          
          {selectedRoom ? (
            <div>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold">{selectedRoom.roomName}</h3>
                <p className="text-gray-600">{selectedRoom.roomType} • Capacity: {selectedRoom.capacity}</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Time Slots
                </label>
                {availableSlots.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => handleBookRoom(slot)}
                        disabled={bookingLoading}
                        className="p-3 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-50"
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No available slots for selected date
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <p className="text-gray-500 mt-2">Select a room to view available time slots</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;