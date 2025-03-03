import React, { useState } from 'react';
import { useChecker } from '../../context/CheckerContext';
import { CheckerType } from '../../types';
import { Loader2 } from 'lucide-react';

interface CheckerCardProps {
  title: string;
  description: string;
  type: CheckerType;
  icon: React.ReactNode;
  isPremium?: boolean;
}

const CheckerCard: React.FC<CheckerCardProps> = ({ 
  title, 
  description, 
  type, 
  icon,
  isPremium = false
}) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { performCheck, isChecking } = useChecker();

  const handleCheck = async () => {
    if (!input.trim()) {
      setResult('Please enter data to check');
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      const checkResult = await performCheck(type, input);
      
      setResult(checkResult.message);
      setStatus(checkResult.status === 'success' ? 'success' : 'error');
    } catch (error) {
      setResult(error instanceof Error ? error.message : 'An error occurred');
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-indigo-500">
              {icon}
            </div>
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          {isPremium && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
              Premium
            </span>
          )}
        </div>
        <p className="text-sm text-gray-400 mt-2">{description}</p>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <label htmlFor={`input-${type}`} className="block text-sm font-medium text-gray-300 mb-1">
            Enter data to check
          </label>
          <textarea
            id={`input-${type}`}
            rows={3}
            className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter card details or data to check..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center"
          onClick={handleCheck}
          disabled={isChecking}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            'Check Now'
          )}
        </button>
        
        {result && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            status === 'success' 
              ? 'bg-green-900/30 text-green-300 border border-green-800' 
              : status === 'error'
                ? 'bg-red-900/30 text-red-300 border border-red-800'
                : 'bg-gray-700 text-gray-300'
          }`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckerCard;