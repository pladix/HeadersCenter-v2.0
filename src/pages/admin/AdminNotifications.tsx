import React, { useState } from 'react';
import { Bell, Send, Trash } from 'lucide-react';
import { UserRole } from '../../types';

const AdminNotifications: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'info' | 'warning' | 'error' | 'success'>('info');
  const [forRoles, setForRoles] = useState<UserRole[]>(['premium', 'free']);
  
  // Mock notifications for demonstration
  const mockNotifications = [
    {
      id: '1',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on June 25th from 2:00 AM to 4:00 AM UTC.',
      type: 'warning' as const,
      createdAt: '2023-06-20T10:30:00Z',
      forRoles: ['admin', 'support', 'premium', 'free'] as UserRole[]
    },
    {
      id: '2',
      title: 'New Checker Added',
      message: 'Adyen Checker is now available for premium users.',
      type: 'info' as const,
      createdAt: '2023-06-18T15:45:00Z',
      forRoles: ['premium'] as UserRole[]
    },
    {
      id: '3',
      title: 'API Rate Limit Increased',
      message: 'API rate limits have been increased for all premium users.',
      type: 'success' as const,
      createdAt: '2023-06-15T09:20:00Z',
      forRoles: ['premium'] as UserRole[]
    }
  ];
  
  const handleRoleToggle = (role: UserRole) => {
    if (forRoles.includes(role)) {
      setForRoles(forRoles.filter(r => r !== role));
    } else {
      setForRoles([...forRoles, role]);
    }
  };
  
  const handleSendNotification = () => {
    if (!title || !message || forRoles.length === 0) {
      alert('Please fill in all fields and select at least one role');
      return;
    }
    
    // In a real app, this would send the notification to the database
    console.log('Sending notification:', { title, message, type, forRoles });
    alert('Notification sent successfully!');
    
    // Reset form
    setTitle('');
    setMessage('');
    setType('info');
    setForRoles(['premium', 'free']);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notification Management</h1>
        <p className="text-gray-400 mt-1">Send and manage system notifications</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send Notification Form */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center">
              <Bell className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-lg font-medium">Send Notification</h3>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Notification title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Notification message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Type
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="error">Error</option>
                  <option value="success">Success</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Send To
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                      checked={forRoles.includes('admin')}
                      onChange={() => handleRoleToggle('admin')}
                    />
                    <span className="ml-2 text-sm text-gray-300">Admins</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                      checked={forRoles.includes('support')}
                      onChange={() => handleRoleToggle('support')}
                    />
                    <span className="ml-2 text-sm text-gray-300">Support Staff</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                      checked={forRoles.includes('premium')}
                      onChange={() => handleRoleToggle('premium')}
                    />
                    <span className="ml-2 text-sm text-gray-300">Premium Users</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                      checked={forRoles.includes('free')}
                      onChange={() => handleRoleToggle('free')}
                    />
                    <span className="ml-2 text-sm text-gray-300">Free Users</span>
                  </label>
                </div>
              </div>
              
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center"
                onClick={handleSendNotification}
              >
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </button>
            </div>
          </div>
        </div>
        
        {/* Recent Notifications */}
        <div className="lg:col-span-2">
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium">Recent Notifications</h3>
            </div>
            
            <div>
              {mockNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className="p-4 border-b border-gray-700 hover:bg-gray-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`mt-0.5 h-3 w-3 rounded-full mr-3 ${
                        notification.type === 'info' 
                          ? 'bg-blue-500' 
                          : notification.type === 'warning'
                            ? 'bg-yellow-500'
                            : notification.type === 'error'
                              ? 'bg-red-500'
                              : 'bg-green-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.message}</p>
                        <div className="flex items-center mt-2">
                          <p className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 ml-4">
                            Sent to: {notification.forRoles.map(role => 
                              role.charAt(0).toUpperCase() + role.slice(1)
                            ).join(', ')}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-gray-400 hover:text-red-400">
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;