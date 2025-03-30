// components/jobs/FilterSidebar.tsx
'use client'

import { useState } from 'react'

export default function FilterSidebar() {
  const [filters, setFilters] = useState({
    jobType: 'all',
    experience: 'all',
    postedDate: 'all',
    remote: false,
  })
  
  const handleFilterChange = (name: string, value: string | boolean) => {
    setFilters({
      ...filters,
      [name]: value
    })
  }
  
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Filters</h2>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Job Type</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={filters.jobType}
            onChange={(e) => handleFilterChange('jobType', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
          </select>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Experience Level</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={filters.experience}
            onChange={(e) => handleFilterChange('experience', e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
          </select>
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date Posted</span>
          </label>
          <select 
            className="select select-bordered w-full"
            value={filters.postedDate}
            onChange={(e) => handleFilterChange('postedDate', e.target.value)}
          >
            <option value="all">Any Time</option>
            <option value="day">Past 24 hours</option>
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
          </select>
        </div>
        
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Remote Only</span>
            <input 
              type="checkbox" 
              className="toggle toggle-primary" 
              checked={filters.remote}
              onChange={(e) => handleFilterChange('remote', e.target.checked)}
            />
          </label>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-block">Apply Filters</button>
        </div>
      </div>
    </div>
  )
}