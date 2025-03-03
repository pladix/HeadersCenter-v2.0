import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Bell, User } from 'lucide-react';

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    systemUpdates: true,
    newCheckers: true,
    maintenanceAlerts: true
  });
  
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30 // minutes
  });
  
  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setSecurity(prev => ({
      ...prev,
      [name]: newValue
    }));
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save the settings to the database
    console.log('Saving settings:', { notifications, security });
    alert('Settings saved successfully!');
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center">
              <User className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-lg font-medium">Profile</h3>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-indigo-600 h-20 w-20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {currentUser?.displayName?.charAt(0) || 'U'}
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium">{currentUser?.displayName}</h3>
                <p className="text-sm text-gray-400">{currentUser?.email || 'Anonymous User'}</p>
                <p className="text-xs mt-1 bg-indigo-600 text-white px-2 py-0.5 rounded-full inline-block">
                  {currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={currentUser?.displayName || ''}
                />
              </div>
              
              {!currentUser?.isAnonymous && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue={currentUser?.email || ''}
                    disabled
                  />
                </div>
              )}
              
              <button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Settings Sections */}
        <div className="md:col-span-2 space-y-6">
          {/* Notifications */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center">
              <Bell className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-lg font-medium">Notifications</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-gray-400">Receive notifications via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    name="emailNotifications"
                    checked={notifications.emailNotifications}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">System Updates</p>
                  <p className="text-xs text-gray-400">Get notified about system updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    name="systemUpdates"
                    checked={notifications.systemUpdates}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">New Checkers</p>
                  <p className="text-xs text-gray-400">Get notified when new checkers are added</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    name="newCheckers"
                    checked={notifications.newCheckers}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Maintenance Alerts</p>
                  <p className="text-xs text-gray-400">Get notified about scheduled maintenance</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    name="maintenanceAlerts"
                    checked={notifications.maintenanceAlerts}
                    onChange={handleNotificationChange}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          {/* Security */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700 flex items-center">
              <Shield className="h-5 w-5 text-indigo-500 mr-2" />
              <h3 className="text-lg font-medium">Security</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-400">Add an extra layer of security</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    name="twoFactorAuth"
                    checked={security.twoFactorAuth}
                    onChange={handleSecurityChange}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Session Timeout (minutes)
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  name="sessionTimeout"
                  value={security.sessionTimeout}
                  onChange={handleSecurityChange}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              
              <div>
                <button
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
          
          {/* API Settings */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-medium">API Settings</h3>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  API Rate Limit
                </label>
                <select
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue="100"
                >
                  <option value="50">50 requests per minute</option>
                  <option value="100">100 requests per minute</option>
                  <option value="200">200 requests per minute</option>
                  <option value="500">500 requests per minute</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Webhook URL (optional)
                </label>
                <input
                  type="url"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://your-webhook-url.com"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md text-sm font-medium"
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;