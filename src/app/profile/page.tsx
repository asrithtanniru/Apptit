'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineCalendar,
  AiOutlineEdit,
  AiOutlineKey,
  AiOutlineIdcard,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineSetting,
  AiOutlineTag
} from 'react-icons/ai';
import axios from 'axios';
import { useBackendUser } from '@/components/hooks/useBackendUser';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { id: backendUserId, isLoading: isUserLoading } = useBackendUser();
  const [isEditing, setIsEditing] = useState(false);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [preferences, setPreferences] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);


  useEffect(() => {
    async function fetchUserData() {
      if (!backendUserId) return;

      setIsLoadingData(true);

      try {
        const savedJobsResponse = await axios.get(`${API_BASE_URL}/saved-jobs/${backendUserId}`);
        if (savedJobsResponse.data && savedJobsResponse.data["Total Saved Jobs"] !== undefined) {
          setSavedJobsCount(savedJobsResponse.data["Total Saved Jobs"]);
        }

        const preferencesResponse = await axios.get(`${API_BASE_URL}/users/${backendUserId}/preferences`);
        if (preferencesResponse.data) {
          setPreferences(preferencesResponse.data);
        }

      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingData(false);
      }
    }

    fetchUserData();
  }, [backendUserId]);

  if (status === 'loading' || isUserLoading || isLoadingData) {
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
            <p>Please log in to view your profile.</p>
            <div className="card-actions justify-center mt-4">
              <Link href="/login" className="btn btn-primary">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { user } = session;
  const userName = user?.name || 'Not provided';
  const userEmail = user?.email || 'Not provided';
  const userImage = user?.image;
  const userId = user?.id || 'Not available';

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            <div className="flex flex-col items-center">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {userImage ? (
                    <img src={userImage} alt={`${userName}'s profile`} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                      <AiOutlineUser className="h-12 w-12" />
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-bold mt-4 text-center">{userName}</h2>
              <div className="badge badge-primary mt-2">Google Account</div>

            </div>


            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4">Account Information</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <AiOutlineMail className="text-primary text-xl" />
                  <div>
                    <div className="text-sm text-gray-500">Email Address</div>
                    <div>{userEmail}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <AiOutlineTag className="text-primary text-xl" />
                  <div>
                    <div className="text-sm text-gray-500">Job Preferences</div>
                    <div>
                      {preferences.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {preferences.map((pref) => (
                            <div key={pref.id} className="flex flex-col">
                              <div className="text-sm">
                                <span className="font-medium">Roles:</span> {pref.title.join(', ')}
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">Locations:</span> {pref.location.join(', ')}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Link href="/preferences" className="text-blue-500 hover:underline text-sm">
                          Set your job preferences
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <AiOutlineIdcard className="text-primary text-xl" />
                  <div>
                    <div className="text-sm text-gray-500">Account ID</div>
                    <div className="text-sm font-mono">{userId}</div>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/preferences" className="btn btn-outline gap-2">
                  <AiOutlineSetting />
                  Job Preferences
                </Link>
                <Link href="/saved-jobs" className="btn btn-outline gap-2">
                  <AiOutlineHeart />
                  Saved Jobs
                </Link>
                <Link href="/jobs" className="btn btn-outline gap-2">
                  <AiOutlineSearch />
                  Search Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <AiOutlineSearch className="text-primary" />
              Job Matches
            </h3>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Matched Jobs</div>
                <div className="stat-value">
                  {preferences.length > 0 ? "Available" : "0"}
                </div>
                <div className="stat-desc">
                  {preferences.length > 0 ? (
                    <Link href="/jobs" className="text-blue-500 hover:underline">
                      View your matches
                    </Link>
                  ) : (
                    "Set preferences to see matches"
                  )}
                </div>
              </div>
            </div>
            {preferences.length === 0 && (
              <div className="mt-4">
                <Link href="/preferences" className="btn btn-primary btn-sm">
                  Set Preferences
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title flex items-center gap-2">
              <AiOutlineHeart className="text-primary" />
              Saved Jobs
            </h3>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Bookmarks</div>
                <div className="stat-value">{savedJobsCount}</div>
                <div className="stat-desc">
                  {savedJobsCount > 0 ? (
                    <Link href="/saved-jobs" className="text-blue-500 hover:underline">
                      View saved jobs
                    </Link>
                  ) : (
                    "Jobs you've saved"
                  )}
                </div>
              </div>
            </div>
            {savedJobsCount === 0 && (
              <div className="mt-4">
                <Link href="/jobs" className="btn btn-primary btn-sm">
                  Find Jobs
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {preferences.length > 0 && (
        <div className="card bg-base-100 shadow-xl mt-6">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h3 className="card-title flex items-center gap-2">
                <AiOutlineSetting className="text-primary" />
                Your Job Preferences
              </h3>
              <Link href="/preferences" className="btn btn-sm btn-ghost">
                <AiOutlineEdit />
                Edit
              </Link>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>Roles</th>
                    <th>Locations</th>
                  </tr>
                </thead>
                <tbody>
                  {preferences.map((pref) => (
                    <tr key={pref.id}>
                      <td>{pref.title.join(', ')}</td>
                      <td>{pref.location.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
