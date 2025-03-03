import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, change }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          
          {change && (
            <p className={`text-xs mt-2 flex items-center ${
              change.positive ? 'text-green-400' : 'text-red-400'
            }`}>
              <span className={`mr-1 ${
                change.positive ? 'text-green-400' : 'text-red-400'
              }`}>
                {change.positive ? '↑' : '↓'}
              </span>
              {change.value} from last period
            </p>
          )}
        </div>
        
        <div className="bg-gray-700 p-3 rounded-lg text-indigo-500">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;