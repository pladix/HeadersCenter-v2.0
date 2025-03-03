import React, { useState } from 'react';
import { Bell, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import NotificationDropdown from '../notifications/NotificationDropdown';

const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          className="md:hidden text-gray-400 hover:text-white mr-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-white">Headers Center <span className="text-indigo-400">2.0</span></h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button 
            className="text-gray-400 hover:text-white relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <NotificationDropdown onClose={() => setShowNotifications(false)} />
          )}
        </div>
        
        {/* User menu */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="bg-gray-700 rounded-full p-1">
              <User size={18} />
            </div>
            <span className="hidden md:inline-block">
              {currentUser?.displayName || 'User'}
            </span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              <div className="p-3 border-b border-gray-700">
                <p className="text-sm font-medium">{currentUser?.displayName}</p>
                <p className="text-xs text-gray-400">{currentUser?.email || 'Anonymous User'}</p>
                <p className="text-xs mt-1 bg-indigo-600 text-white px-2 py-0.5 rounded-full inline-block">
                  {currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}
                </p>
              </div>
              <div className="p-2">
                <button 
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;