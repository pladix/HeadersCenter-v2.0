import React from 'react';
import { ApiKey } from '../../types';
import { format } from 'date-fns';
import { Copy, XCircle } from 'lucide-react';

interface ApiKeyCardProps {
  apiKey: ApiKey;
  onRevoke: (id: string) => void;
}

const ApiKeyCard: React.FC<ApiKeyCardProps> = ({ apiKey, onRevoke }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey.key);
    // In a real app, you would show a toast notification
    alert('API key copied to clipboard');
  };

  const isExpired = new Date(apiKey.expiresAt) < new Date();

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium">API Key</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              apiKey.plan === 'complete' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-yellow-600 text-white'
            }`}>
              {apiKey.plan.charAt(0).toUpperCase() + apiKey.plan.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Created on {format(new Date(apiKey.createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
        
        <div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            !apiKey.active || isExpired
              ? 'bg-red-900/30 text-red-300'
              : 'bg-green-900/30 text-green-300'
          }`}>
            {!apiKey.active 
              ? 'Revoked' 
              : isExpired 
                ? 'Expired' 
                : 'Active'}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            API Key
          </label>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value={apiKey.key}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 text-sm text-white focus:outline-none"
            />
            <button
              className="bg-gray-700 border border-gray-600 border-l-0 rounded-r-md px-3 py-2 text-gray-400 hover:text-white"
              onClick={copyToClipboard}
            >
              <Copy size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Expires
            </label>
            <p className="text-sm">
              {format(new Date(apiKey.expiresAt), 'MMM dd, yyyy HH:mm')}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Usage Count
            </label>
            <p className="text-sm">{apiKey.usageCount} requests</p>
          </div>
        </div>
        
        {apiKey.active && !isExpired && (
          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center"
            onClick={() => onRevoke(apiKey.id)}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Revoke API Key
          </button>
        )}
      </div>
    </div>
  );
};

export default ApiKeyCard;