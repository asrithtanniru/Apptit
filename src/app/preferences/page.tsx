'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineTag,
  AiOutlineSave,
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineEdit
} from 'react-icons/ai';
import axios from 'axios';
import { useBackendUser } from '@/components/hooks/useBackendUser';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function PreferencesPage() {
  const { data: session, status } = useSession();
  const { id: backendUserId, isLoading: isUserLoading } = useBackendUser();

  const [preferences, setPreferences] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobTitles, setJobTitles] = useState<string[]>(['']);
  const [locations, setLocations] = useState<string[]>(['']);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    async function fetchPreferences() {
      if (!backendUserId) return;

      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${backendUserId}/preferences`);
        if (response.data && response.data.length > 0) {
          setPreferences(response.data);

          const firstPref = response.data[0];
          setJobTitles(firstPref.title);
          setLocations(firstPref.location);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
        setErrorMessage("Failed to load your preferences,try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPreferences();
  }, [backendUserId]);


  const addTitleField = () => {
    setJobTitles([...jobTitles, '']);
  };

  const removeTitleField = (index: number) => {
    const updatedTitles = [...jobTitles];
    updatedTitles.splice(index, 1);
    setJobTitles(updatedTitles);
  };

  const addLocationField = () => {
    setLocations([...locations, '']);
  };


  const removeLocationField = (index: number) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  const handleTitleChange = (index: number, value: string) => {
    const updatedTitles = [...jobTitles];
    updatedTitles[index] = value;
    setJobTitles(updatedTitles);
  };
  const handleLocationChange = (index: number, value: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  // saving pref
  const savePreferences = async () => {

    const filteredTitles = jobTitles.filter(title => title.trim() !== '');
    const filteredLocations = locations.filter(location => location.trim() !== '');

    if (filteredTitles.length === 0 || filteredLocations.length === 0) {
      setErrorMessage("Please add at least one job title and location");
      return;
    }

    setIsLoading(true);
    try {
      let response;
      if (preferences.length > 0) {
        //existing 
        response = await axios.patch(`${API_BASE_URL}/update-preferences`, {
          user_id: backendUserId,
          title: filteredTitles,
          location: filteredLocations
        });
      } else {
        //new
        response = await axios.post(`${API_BASE_URL}/add-preferences`, {
          user_id: backendUserId,
          title: filteredTitles,
          location: filteredLocations
        });
      }

      setSuccessMessage("Preferences saved successfully!");
      setErrorMessage('');


      const updatedPrefResponse = await axios.get(`${API_BASE_URL}/users/${backendUserId}/preferences`);
      setPreferences(updatedPrefResponse.data);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error("Error saving preferences:", error);
      setErrorMessage("Failed to save preferences. Please try again.");
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  if (status === 'loading' || isUserLoading || isLoading) {
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
            <p>Please login to manage your job preferences.</p>
            <div className="card-actions justify-center mt-4">
              <Link href="/login" className="btn btn-primary">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl flex items-center gap-2">
            <AiOutlineTag className="text-primary" />
            Job Preferences
          </h2>
          <p className="text-gray-600 mb-6">
            Customize your job search preferences to find the most relevant opportunities.
          </p>

          {successMessage && (
            <div className="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{successMessage}</span>
            </div>
          )}

          {errorMessage && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {!isEditing && preferences.length > 0 ? (
            <div className="mb-6">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Job Titles</th>
                      <th>Locations</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preferences.map((pref) => (
                      <tr key={pref.id}>
                        <td>
                          <ul className="list-disc list-inside">
                            {pref.title.map((title: string, index: number) => (
                              <li key={index}>{title}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul className="list-disc list-inside">
                            {pref.location.map((location: string, index: number) => (
                              <li key={index}>{location}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <AiOutlineEdit className="mr-2" />
                  Edit Preferences
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <AiOutlineSearch />
                  Job Titles
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Add job titles or roles you're interested in (e.g., Software Engineer, Product Manager)
                </p>

                {jobTitles.map((title, index) => (
                  <div key={index} className="flex items-center mb-2 gap-2">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleTitleChange(index, e.target.value)}
                      placeholder="Enter job title"
                      className="input input-bordered w-full"
                    />
                    {jobTitles.length > 1 && (
                      <button
                        className="btn btn-square btn-outline btn-error btn-sm"
                        onClick={() => removeTitleField(index)}
                      >
                        <AiOutlineClose />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  className="btn btn-outline btn-sm mt-2"
                  onClick={addTitleField}
                >
                  <AiOutlinePlus className="mr-1" />
                  Add Another Title
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <AiOutlineTag />
                  Locations
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Add locations where you're looking for work (e.g., Remote, New York, London)
                </p>

                {locations.map((location, index) => (
                  <div key={index} className="flex items-center mb-2 gap-2">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => handleLocationChange(index, e.target.value)}
                      placeholder="Enter location"
                      className="input input-bordered w-full"
                    />
                    {locations.length > 1 && (
                      <button
                        className="btn btn-square btn-outline btn-error btn-sm"
                        onClick={() => removeLocationField(index)}
                      >
                        <AiOutlineClose />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  className="btn btn-outline btn-sm mt-2"
                  onClick={addLocationField}
                >
                  <AiOutlinePlus className="mr-1" />
                  Add Another Location
                </button>
              </div>

              <div className="flex justify-end gap-2">
                {preferences.length > 0 && (
                  <button
                    className="btn btn-ghost"
                    onClick={() => setIsEditing(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                )}
                <button
                  className="btn btn-primary"
                  onClick={savePreferences}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <AiOutlineSave className="mr-1" />
                      Save Preferences
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h3 className="card-title">What happens next?</h3>
          <div className="py-4">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h4 className="font-medium">Set your preferences</h4>
                <p className="text-sm text-gray-600">Add the job titles and locations you're interested in.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-4">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h4 className="font-medium">Get matched with jobs</h4>
                <p className="text-sm text-gray-600">Our system will match you with relevant job openings based on your preferences.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h4 className="font-medium">View and apply</h4>
                <p className="text-sm text-gray-600">View your matched jobs and apply to the ones you like.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Link href="/profile" className="btn btn-outline">
              Back to Profile
            </Link>
            <Link href="/jobs" className="btn btn-primary">
              <AiOutlineSearch className="mr-1" />
              Browse Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
