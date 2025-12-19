import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userBookings = await api.getUserBookings(user.id);
        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.id]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    setCancelLoading(bookingId);
    try {
      await api.cancelBooking(bookingId);
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled' }
          : booking
      ));
      alert('Booking cancelled successfully!');
    } catch (error) {
      alert('Error cancelling booking: ' + error.message);
    } finally {
      setCancelLoading(null);
    }
  };

  const canCancelBooking = (booking) => {
    if (booking.status !== 'Booked') return false;
    
    const bookingDateTime = new Date(`${booking.date}T${booking.timeSlot.split('-')[0]}:00`);
    const now = new Date();
    
    return bookingDateTime > now;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="card">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h3 className="text-lg font-semibold">{booking.room?.roomName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'Booked' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Room Type:</span> {booking.room?.roomType}
                    </div>
                    <div>
                      <span className="font-medium">Date:</span> {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {booking.timeSlot}
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="font-medium">Capacity:</span> {booking.room?.capacity} people
                  </div>
                  
                  {booking.createdAt && (
                    <div className="mt-2 text-xs text-gray-400">
                      Booked on: {new Date(booking.createdAt).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="ml-4">
                  {canCancelBooking(booking) && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancelLoading === booking.id}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                      {cancelLoading === booking.id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings yet</h3>
          <p className="mt-1 text-sm text-gray-500">Start by browsing available rooms and making your first booking.</p>
          <div className="mt-6">
            <a
              href="/rooms"
              className="btn-primary"
            >
              Browse Rooms
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;