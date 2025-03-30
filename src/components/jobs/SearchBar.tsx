// components/jobs/SearchBar.tsx
'use client'

import { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', { query, location })
  }
  
  return (
    <form onSubmit={handleSearch} className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">What</span>
            </label>
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              className="input input-bordered w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Where</span>
            </label>
            <input
              type="text"
              placeholder="City, state, or remote"
              className="input input-bordered w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <div className="form-control md:mt-8">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>
    </form>
  )
}