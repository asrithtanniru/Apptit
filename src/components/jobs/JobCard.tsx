import { Job } from '@/types/jobs'
import axios from 'axios'
import { useState } from 'react'
import { useBackendUser } from '@/components/hooks/useBackendUser'

interface JobCardProps {
  job: Job;
}

const getSourceLogo = (source: string) => {
  switch (source?.toLowerCase()) {
    case 'linkedin':
      return 'https://media.licdn.com/dms/image/v2/D4E12AQH1Zci0N5h81g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1668339640418?e=2147483647&v=beta&t=8BAgWEbSU6_dLYI0cyPS6QmavHy6IMYvZww8O7WX_Og';
    case 'internshala':
      return 'https://placements.sscbs.du.ac.in/wp-content/uploads/2021/01/Internshala.png';
    case 'glassdoor':
      return 'https://1000logos.net/wp-content/uploads/2021/12/Glassdoor-Logo-2017.png';
    default:
      return null;
  }
};

export default function JobCard({ job }: JobCardProps) {
  const sourceLogo = job.source ? getSourceLogo(job.source) : null;
  const { id: userId, isAuthenticated } = useBackendUser();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSaveJob = async () => {
    if (!isAuthenticated || !userId) {
      setError('Please sign in to save jobs');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const response = await axios.post(`${API_BASE_URL}/save-job`, {
        user_id: userId,
        job_id: job.id
      });

      setSaved(true);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.detail === "Job already saved") {
        setSaved(true);
      } else {
        setError('Failed to save job');
        console.error('Error saving job:', err);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h2 className="card-title text-xl font-bold mb-1">
              {job.title}
            </h2>

            <p className="text-sm text-gray-600">
              {job.company} • {job.location}
              {job.salary && ` • ${job.salary}`}
            </p>

            {job.postedAt && (
              <p className="text-xs text-gray-500 mt-1">Posted {job.postedAt}</p>
            )}

            {job.description && (
              <p className="mt-2 text-gray-700">{job.description}</p>
            )}

            {error && (
              <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
          </div>

          <div className="flex flex-col items-end">
            {sourceLogo && (
              <img
                src={sourceLogo}
                alt={`${job.source} logo`}
                className="h-12 w-auto mb-2"
              />
            )}

            <div className="flex gap-2">
              <button
                onClick={handleSaveJob}
                disabled={saving || saved}
                className={`btn btn-sm ${saved ? 'btn-success' : 'btn-outline'}`}
              >
                {saving ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : saved ? (
                  'Saved'
                ) : (
                  'Save Job'
                )}
              </button>

              {job.link && (
                <a
                  href={job.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  View Job
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
