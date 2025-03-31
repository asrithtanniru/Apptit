'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  AiOutlineUser, 
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
  AiOutlineDelete,
  AiOutlineAppstore,
  AiOutlineSearch
} from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';

export default function SavedJobsPage() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  
  // Demo saved jobs data - in a real app, you would fetch this from an API
  const [savedJobs, setSavedJobs] = useState([
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Remote',
      salary: '$90,000 - $120,000',
      type: 'Full-time',
      datePosted: '2025-03-24',
      dateSaved: '2025-03-26',
      logo: null
    },
    {
      id: '2',
      title: 'Backend Engineer',
      company: 'DataSystems',
      location: 'New York, NY',
      salary: '$100,000 - $130,000',
      type: 'Full-time',
      datePosted: '2025-03-22',
      dateSaved: '2025-03-25',
      logo: null
    }
  ]);
  
  // Loading state
  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }
  
  // Not logged in state
  if (status !== 'authenticated') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">Access Required</h2>
            <p>Please log in to view your saved jobs.</p>
            <div className="card-actions justify-center mt-4">
              <Link href="/login" className="btn btn-primary">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Filter jobs based on search term and filter type
  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && job.type.toLowerCase() === filterType.toLowerCase();
  });
  
  // Handle removing a job from saved list
//   const removeJob = (jobId) => {
//     setSavedJobs(savedJobs.filter(job => job.id !== jobId));
//   };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <CiBookmark className="text-primary text-2xl" />
          <h1 className="text-2xl font-bold">Saved Jobs</h1>
        </div>
        
        <div className="w-full md:w-auto">
          <div className="join">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search saved jobs..." 
                className="input input-bordered join-item w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AiOutlineSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
            <select 
              className="select select-bordered join-item"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>
      </div>
      
      {filteredJobs.length === 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center text-center py-12">
            <div className="text-5xl text-gray-300 mb-4">
              <CiBookmark />
            </div>
            <h2 className="card-title text-xl">No saved jobs found</h2>
            {savedJobs.length > 0 ? (
              <p>Try adjusting your search filters.</p>
            ) : (
              <p>Start saving jobs you're interested in for easy access later.</p>
            )}
            <div className="card-actions justify-center mt-4">
              <Link href="/jobs" className="btn btn-primary">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="avatar">
                    <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center">
                      {job.logo ? (
                        <img src={job.logo} alt={`${job.company} logo`} />
                      ) : (
                        <AiOutlineAppstore className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="card-title text-lg">{job.title}</h2>
                    <div className="text-sm font-medium mb-2">{job.company}</div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <AiOutlineEnvironment className="text-gray-500" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AiOutlineDollar className="text-gray-500" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AiOutlineClockCircle className="text-gray-500" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AiOutlineCalendar className="text-gray-500" />
                        <span>Posted {new Date(job.datePosted).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2 justify-end">
                    <span className="text-xs text-gray-500">
                      Saved {new Date(job.dateSaved).toLocaleDateString()}
                    </span>
                    <div className="card-actions justify-end">
                      <Link href={`/jobs/${job.id}`} className="btn btn-primary btn-sm">
                        View
                      </Link>
                      <button 
                        className="btn btn-ghost btn-sm text-error" 
                        // onClick={() => removeJob(job.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link href="/jobs" className="btn btn-outline btn-wide">
          Browse More Jobs
        </Link>
      </div>
    </div>
  );
}