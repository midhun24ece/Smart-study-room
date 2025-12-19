import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const api = {
  async login(email, password) {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  },

  async register(userData) {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  async getRooms() {
    const response = await apiClient.get('/rooms');
    return response.data.map(room => ({
      ...room,
      id: room._id
    }));
  },

  async addRoom(roomData) {
    const response = await apiClient.post('/rooms', roomData);
    return response.data;
  },

  async createBooking(bookingData) {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  async getUserBookings(userId) {
    const response = await apiClient.get(`/bookings/user/${userId}`);
    return response.data.map(booking => ({
      ...booking,
      id: booking._id,
      room: { ...booking.roomId, id: booking.roomId._id }
    }));
  },

  async cancelBooking(bookingId) {
    const response = await apiClient.patch(`/bookings/${bookingId}/cancel`);
    return response.data;
  },

  async getAvailableSlots(roomId, date) {
    const response = await apiClient.get(`/rooms/${roomId}/available-slots?date=${date}`);
    return response.data;
  },

  async getAllBookings() {
    const response = await apiClient.get('/bookings');
    return response.data.map(booking => ({
      ...booking,
      id: booking._id,
      room: { ...booking.roomId, id: booking.roomId._id },
      user: { ...booking.userId, id: booking.userId._id }
    }));
  }
};