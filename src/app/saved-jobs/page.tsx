'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  AiOutlineCalendar,
  AiOutlineDollar,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
  AiOutlineDelete,
  AiOutlineAppstore,
  AiOutlineSearch
} from 'react-icons/ai';
import { CiBookmark } from 'react-icons/ci';
import axios from 'axios';
import { Job } from '@/types/jobs';
import { useBackendUser } from '@/components/hooks/useBackendUser';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface SavedJob extends Job {
  dateSaved?: string;
  type?: string;
  platform?: string;
}

export default function SavedJobsPage() {
  const { data: session, status } = useSession();
  const { id: backendUserId, isLoading: isUserLoading, error: userError } = useBackendUser();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalSavedJobs, setTotalSavedJobs] = useState<number>(0);

  useEffect(() => {
    async function fetchSavedJobs() {
      if (status !== 'authenticated' || !backendUserId) return;

      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/saved-jobs/${backendUserId}`);

        const totalJobs = response.data["Total Saved Jobs"] || 0;
        setTotalSavedJobs(totalJobs);

        const formattedJobs: SavedJob[] = response.data["Saved Jobs"].map((job: any) => ({
          id: job.id.toString(),
          title: job.title || 'Untitled Position',
          company: job.company || 'Unknown Company',
          location: job.location || 'Location not specified',
          link: job.link || '#',
          salary: job.salary || undefined,
          postedAt: job.postedAt || undefined,
          description: job.description || undefined,
          source: job.source || undefined,
          dateSaved: new Date().toISOString().split('T')[0],
          type: 'Full-time',
          platform: job.platform || 'Unknown Source'
        }));

        setSavedJobs(formattedJobs);
      } catch (err) {
        console.error("Error fetching saved jobs:", err);
        setError("Failed to load saved jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSavedJobs();
  }, [status, backendUserId]);


  const removeJob = async (jobId: string) => {
    if (!backendUserId) return;

    try {
      await axios.delete(`${API_BASE_URL}/unsave-job`, {
        data: {
          user_id: backendUserId,
          job_id: parseInt(jobId)
        }
      });
      setSavedJobs(savedJobs.filter(job => job.id !== jobId));
      setTotalSavedJobs(prev => prev - 1);
      showToast('Job removed from saved list', 'success');
    } catch (err) {
      console.error("Error removing saved job:", err);
      showToast('Failed to remove job. Please try again.', 'error');

    }
  };

  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  }>({
    show: false,
    message: '',
    type: 'info'
  });


  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };


  // Filter jobs based on search term and filter type
  const filteredJobs = savedJobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'all') return matchesSearch;
    return matchesSearch && job.type?.toLowerCase() === filterType.toLowerCase();
  });


  if (status === 'loading' || isLoading || isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }


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


  if (!backendUserId) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl text-warning">User ID Missing</h2>
            <p>Your account information could not be loaded properly.</p>
            <div className="card-actions justify-center mt-4">
              <Link href="/login" className="btn btn-primary">Login Again</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || userError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl text-error">Error</h2>
            <p>{error || userError}</p>
            <div className="card-actions justify-center mt-4">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {toast.show && (
        <div className={`toast toast-top toast-end z-50`}>
          <div className={`alert ${toast.type === 'success' ? 'alert-success' :
            toast.type === 'error' ? 'alert-error' : 'alert-info'
            }`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Saved Jobs</h1>
        <div className="badge badge-primary badge-lg">
          {totalSavedJobs} {totalSavedJobs === 1 ? 'Job' : 'Jobs'}
        </div>
      </div>
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
                      <AiOutlineAppstore className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="card-title text-lg">{job.title}</h2>
                    <div className="text-sm font-medium mb-2">{job.company}</div>
                    <div className="badge badge-outline badge-sm">{job.source || job.platform}</div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <AiOutlineEnvironment className="text-gray-500" />
                        <span>{job.location}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-1">
                          <AiOutlineDollar className="text-gray-500" />
                          <span>{job.salary}</span>
                        </div>
                      )}
                      {job.type && (
                        <div className="flex items-center gap-1">
                          <AiOutlineClockCircle className="text-gray-500" />
                          <span>{job.type}</span>
                        </div>
                      )}
                      {job.postedAt && (
                        <div className="flex items-center gap-1">
                          <AiOutlineCalendar className="text-gray-500" />
                          <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 justify-end">
                    {job.dateSaved && (
                      <span className="text-xs text-gray-500">
                        Saved {new Date(job.dateSaved).toLocaleDateString()}
                      </span>
                    )}
                    <div className="card-actions justify-end">
                      {job.link ? (
                        <a href={job.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                          View
                        </a>
                      ) : (
                        <Link href={`/jobs/${job.id}`} className="btn btn-primary btn-sm">
                          View
                        </Link>
                      )}
                      <button
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => removeJob(job.id)}
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
