import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GigbitBadge from '@/components/shared/GigbitBadge';

// Sample data - will be replaced with API calls in actual implementation
const eventsData = [
  {
    id: '1',
    title: 'Freelancing Workshop',
    description: 'Learn how to succeed in freelancing while still in college. Tips from industry experts on pricing, client management, and building your portfolio.',
    date: '2025-05-15',
    time: '14:00 - 16:30',
    venue: 'Main Auditorium, Block-C',
    organizer: 'Gigsy & Entrepreneurship Cell',
    isVirtual: false,
    gigbitsReward: 10,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'freelancing-workshop-2025',
    tags: ['workshop', 'career', 'freelancing']
  },
  {
    id: '2',
    title: 'Hackathon: Build for Campus',
    description: 'Create solutions that enhance campus life. Cash prizes and Gigbits for all participants. Form teams of up to 4 members.',
    date: '2025-05-22',
    time: '09:00 - 21:00',
    venue: 'Innovation Center',
    organizer: 'Computer Science Society',
    isVirtual: false,
    gigbitsReward: 50,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'campus-hackathon-2025',
    tags: ['hackathon', 'coding', 'prizes']
  },
  {
    id: '3',
    title: 'Virtual Design Thinking Workshop',
    description: 'An online workshop focusing on design thinking principles for product development and problem-solving.',
    date: '2025-05-28',
    time: '18:00 - 20:00',
    venue: 'Zoom (Link will be shared after registration)',
    organizer: 'Design Club',
    isVirtual: true,
    gigbitsReward: 15,
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'virtual-design-thinking-workshop',
    tags: ['workshop', 'design', 'virtual']
  },
  {
    id: '4',
    title: 'Networking Mixer: Connect with Alumni',
    description: 'Meet successful alumni who have built careers in freelancing, entrepreneurship, and tech. Great opportunity to make industry connections.',
    date: '2025-06-05',
    time: '17:00 - 19:30',
    venue: 'Central Lawn',
    organizer: 'Alumni Association & Gigsy',
    isVirtual: false,
    gigbitsReward: 20,
    image: 'https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'alumni-networking-mixer',
    tags: ['networking', 'career', 'alumni']
  },
  {
    id: '5',
    title: 'Showcase: Student Freelance Projects',
    description: 'A showcase of the best projects completed through Gigsy. Come see what your peers have accomplished and get inspired!',
    date: '2025-06-12',
    time: '13:00 - 17:00',
    venue: 'Exhibition Hall',
    organizer: 'Gigsy',
    isVirtual: false,
    gigbitsReward: 5,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    slug: 'student-project-showcase',
    tags: ['showcase', 'exhibition', 'projects']
  }
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover workshops, hackathons, and networking opportunities. Earn Gigbits by participating!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Filter:</span>
            <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-full text-sm">
              All Events
            </button>
            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-sm">
              This Month
            </button>
            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-sm">
              Virtual
            </button>
            <button className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-sm">
              Workshops
            </button>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search events..." 
              className="pl-9 pr-3 py-1.5 w-full sm:w-64 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Events List */}
        <div className="space-y-6">
          {eventsData.map((event) => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
              <div className="md:flex">
                <div className="md:flex-shrink-0 relative h-48 md:h-auto md:w-60">
                  <Image 
                    src={event.image} 
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  {event.isVirtual && (
                    <div className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
                      Virtual Event
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{event.title}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Organized by {event.organizer}</p>
                      </div>
                      <GigbitBadge amount={event.gigbitsReward} />
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag, index) => (
                        <span key={index} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs py-1 px-2 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-gray-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-gray-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-gray-500 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.venue}</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/events/${event.slug}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm transition-colors"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex justify-center">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}
