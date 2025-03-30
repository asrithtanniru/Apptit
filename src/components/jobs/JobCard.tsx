// components/jobs/JobCard.tsx
import Link from 'next/link'

type JobProps = {
  job: {
    id: string
    title: string
    company: string
    location: string
    salary: string
    postedAt: string
    description: string
  }
}

export default function JobCard({ job }: JobProps) {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/jobs/${job.id}`} className="hover:text-primary">
            {job.title}
          </Link>
        </h2>
        
        <div>
          <div className="font-medium">{job.company}</div>
          <div className="text-sm opacity-70 flex gap-2">
            <span>{job.location}</span>
            <span>•</span>
            <span>{job.salary}</span>
          </div>
        </div>
        
        <p className="line-clamp-2">{job.description}</p>
        
        <div className="card-actions justify-between items-center mt-2">
          <span className="text-sm opacity-60">{job.postedAt}</span>
          
          <div className="flex gap-2">
            <button className="btn btn-sm btn-outline">Save</button>
            <Link href={`/jobs/${job.id}`} className="btn btn-sm btn-primary">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}