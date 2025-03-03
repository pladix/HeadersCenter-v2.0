import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  CheckCircle, 
  Key, 
  CreditCard, 
  Settings, 
  Users, 
  BarChart, 
  AlertTriangle,
  Terminal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === 'admin';
  const isSupport = currentUser?.role === 'support' || isAdmin;

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:block">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Terminal className="h-8 w-8 text-indigo-500" />
          <h2 className="text-xl font-bold text-white">Headers Center</h2>
        </div>
        <p className="text-xs text-gray-400 mt-1">Checker System v2.0</p>
      </div>
      
      <nav className="mt-6">
        <div className="px-4 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main</p>
        </div>
        
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex items-center px-6 py-2.5 text-sm ${
              isActive 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`
          }
        >
          <Home className="h-5 w-5 mr-3" />
          Dashboard
        </NavLink>
        
        <NavLink 
          to="/checkers" 
          className={({ isActive }) => 
            `flex items-center px-6 py-2.5 text-sm ${
              isActive 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`
          }
        >
          <CheckCircle className="h-5 w-5 mr-3" />
          Checkers
        </NavLink>
        
        <NavLink 
          to="/api-keys" 
          className={({ isActive }) => 
            `flex items-center px-6 py-2.5 text-sm ${
              isActive 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`
          }
        >
          <Key className="h-5 w-5 mr-3" />
          API Keys
        </NavLink>
        
        <NavLink 
          to="/plans" 
          className={({ isActive }) => 
            `flex items-center px-6 py-2.5 text-sm ${
              isActive 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`
          }
        >
          <CreditCard className="h-5 w-5 mr-3" />
          Plans
        </NavLink>
        
        {isAdmin && (
          <>
            <div className="px-4 mt-6 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin</p>
            </div>
            
            <NavLink 
              to="/admin/users" 
              className={({ isActive }) => 
                `flex items-center px-6 py-2.5 text-sm ${
                  isActive 
                    ? 'text-white bg-gray-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              <Users className="h-5 w-5 mr-3" />
              Users
            </NavLink>
            
            <NavLink 
              to="/admin/stats" 
              className={({ isActive }) => 
                `flex items-center px-6 py-2.5 text-sm ${
                  isActive 
                    ? 'text-white bg-gray-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              <BarChart className="h-5 w-5 mr-3" />
              Statistics
            </NavLink>
            
            <NavLink 
              to="/admin/notifications" 
              className={({ isActive }) => 
                `flex items-center px-6 py-2.5 text-sm ${
                  isActive 
                    ? 'text-white bg-gray-700' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`
              }
            >
              <AlertTriangle className="h-5 w-5 mr-3" />
              Notifications
            </NavLink>
          </>
        )}
        
        <div className="px-4 mt-6 mb-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
        </div>
        
        <NavLink 
          to="/settings" 
          className={({ isActive }) => 
            `flex items-center px-6 py-2.5 text-sm ${
              isActive 
                ? 'text-white bg-gray-700' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`
          }
        >
          <Settings className="h-5 w-5 mr-3" />
          Settings
        </NavLink>
      </nav>
      
      <div className="px-6 py-4 mt-auto border-t border-gray-700">
        <div className="bg-gray-700 rounded-md p-3">
          <p className="text-sm font-medium text-white">Current Plan</p>
          <p className="text-xs text-indigo-400 font-bold mt-1">
            {currentUser?.plan?.name 
              ? currentUser.plan.name.charAt(0).toUpperCase() + currentUser.plan.name.slice(1)
              : 'Free'}
          </p>
          {currentUser?.plan?.name !== 'complete' && (
            <NavLink 
              to="/plans" 
              className="mt-2 text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-2 rounded inline-block"
            >
              Upgrade
            </NavLink>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;