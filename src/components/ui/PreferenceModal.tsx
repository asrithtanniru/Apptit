'use client'

import { useState } from 'react'
import axios from 'axios'

interface PreferencesModalProps {
  userId: number
  onComplete: () => void
  onSkip: () => void
}

export default function PreferencesModal({ userId, onComplete, onSkip }: PreferencesModalProps) {
  const [jobTitles, setJobTitles] = useState<string[]>([''])
  const [locations, setLocations] = useState<string[]>([''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAddJobTitle = () => {
    setJobTitles([...jobTitles, ''])
  }

  const handleAddLocation = () => {
    setLocations([...locations, ''])
  }

  const handleJobTitleChange = (index: number, value: string) => {
    const updatedTitles = [...jobTitles]
    updatedTitles[index] = value
    setJobTitles(updatedTitles)
  }

  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = [...locations]
    updatedLocations[index] = value
    setLocations(updatedLocations)
  }

  const removeJobTitle = (index: number) => {
    if (jobTitles.length > 1) {
      const updatedTitles = [...jobTitles]
      updatedTitles.splice(index, 1)
      setJobTitles(updatedTitles)
    }
  }

  const removeLocation = (index: number) => {
    if (locations.length > 1) {
      const updatedLocations = [...locations]
      updatedLocations.splice(index, 1)
      setLocations(updatedLocations)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
    
    const filteredTitles = jobTitles.filter(title => title.trim() !== '')
    const filteredLocations = locations.filter(location => location.trim() !== '')
    
    if (filteredTitles.length === 0 || filteredLocations.length === 0) {
      setError('Please add at least one job title and location')
      setIsLoading(false)
      return
    }
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      
      await axios.post(`${API_URL}/add-preferences`, {
        user_id: userId,
        title: filteredTitles,
        location: filteredLocations
      })
      
      onComplete()
    } catch (err) {
      console.error('Error saving preferences:', err)
      setError('Failed to save preferences. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Set Your Job Preferences</h2>
          <p className="text-gray-600 mb-6">
            Help us find the best job opportunities for you by setting your preferences.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Job Titles You're Interested In
            </label>
            {jobTitles.map((title, index) => (
              <div key={`title-${index}`} className="flex mb-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleJobTitleChange(index, e.target.value)}
                  placeholder="e.g. Software Engineer, Data Scientist"
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeJobTitle(index)}
                  className="bg-red-50 text-red-500 px-3 py-2 rounded-r-lg hover:bg-red-100"
                  disabled={jobTitles.length <= 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddJobTitle}
              className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800"
            >
              + Add Another Job Title
            </button>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Preferred Locations
            </label>
            {locations.map((location, index) => (
              <div key={`location-${index}`} className="flex mb-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => handleLocationChange(index, e.target.value)}
                  placeholder="e.g. New York, Remote"
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="bg-red-50 text-red-500 px-3 py-2 rounded-r-lg hover:bg-red-100"
                  disabled={locations.length <= 1}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddLocation}
              className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800"
            >
              + Add Another Location
            </button>
          </div>
          
          <div className="flex justify-end mt-8 space-x-3">
            <button
              type="button"
              onClick={onSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isLoading}
            >
              Skip for Now
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Preferences'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
