import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('rooms');
  const [rooms, setRooms] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRoom, setNewRoom] = useState({
    roomName: '',
    roomType: '',
    capacity: '',
    availableSlots: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00']
  });
  const [newTimeSlot, setNewTimeSlot] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomsData, bookingsData] = await Promise.all([
        api.getRooms(),
        api.getAllBookings()
      ]);
      setRooms(roomsData);
      setAllBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const roomData = {
        ...newRoom,
        capacity: parseInt(newRoom.capacity)
      };
      const addedRoom = await api.addRoom(roomData);
      setRooms([...rooms, addedRoom]);
      setNewRoom({ 
        roomName: '', 
        roomType: '', 
        capacity: '',
        availableSlots: ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00']
      });
      alert('Room added successfully!');
    } catch (error) {
      alert('Error adding room: ' + error.message);
    }
  };

  const addTimeSlot = () => {
    if (newTimeSlot && !newRoom.availableSlots.includes(newTimeSlot)) {
      setNewRoom({
        ...newRoom,
        availableSlots: [...newRoom.availableSlots, newTimeSlot]
      });
      setNewTimeSlot('');
    }
  };

  const removeTimeSlot = (slotToRemove) => {
    setNewRoom({
      ...newRoom,
      availableSlots: newRoom.availableSlots.filter(slot => slot !== slotToRemove)
    });
  };

  const getBookingStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const totalBookings = allBookings.length;
    const activeBookings = allBookings.filter(b => b.status === 'Booked').length;
    const todayBookings = allBookings.filter(b => b.date === today && b.status === 'Booked').length;
    
    return { totalBookings, activeBookings, todayBookings };
  };

  const stats = getBookingStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{rooms.length}</p>
            <p className="text-sm text-gray-600">Total Rooms</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{stats.totalBookings}</p>
            <p className="text-sm text-gray-600">Total Bookings</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.activeBookings}</p>
            <p className="text-sm text-gray-600">Active Bookings</p>
          </div>
        </div>
        <div className="card">
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.todayBookings}</p>
            <p className="text-sm text-gray-600">Today's Bookings</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rooms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Manage Rooms
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            All Bookings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'rooms' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Room Form */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Add New Room</h2>
            <form onSubmit={handleAddRoom} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={newRoom.roomName}
                  onChange={(e) => setNewRoom({...newRoom, roomName: e.target.value})}
                  placeholder="e.g., Study Room C"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  value={newRoom.roomType}
                  onChange={(e) => setNewRoom({...newRoom, roomType: e.target.value})}
                  placeholder="Enter room type"
                  list="roomTypes"
                />
                <datalist id="roomTypes">
                  <option value="Study Room" />
                  <option value="Lab" />
                  <option value="Conference Room" />
                  <option value="Meeting Room" />
                  <option value="Library" />
                  <option value="Auditorium" />
                </datalist>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  className="input-field"
                  value={newRoom.capacity}
                  onChange={(e) => setNewRoom({...newRoom, capacity: e.target.value})}
                  placeholder="e.g., 8"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Time Slots
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input-field flex-1"
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    placeholder="e.g., 16:00-17:00"
                  />
                  <button
                    type="button"
                    onClick={addTimeSlot}
                    className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {newRoom.availableSlots.map((slot, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded"
                    >
                      {slot}
                      <button
                        type="button"
                        onClick={() => removeTimeSlot(slot)}
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <button type="submit" className="w-full btn-primary">
                Add Room
              </button>
            </form>
          </div>

          {/* Rooms List */}
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Existing Rooms</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {rooms.map((room) => {
                const roomBookings = allBookings.filter(b => b.roomId === room._id || b.roomId === room.id);
                const bookedDates = [...new Set(roomBookings.filter(b => b.status === 'Booked').map(b => b.date))];
                
                return (
                  <div key={room.id || room._id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{room.roomName}</h3>
                        <p className="text-sm text-gray-600">{room.roomType}</p>
                        <p className="text-sm text-gray-500">Capacity: {room.capacity}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                        Active
                      </span>
                    </div>
                    
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Available Time Slots:</h4>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {room.availableSlots?.map((slot, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Booked Dates:</h4>
                      <div className="flex flex-wrap gap-1">
                        {bookedDates.length > 0 ? (
                          bookedDates.slice(0, 5).map((date, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {new Date(date).toLocaleDateString()}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">No bookings yet</span>
                        )}
                        {bookedDates.length > 5 && (
                          <span className="text-xs text-gray-500">+{bookedDates.length - 5} more</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">All Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.user?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.room?.roomName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.timeSlot}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'Booked' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;