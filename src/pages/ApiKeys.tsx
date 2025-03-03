import React, { useState, useEffect } from 'react';
import { Key, Plus } from 'lucide-react';
import ApiKeyCard from '../components/api/ApiKeyCard';
import { useAuth } from '../context/AuthContext';
import { useApiKey } from '../context/ApiKeyContext';
import { ApiKey } from '../types';

const ApiKeys: React.FC = () => {
  const { currentUser } = useAuth();
  const { generateApiKey, revokeApiKey, isGenerating } = useApiKey();
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [plan, setPlan] = useState<'test' | 'complete'>('test');
  const [duration, setDuration] = useState(1); // hours
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  
  useEffect(() => {
    // Initialize with any existing API keys from the user
    if (currentUser?.apiKeys) {
      setApiKeys(currentUser.apiKeys);
    }
  }, [currentUser]);
  
  const handleGenerateKey = async () => {
    try {
      const newKey = await generateApiKey(plan, duration);
      setApiKeys(prevKeys => [newKey, ...prevKeys]);
      setShowNewKeyForm(false);
    } catch (error) {
      console.error('Error generating API key:', error);
    }
  };
  
  const handleRevokeKey = async (keyId: string) => {
    try {
      await revokeApiKey(keyId);
      // Update the local state to mark the key as inactive
      setApiKeys(prevKeys => 
        prevKeys.map(key => 
          key.id === keyId ? { ...key, active: false } : key
        )
      );
    } catch (error) {
      console.error('Error revoking API key:', error);
    }
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-gray-400 mt-1">Manage your API keys for integration</p>
        </div>
        
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center"
          onClick={() => setShowNewKeyForm(!showNewKeyForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New API Key
        </button>
      </div>
      
      {showNewKeyForm && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-medium mb-4">Generate New API Key</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Plan Type
              </label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={plan}
                onChange={(e) => setPlan(e.target.value as 'test' | 'complete')}
              >
                <option value="test">Test Plan (R$20/hour)</option>
                <option value="complete">Complete Plan (R$105/month)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Duration (hours)
              </label>
              <input
                type="number"
                min="1"
                max={plan === 'test' ? 24 : 720} // 1 day for test, 30 days for complete
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              Total Cost: <span className="text-white font-medium">
                R${plan === 'test' ? 20 * duration : 105}
              </span>
            </p>
            
            <div className="flex space-x-3">
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-medium"
                onClick={() => setShowNewKeyForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center"
                onClick={handleGenerateKey}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <Key className="h-4 w-4 mr-2" />
                    Generate Key
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {apiKeys.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 text-center">
          <Key className="h-12 w-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No API Keys</h3>
          <p className="text-gray-400 mb-4">You haven't generated any API keys yet.</p>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium"
            onClick={() => setShowNewKeyForm(true)}
          >
            Generate Your First API Key
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {apiKeys.map((apiKey) => (
            <ApiKeyCard 
              key={apiKey.id} 
              apiKey={apiKey} 
              onRevoke={handleRevokeKey} 
            />
          ))}
        </div>
      )}
      
      <div className="mt-8 bg-gray-800 border border-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">API Documentation</h3>
        
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Base URL</h4>
          <div className="bg-gray-700 p-3 rounded-md">
            <code className="text-sm text-gray-300">https://api.headerscenter.com/v2</code>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-md font-medium mb-2">Authentication</h4>
          <p className="text-sm text-gray-400 mb-2">
            Include your API key in the request headers:
          </p>
          <div className="bg-gray-700 p-3 rounded-md">
            <code className="text-sm text-gray-300">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Example Request</h4>
          <div className="bg-gray-700 p-3 rounded-md">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`curl -X POST https://api.headerscenter.com/v2/check/amazon
  -H "Authorization: Bearer YOUR_API_KEY"
  -H "Content-Type: application/json"
  -d '{"card": "4111111111111111", "exp": "12/25", "cvv": "123"}'`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;