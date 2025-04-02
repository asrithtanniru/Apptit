'use client'

import { useState } from 'react'
import JobCard from '@/components/jobs/JobCard'
import SearchBar from '@/components/jobs/SearchBar'
import FilterSidebar from '@/components/jobs/FilterSidebar'
import axios from 'axios'
import { Job, ApiResponse, JobRequest } from '@/types/jobs'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  
  const handleSearch = async (query: string, location: string) => {
    setLoading(true)
    setError('')
    
    const requestData: JobRequest = {
      keyword: query,
      location: location
    }
    
    try {
      const response = await axios.post<ApiResponse | Job[]>(
        `${BACKEND_URL}/scrape_jobs`, 
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
      console.log('API Response:', response.data)
      let jobsList: Job[] = []
      
      // Check if response.data is ApiResponse type
      if (!Array.isArray(response.data) && response.data !== null && typeof response.data === 'object') {
        const data = response.data as ApiResponse
        
        if (data.linkedin && Array.isArray(data.linkedin)) {
          // Process LinkedIn jobs
          jobsList = [
            ...jobsList,
            ...data.linkedin.map(job => ({
              id: `linkedin-${Math.random().toString(36).substr(2, 9)}`,
              title: job.title,
              company: job.company,
              location: job.location,
              link: job.link,
              source: 'LinkedIn'
            }))
          ]
        }
        
        if (data.glassdoor && data.glassdoor.jobs && 
            Array.isArray(data.glassdoor.jobs)) {

          jobsList = [
            ...jobsList,
            ...data.glassdoor.jobs.map(job => ({
              id: `glassdoor-${Math.random().toString(36).substr(2, 9)}`,
              title: job.title,
              company: job.company,
              location: job.location,
              link: job.link,
              source: 'Glassdoor'
            }))
          ]
        }
      } else if (Array.isArray(response.data)) {
        // If API returns a flat array of jobs
        jobsList = response.data.map(({ id, ...job }) => ({
          id: `job-${Math.random().toString(36).substr(2, 9)}`,
          ...job
        }))
      }
      
      setJobs(jobsList)
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to fetch jobs. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <FilterSidebar />
        </div>
        
        <div className="w-full md:w-3/4 lg:w-4/5">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="loading loading-spinner loading-lg"></div>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or search for a different position</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}