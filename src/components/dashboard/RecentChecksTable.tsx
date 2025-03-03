import React from 'react';
import { format } from 'date-fns';
import { CheckHistory } from '../../types';

interface RecentChecksTableProps {
  checks: CheckHistory[];
}

const RecentChecksTable: React.FC<RecentChecksTableProps> = ({ checks }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-lg font-medium">Recent Checks</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Checker
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Input
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {checks.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-400">
                  No recent checks found
                </td>
              </tr>
            ) : (
              checks.map((check) => (
                <tr key={check.id} className="hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm">
                    {check.checkerType.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {/* Mask sensitive data */}
                    {check.input.length > 10 
                      ? `${check.input.substring(0, 6)}...${check.input.substring(check.input.length - 4)}`
                      : check.input}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      check.result.status === 'success'
                        ? 'bg-green-900/30 text-green-300'
                        : check.result.status === 'error'
                          ? 'bg-red-900/30 text-red-300'
                          : 'bg-yellow-900/30 text-yellow-300'
                    }`}>
                      {check.result.status.charAt(0).toUpperCase() + check.result.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {format(new Date(check.timestamp), 'MMM dd, HH:mm')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentChecksTable;