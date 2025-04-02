import { Job } from '@/types/jobs'

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      <div className="card-body">
        <h2 className="card-title">
          {job.title}
          {job.source && (
            <div className="badge badge-secondary">{job.source}</div>
          )}
        </h2>
        <p className="text-sm text-gray-600">
          {job.company} • {job.location}
          {job.salary && ` • ${job.salary}`}
        </p>
        {job.postedAt && (
          <p className="text-xs text-gray-500">Posted {job.postedAt}</p>
        )}
        {job.description && (
          <p className="mt-2 text-gray-700">{job.description}</p>
        )}
        <div className="card-actions justify-end mt-2">
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
  )
}