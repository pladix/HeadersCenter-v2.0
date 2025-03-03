import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { Bell, Check } from 'lucide-react';

interface NotificationDropdownProps {
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <h3 className="text-sm font-medium">Notifications</h3>
        <button 
          className="text-xs text-indigo-400 hover:text-indigo-300"
          onClick={() => {
            markAllAsRead();
            onClose();
          }}
        >
          Mark all as read
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-400">
            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-3 border-b border-gray-700 hover:bg-gray-700 ${
                notification.read ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                </div>
                {!notification.read && (
                  <button 
                    className="text-gray-400 hover:text-white"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;