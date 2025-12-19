import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Smart Study Booking
          </Link>
          
          {user && (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="hover:text-blue-200">
                Dashboard
              </Link>
              <Link to="/rooms" className="hover:text-blue-200">
                Rooms
              </Link>
              <Link to="/my-bookings" className="hover:text-blue-200">
                My Bookings
              </Link>
              {isAdmin() && (
                <Link to="/admin" className="hover:text-blue-200">
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center space-x-2">
                <span className="text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;