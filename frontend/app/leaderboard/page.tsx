import React from 'react';
import Image from 'next/image';
import GigbitBadge from '@/components/shared/GigbitBadge';

// Sample data - will be fetched from API in the real implementation
const leaderboardData = [
  {
    id: '1',
    name: 'Aarav Sharma',
    avatarUrl: 'https://i.pravatar.cc/128?u=1',
    college: 'Delhi Technological University',
    completedProjects: 24,
    gigbits: 4850,
    rank: 1,
    trend: 'up'
  },
  {
    id: '2',
    name: 'Priya Singh',
    avatarUrl: 'https://i.pravatar.cc/128?u=2',
    college: 'IIT Bombay',
    completedProjects: 19,
    gigbits: 4210,
    rank: 2,
    trend: 'down'
  },
  {
    id: '3',
    name: 'Arjun Kumar',
    avatarUrl: 'https://i.pravatar.cc/128?u=3',
    college: 'Vellore Institute of Technology',
    completedProjects: 18,
    gigbits: 3980,
    rank: 3,
    trend: 'same'
  },
  {
    id: '4',
    name: 'Ananya Patel',
    avatarUrl: 'https://i.pravatar.cc/128?u=4',
    college: 'Manipal Institute of Technology',
    completedProjects: 16,
    gigbits: 3750,
    rank: 4,
    trend: 'up'
  },
  {
    id: '5',
    name: 'Rishi Choudhury',
    avatarUrl: 'https://i.pravatar.cc/128?u=5',
    college: 'BITS Pilani',
    completedProjects: 15,
    gigbits: 3480,
    rank: 5,
    trend: 'up'
  }
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Leaderboard</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Meet Gigsy&apos;s top performers! Students who excel in freelancing projects and earn the most Gigbits.
          </p>
        </div>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-full">All Time</button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">This Month</button>
          <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">This Week</button>
        </div>
        
        {/* Top 3 highlight */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          {/* 2nd Place */}
          <div className="relative py-16 md:py-24 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-md md:order-1 flex flex-col items-center">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">2</span>
            </div>
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={leaderboardData[1].avatarUrl}
                alt={leaderboardData[1].name}
                fill
                className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">{leaderboardData[1].name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{leaderboardData[1].college}</p>
            <GigbitBadge amount={leaderboardData[1].gigbits} showPrefix={false} />
            <p className="mt-3 text-sm">{leaderboardData[1].completedProjects} projects</p>
          </div>
          
          {/* 1st Place */}
          <div className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/30 rounded-xl shadow-md md:order-0 border border-amber-200 dark:border-amber-900/50 flex flex-col items-center">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-amber-400 dark:bg-amber-500 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <div className="relative w-28 h-28 mb-4">
              <Image
                src={leaderboardData[0].avatarUrl}
                alt={leaderboardData[0].name}
                fill
                className="rounded-full object-cover border-4 border-amber-300 dark:border-amber-500"
              />
            </div>
            <h3 className="text-2xl font-bold mb-1">{leaderboardData[0].name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{leaderboardData[0].college}</p>
            <GigbitBadge amount={leaderboardData[0].gigbits} showPrefix={false} size="lg" className="bg-amber-600" />
            <p className="mt-3 text-sm">{leaderboardData[0].completedProjects} projects</p>
          </div>
          
          {/* 3rd Place */}
          <div className="relative py-16 md:py-20 px-6 bg-white dark:bg-gray-800 rounded-xl shadow-md md:order-2 flex flex-col items-center">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold">3</span>
            </div>
            <div className="relative w-24 h-24 mb-4">
              <Image
                src={leaderboardData[2].avatarUrl}
                alt={leaderboardData[2].name}
                fill
                className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
            </div>
            <h3 className="text-xl font-bold mb-1">{leaderboardData[2].name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{leaderboardData[2].college}</p>
            <GigbitBadge amount={leaderboardData[2].gigbits} showPrefix={false} />
            <p className="mt-3 text-sm">{leaderboardData[2].completedProjects} projects</p>
          </div>
        </div>
        
        {/* Leaderboard table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  College
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Projects
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Gigbits
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {leaderboardData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {user.rank}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={user.avatarUrl}
                          alt={user.name}
                          fill
                          className="rounded-full"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.college}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.completedProjects}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <GigbitBadge amount={user.gigbits} showPrefix={false} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.trend === 'up' && (
                      <span className="text-green-600 dark:text-green-400">↑</span>
                    )}
                    {user.trend === 'down' && (
                      <span className="text-red-600 dark:text-red-400">↓</span>
                    )}
                    {user.trend === 'same' && (
                      <span className="text-gray-600 dark:text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
