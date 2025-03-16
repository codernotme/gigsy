'use client';
import React, { useState } from 'react';
import ProjectCard, { ProjectProps } from '@/components/projects/ProjectCard';

// Define a type that matches the ProjectProps interface
type ProjectData = Omit<ProjectProps, 'key'>; // Exclude 'key' as it's added by React

// Sample data - will be replaced with API calls in actual implementation
const projectsData: ProjectData[] = [
  {
    id: '1',
    title: 'Department Website Redesign',
    description: 'Looking for a talented designer to refresh our department website with modern UI elements and ensure mobile responsiveness. Must have experience with React and Next.js.',
    budget: 4500,
    department: 'Computer Science Department',
    departmentShortName: 'CS',
    bidCount: 14,
    daysLeft: 2,
    status: 'open',
    gigbitsReward: 50,
    slug: 'department-website-redesign'
  },
  {
    id: '2',
    title: 'Event Management App',
    description: 'Build a mobile application for managing college events, including registration, check-in, and feedback. The app should be built using Flutter for cross-platform compatibility.',
    budget: 7500,
    department: 'Student Affairs',
    departmentShortName: 'SA',
    bidCount: 8,
    daysLeft: 3,
    status: 'open',
    gigbitsReward: 75,
    slug: 'event-management-app'
  },
  {
    id: '3',
    title: 'Research Data Visualization',
    description: 'Create interactive visualizations for complex research data sets. Must have experience with D3.js or similar data visualization libraries.',
    budget: 6000,
    department: 'Physics Department',
    departmentShortName: 'PH',
    bidCount: 5,
    daysLeft: 4,
    status: 'open',
    gigbitsReward: 60,
    slug: 'research-data-visualization'
  },
  {
    id: '4',
    title: 'Social Media Campaign',
    description: 'Design and execute a social media campaign for our upcoming tech fest. Looking for creative content ideas and strategy across Instagram, Twitter, and LinkedIn.',
    budget: 3500,
    department: 'Cultural Committee',
    departmentShortName: 'CC',
    bidCount: 22,
    daysLeft: 1,
    status: 'open',
    gigbitsReward: 45,
    slug: 'social-media-campaign'
  },
  {
    id: '5',
    title: 'Library Management System',
    description: 'Develop a new book tracking and reservation system for our library. Should include barcode scanning functionality and integrate with our current student database.',
    budget: 8500,
    department: 'Library',
    departmentShortName: 'LIB',
    bidCount: 10,
    daysLeft: 5,
    status: 'open',
    gigbitsReward: 85,
    slug: 'library-management-system'
  },
  {
    id: '6',
    title: 'Campus Tour VR Experience',
    description: 'Create a virtual reality tour of our campus for remote orientation. Should be accessible through web browsers and common VR headsets.',
    budget: 9000,
    department: 'Admissions Office',
    departmentShortName: 'AO',
    bidCount: 6,
    daysLeft: 7,
    status: 'open',
    gigbitsReward: 100,
    slug: 'campus-tour-vr-experience'
  }
];

export default function ProjectsPage() {
  const [showBidModal, setShowBidModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projectsData.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projectsData.length / projectsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Available Projects</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse available freelance opportunities across all campus departments. Use your bid allocation wisely!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Filter by:</span>
            <select className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Engineering</option>
              <option>Business</option>
              <option>Arts & Humanities</option>
              <option>Student Services</option>
            </select>
            <select className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
              <option>All Budget Ranges</option>
              <option>Under ₹5,000</option>
              <option>₹5,000 - ₹10,000</option>
              <option>₹10,000 - ₹20,000</option>
              <option>Above ₹20,000</option>
            </select>
            <select className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm">
              <option>Deadline</option>
              <option>Ending Soon</option>
              <option>Newly Posted</option>
              <option>Most Bids</option>
            </select>
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-9 pr-3 py-1.5 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Available Projects: </span>
            <span className="font-medium">{projectsData.length}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Your Bid Balance: </span>
            <span className="font-medium">78 Bids</span>
          </div>
          <div>
            <button 
              onClick={() => setShowBidModal(true)}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              How bidding works?
            </button>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center space-x-1">
          <button 
            className="px-3 py-1 rounded bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &laquo;
          </button>
          
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button 
              key={idx}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => handlePageChange(idx + 1)}
              aria-label={`Page ${idx + 1}`}
              aria-current={currentPage === idx + 1 ? 'page' : undefined}
            >
              {idx + 1}
            </button>
          ))}
          
          <button 
            className="px-3 py-1 rounded bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &raquo;
          </button>
        </div>
        
        {/* How Bidding Works Modal */}
        {showBidModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">How Bidding Works</h3>
                <button 
                  onClick={() => setShowBidModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <p className="mb-3">As a student, you have a limited number of bids to allocate to projects:</p>
                <ul className="list-disc pl-5 mb-3 space-y-2">
                  <li>Each student receives 100 bids per semester</li>
                  <li>You can place between 1-10 bids on each project</li>
                  <li>Higher bids increase your chances of getting selected</li>
                  <li>Unused bids carry over to the next month</li>
                  <li>Earn extra bids by completing projects successfully</li>
                </ul>
                <p>Use your bids strategically to maximize your chances of landing projects that match your skills and interests!</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowBidModal(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
