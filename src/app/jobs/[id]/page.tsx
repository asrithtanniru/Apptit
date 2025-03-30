// app/jobs/[id]/page.tsx
import Link from 'next/link'

// Mock job data function
const getJobById = (id: string) => {
  return {
    id,
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    salary: '$80,000 - $100,000',
    postedAt: '2 days ago',
    description: 'Looking for an experienced frontend developer with expertise in React, Next.js, and Tailwind CSS. The ideal candidate will have 3+ years of experience building responsive web applications.',
    requirements: [
      'Proficiency in JavaScript/TypeScript',
      'Experience with React and Next.js',
      'Knowledge of Tailwind CSS',
    ]
  }
}

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = getJobById(params.id)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="mb-6 pb-6 border-b">
            <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex flex-wrap gap-2 opacity-70">
              <span>{job.company}</span>
              <span>•</span>
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.postedAt}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p>{job.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <ul className="list-disc pl-5">
              {job.requirements.map((req, index) => (
                <li key={index} className="mb-1">{req}</li>
              ))}
            </ul>
          </div>
          
          <div className="card-actions justify-start gap-4">
            <button className="btn btn-primary">Apply Now</button>
            <button className="btn btn-outline">Save Job</button>
          </div>
        </div>
      </div>
    </div>
  )
}