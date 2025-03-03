import React, { useState } from 'react';
import { Users, Search, Edit, Trash, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

const AdminUsers: React.FC = () => {
  const { updateUserRole } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock user data for demonstration
  const mockUsers = [
    {
      uid: '1',
      displayName: 'John Doe',
      email: 'john@example.com',
      role: 'premium' as UserRole,
      isAnonymous: false,
      createdAt: '2023-01-15T10:30:00Z',
      lastLogin: '2023-06-20T15:45:00Z'
    },
    {
      uid: '2',
      displayName: 'Jane Smith',
      email: 'jane@example.com',
      role: 'admin' as UserRole,
      isAnonymous: false,
      createdAt: '2023-02-10T08:20:00Z',
      lastLogin: '2023-06-21T09:15:00Z'
    },
    {
      uid: '3',
      displayName: 'Anonymous User',
      email: null,
      role: 'free' as UserRole,
      isAnonymous: true,
      createdAt: '2023-06-15T14:10:00Z',
      lastLogin: '2023-06-15T14:10:00Z'
    },
    {
      uid: '4',
      displayName: 'Robert Johnson',
      email: 'robert@example.com',
      role: 'support' as UserRole,
      isAnonymous: false,
      createdAt: '2023-03-05T11:40:00Z',
      lastLogin: '2023-06-19T16:30:00Z'
    },
    {
      uid: '5',
      displayName: 'Emily Davis',
      email: 'emily@example.com',
      role: 'premium' as UserRole,
      isAnonymous: false,
      createdAt: '2023-04-20T09:50:00Z',
      lastLogin: '2023-06-18T13:25:00Z'
    }
  ];
  
  const filteredUsers = mockUsers.filter(user => 
    user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleRoleChange = async (uid: string, newRole: UserRole) => {
    try {
      await updateUserRole(uid, newRole);
      // In a real app, you would update the UI after the role change
      alert(`User role updated to ${newRole}`);
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-400 mt-1">Manage user accounts and permissions</p>
      </div>
      
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-indigo-500 mr-2" />
            <h3 className="text-lg font-medium">Users</h3>
          </div>
          
          <div className="relative">
            <input
              type="text"
              className="bg-gray-700 border border-gray-600 rounded-md pl-9 pr-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.uid} className="hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="bg-indigo-600 h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium">
                        {user.displayName?.charAt(0) || 'A'}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">{user.displayName}</p>
                        <p className="text-xs text-gray-400">{user.email || 'Anonymous User'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.role === 'admin'
                        ? 'bg-red-900/30 text-red-300'
                        : user.role === 'support'
                          ? 'bg-yellow-900/30 text-yellow-300'
                          : user.role === 'premium'
                            ? 'bg-indigo-900/30 text-indigo-300'
                            : 'bg-gray-700 text-gray-300'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="text-gray-400 hover:text-white"
                        onClick={() => {
                          const newRole = prompt('Enter new role (admin, support, premium, free):', user.role);
                          if (newRole && ['admin', 'support', 'premium', 'free'].includes(newRole)) {
                            handleRoleChange(user.uid, newRole as UserRole);
                          }
                        }}
                      >
                        <Shield size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-white">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-red-400">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Showing {filteredUsers.length} of {mockUsers.length} users
          </p>
          
          <div className="flex space-x-2">
            <button className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded-md text-sm">
              Previous
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded-md text-sm">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;