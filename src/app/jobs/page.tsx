
import JobCard from '@/components/jobs/JobCard'
import SearchBar from '@/components/jobs/SearchBar'
import FilterSidebar from '@/components/jobs/FilterSidebar'


const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'Remote',
    salary: '$80,000 - $100,000',
    postedAt: '2 days ago',
    description: 'Looking for an experienced frontend developer...'
  },

]

export default function JobsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4 lg:w-1/5">
          <FilterSidebar />
        </div>
        
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="grid grid-cols-1 gap-4">
            {mockJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}