'use client'

import { useState, useEffect } from 'react'
import JobCard from '@/components/jobs/JobCard'
import SearchBar from '@/components/jobs/SearchBar'
import FilterSidebar from '@/components/jobs/FilterSidebar'
import axios from 'axios'
import { Job, ApiResponse, JobRequest } from '@/types/jobs'
import { useBackendUser } from '@/components/hooks/useBackendUser'
import Link from 'next/link'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading your job recommendations...')
  const { id: backendUserId, isLoading: isUserLoading, isAuthenticated } = useBackendUser()

  useEffect(() => {
    async function fetchJobsByPreferences() {
      if (isUserLoading) return

      if (!backendUserId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setLoadingMessage('Loading your personalized job recommendations...')
        const response = await axios.get(`${API_BASE_URL}/jobs-user-preferences/${backendUserId}`)

        if (response.data && response.data["Jobs Based on your preferences"]) {
          const preferenceJobs = response.data["Jobs Based on your preferences"]

          const formattedJobs: Job[] = preferenceJobs.map((job: any) => ({
            id: job.id.toString(),
            title: job.title || 'Untitled Position',
            company: job.company || 'Unknown Company',
            location: job.location || 'Location not specified',
            link: job.link || '#',
            source: job.platform || 'Job Board',
          }))

          setJobs(formattedJobs)
        }
      } catch (err) {
        console.error('Error fetching preference-based jobs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobsByPreferences()
  }, [backendUserId, isUserLoading])

  const handleSearch = async (query: string, location: string) => {
    setLoading(true)
    setLoadingMessage('Searching for jobs...')
    setError('')

    const requestData: JobRequest = {
      keyword: query,
      location: location
    }

    try {
      const response = await axios.post<ApiResponse | any>(
        `${API_BASE_URL}/scrape_jobs`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      console.log('API Response:', response.data)
      let jobsList: Job[] = []
      if (response.data && response.data.jobs && Array.isArray(response.data.jobs)) {
        jobsList = response.data.jobs.map((job: any) => ({
          id: job.id ? job.id.toString() : `job-${Math.random().toString(36).substr(2, 9)}`,
          title: job.title || 'Untitled Position',
          company: job.company || 'Unknown Company',
          location: job.location || 'Location not specified',
          link: job.link || '#',
          source: job.platform || 'Job Board'
        }))
      }
      else if (!Array.isArray(response.data) && response.data !== null && typeof response.data === 'object') {
        const data = response.data as ApiResponse

        if (data.linkedin && Array.isArray(data.linkedin)) {
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
      }
      else if (Array.isArray(response.data)) {
        jobsList = response.data.map((job) => ({
          id: job.id ? job.id.toString() : `job-${Math.random().toString(36).substr(2, 9)}`,
          title: job.title,
          company: job.company,
          location: job.location,
          link: job.link,
          source: job.platform || 'Job Board'
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

  const renderJobsContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="loading loading-spinner loading-lg mb-4"></div>
          <p className="text-gray-600">{loadingMessage}</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )
    }

    if (jobs.length > 0) {
      return (
        <div className="grid grid-cols-1 gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )
    }

    if (!isAuthenticated || !backendUserId) {
      return (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Get personalized job recommendations</h3>
          <p className="text-gray-600 mb-4">Sign in to see jobs based on your preferences</p>
          <Link href="/login" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      )
    }

    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
        <p className="text-gray-600 mb-4">
          {jobs.length === 0 ?
            "Try searching for jobs above or update your preferences" :
            "Try adjusting your search criteria"}
        </p>
        <Link href="/preferences" className="btn btn-primary">
          Update Preferences
        </Link>
      </div>
    )
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
          {renderJobsContent()}
        </div>
      </div>
    </div>
  )
}
