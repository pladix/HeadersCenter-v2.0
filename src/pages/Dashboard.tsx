import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3, 
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import RecentChecksTable from '../components/dashboard/RecentChecksTable';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  // Mock data for demonstration
  const stats = {
    checksToday: 24,
    totalChecks: 156,
    successRate: '78%',
    apiUsage: '2.3k',
    activeApiKeys: 3
  };
  
  const recentChecks = currentUser?.checkHistory || [];
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, {currentUser?.displayName || 'User'}</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard 
          title="Checks Today" 
          value={stats.checksToday} 
          icon={<CheckCircle size={24} />}
          change={{ value: '+12%', positive: true }}
        />
        <StatsCard 
          title="Success Rate" 
          value={stats.successRate} 
          icon={<TrendingUp size={24} />}
          change={{ value: '+5%', positive: true }}
        />
        <StatsCard 
          title="API Usage" 
          value={stats.apiUsage} 
          icon={<BarChart3 size={24} />}
          change={{ value: '+18%', positive: true }}
        />
        <StatsCard 
          title="Active API Keys" 
          value={stats.activeApiKeys} 
          icon={<Clock size={24} />}
        />
      </div>
      
      {/* System Status */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-3">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700 p-3 rounded-lg flex items-center">
            <div className="bg-green-500 h-3 w-3 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">Amazon Checkers</p>
              <p className="text-xs text-gray-400">Operational</p>
            </div>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg flex items-center">
            <div className="bg-green-500 h-3 w-3 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">VBV Checkers</p>
              <p className="text-xs text-gray-400">Operational</p>
            </div>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg flex items-center">
            <div className="bg-yellow-500 h-3 w-3 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium">Adyen Checkers</p>
              <p className="text-xs text-gray-400">Partial Outage</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Checks */}
      <RecentChecksTable checks={recentChecks.slice(0, 5)} />
      
      {/* Announcements */}
      <div className="mt-6 bg-indigo-900/30 border border-indigo-800 rounded-lg p-4">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-indigo-400 mr-3 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-indigo-300">Announcement</h3>
            <p className="text-sm text-indigo-200 mt-1">
              New Adyen Checker has been added! Check it out in the Checkers section.
              We've also improved the success rate of Amazon Checker 2.0.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;