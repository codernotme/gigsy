import React from 'react';
import Link from 'next/link';
import GigbitBadge from '../shared/GigbitBadge';

export interface ProjectProps {
  id: string;
  title: string;
  description: string;
  budget: number;
  department: string;
  departmentShortName: string;
  bidCount: number;
  daysLeft: number;
  status: 'open' | 'assigned' | 'completed';
  gigbitsReward: number;
  slug: string;
}

export default function ProjectCard({ 
  id,
  title, 
  description, 
  budget, 
  department, 
  departmentShortName, 
  bidCount, 
  daysLeft, 
  status,
  gigbitsReward,
}: ProjectProps) {
  const statusColors = {
    open: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    assigned: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    completed: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
  };
  
  const statusText = {
    open: 'Open for Bids',
    assigned: 'In Progress',
    completed: 'Completed'
  };
  
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs font-semibold py-1 px-2 rounded-full ${statusColors[status]}`}>
            {statusText[status]}
          </span>
          <GigbitBadge amount={gigbitsReward} />
        </div>
        
        <Link href={`/projects/${id}`} className="block">
          <h3 className="text-xl font-semibold mt-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{title}</h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center">
              <span className="font-semibold text-indigo-700 dark:text-indigo-300">{departmentShortName}</span>
            </div>
            <span className="ml-2 text-sm">{department}</span>
          </div>
          <div>
            <span className="font-bold">₹{budget.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {bidCount} bid{bidCount !== 1 ? 's' : ''} • {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
            </span>
            
            {status === 'open' && (
              <Link 
                href={`/projects/${id}/bid`}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm transition-colors"
              >
                Place Bid
              </Link>
            )}
            
            {status === 'assigned' && (
              <span className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded text-sm">
                In Progress
              </span>
            )}
            
            {status === 'completed' && (
              <Link 
                href={`/projects/${id}`}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded text-sm"
              >
                View Details
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
