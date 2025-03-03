import React from 'react';
import { BarChart3, TrendingUp, Users, CheckCircle } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';

// Custom chart components to avoid recharts dependency
const BarChartComponent = ({ data, dataKey }: { data: any[], dataKey: string }) => {
  const maxValue = Math.max(...data.map(item => item[dataKey]));
  
  return (
    <div className="w-full h-full flex items-end space-x-2">
      {data.map((item, index) => {
        const percentage = (item[dataKey] / maxValue) * 100;
        return (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-indigo-500 rounded-t-sm" 
              style={{ height: `${percentage}%` }}
            ></div>
            <div className="text-xs text-gray-400 mt-2">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

const HorizontalBarChart = ({ data }: { data: any[] }) => {
  return (
    <div className="w-full space-y-4">
      {data.map((item, index) => (
        <div key={index} className="w-full">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-400">{item.name}</span>
            <span className="text-xs text-gray-400">{item.success}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${item.success}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const AdminStats: React.FC = () => {
  // Mock data for demonstration
  const checkData = [
    { name: 'Mon', checks: 120 },
    { name: 'Tue', checks: 150 },
    { name: 'Wed', checks: 180 },
    { name: 'Thu', checks: 145 },
    { name: 'Fri', checks: 190 },
    { name: 'Sat', checks: 110 },
    { name: 'Sun', checks: 90 }
  ];
  
  const checkerPerformance = [
    { name: 'Amazon 1.0', success: 78, error: 22 },
    { name: 'Amazon 2.0', success: 85, error: 15 },
    { name: 'VBV 1.0', success: 65, error: 35 },
    { name: 'VBV 2.0', success: 72, error: 28 },
    { name: 'Returning', success: 80, error: 20 },
    { name: 'Full CC', success: 68, error: 32 },
    { name: 'Adyen', success: 75, error: 25 }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">System Statistics</h1>
        <p className="text-gray-400 mt-1">Detailed analytics and performance metrics</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Total Users" 
          value="1,245" 
          icon={<Users size={24} />}
          change={{ value: '+12%', positive: true }}
        />
        <StatsCard 
          title="Checks Today" 
          value="3,856" 
          icon={<CheckCircle size={24} />}
          change={{ value: '+18%', positive: true }}
        />
        <StatsCard 
          title="Success Rate" 
          value="76%" 
          icon={<TrendingUp size={24} />}
          change={{ value: '+5%', positive: true }}
        />
        <StatsCard 
          title="API Requests" 
          value="12.5k" 
          icon={<BarChart3 size={24} />}
          change={{ value: '+22%', positive: true }}
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-medium">Daily Checks</h3>
          </div>
          <div className="p-4" style={{ height: '300px' }}>
            <BarChartComponent data={checkData} dataKey="checks" />
          </div>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-medium">Checker Performance</h3>
          </div>
          <div className="p-4" style={{ height: '300px' }}>
            <HorizontalBarChart data={checkerPerformance} />
          </div>
        </div>
      </div>
      
      {/* User Activity */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium">User Activity</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Active Users</h4>
              <div className="flex items-end space-x-2">
                <p className="text-2xl font-bold">245</p>
                <p className="text-xs text-green-400">+12% from last week</p>
              </div>
              <div className="mt-4 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Premium Users</h4>
              <div className="flex items-end space-x-2">
                <p className="text-2xl font-bold">128</p>
                <p className="text-xs text-green-400">+8% from last week</p>
              </div>
              <div className="mt-4 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">New Registrations</h4>
              <div className="flex items-end space-x-2">
                <p className="text-2xl font-bold">32</p>
                <p className="text-xs text-green-400">+15% from last week</p>
              </div>
              <div className="mt-4 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* System Health */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium">System Health</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Server Load</h4>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">42%</p>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden flex-1 mx-4">
                  <div className="bg-green-500 h-full" style={{ width: '42%' }}></div>
                </div>
                <p className="text-xs text-gray-400">Normal</p>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">API Response Time</h4>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">245ms</p>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden flex-1 mx-4">
                  <div className="bg-green-500 h-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-xs text-gray-400">Excellent</p>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Error Rate</h4>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">1.2%</p>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden flex-1 mx-4">
                  <div className="bg-green-500 h-full" style={{ width: '5%' }}></div>
                </div>
                <p className="text-xs text-gray-400">Low</p>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Uptime</h4>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold">99.9%</p>
                <div className="h-2 bg-gray-600 rounded-full overflow-hidden flex-1 mx-4">
                  <div className="bg-green-500 h-full" style={{ width: '99.9%' }}></div>
                </div>
                <p className="text-xs text-gray-400">Excellent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;