'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  AiOutlineUser, 
  AiOutlineMail, 
  AiOutlineCalendar, 
  AiOutlineEdit,
  AiOutlineKey,
  AiOutlineIdcard
} from 'react-icons/ai';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  

  if (status === 'loading') {
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
  
  // Google auth might provide additional data in the raw object
//   const accountCreated = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Not available';
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
                    <img src={userImage} alt={`${userName}'s`} />
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
                  <AiOutlineCalendar className="text-primary text-xl" />
                  <div>
                    <div className="text-sm text-gray-500">Account Created</div>
                    {/* <div>{accountCreated}</div> */}
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
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/settings" className="btn btn-outline gap-2">
                  <AiOutlineKey />
                  Account Settings
                </Link>
                <Link href="/job-alerts" className="btn btn-outline gap-2">
                  <AiOutlineMail />
                  Job Alerts
                </Link>
                <Link href="/saved-jobs" className="btn btn-outline gap-2">
                  <AiOutlineMail />
                  Saved Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Job Applications</h3>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Applications</div>
                <div className="stat-value">0</div>
                <div className="stat-desc">Start applying to jobs</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">Saved Jobs</h3>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Bookmarks</div>
                <div className="stat-value">0</div>
                <div className="stat-desc">Jobs you've saved</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}