'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Highlight banner */}
          <div className="flex justify-center mb-8">

            <Link href="/sources" className="group bg-base-300 hover:bg-primary/10 px-4 py-2 rounded-full flex items-center gap-2 transition-all">
              <span className="text-sm font-poppins">Access jobs from LinkedIn, Glassdoor, Indeed & more in one place</span>
              <span className="bg-primary text-primary-content p-1 rounded-full group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </span>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-tight md:leading-tight lg:leading-tight max-w-5xl mx-auto mb-6">
            All Your Dream Jobs<br />In One Search
          </h1>
          
          <p className="text-center text-lg md:text-xl opacity-80 max-w-3xl mx-auto mb-10">
            Apptit aggregates job listings from top platforms like LinkedIn, Glassdoor, Indeed, and more,
            giving you a comprehensive view of the job market in one place.
          </p>
          
          {/* Search Bar */}
          {/* <div className="max-w-3xl mx-auto mb-10">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company" 
                  className="input input-bordered w-full pr-10" 
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="relative flex-grow sm:flex-grow-0">
                <input 
                  type="text" 
                  placeholder="Location" 
                  className="input input-bordered w-full pr-10" 
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-40" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <button className="btn btn-primary">Search Jobs</button>
            </div>
          </div> */}
          
          {/* Sign In/Get Started Button */}
          <div className="flex justify-center mb-12">
            <button 
              className="btn btn-primary px-8 py-3 text-lg font-medium"
              onClick={() => {/* Add Google OAuth logic here */}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                <path fill="#fff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#fff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#fff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#fff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </section>
      
      {/* Source Platforms Section */}
      <section className="py-8 container mx-auto px-4">
  <h2 className="text-xl text-center font-medium opacity-80 mb-8">
    Aggregating jobs from leading platforms
  </h2>
  <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
    <div>
      <img
        src="https://media.licdn.com/dms/image/v2/D4E12AQH1Zci0N5h81g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1668339640418?e=2147483647&v=beta&t=8BAgWEbSU6_dLYI0cyPS6QmavHy6IMYvZww8O7WX_Og"
        alt="LinkedIn"
        className="h-16 w-auto"
      />
    </div>
    <div>
      <img
        src="https://1000logos.net/wp-content/uploads/2021/12/Glassdoor-Logo-2017.png"
        alt="Glassdoor"
        className="h-16 w-auto"
      />
    </div>
    <div>
      <img
        src="https://1000logos.net/wp-content/uploads/2023/01/Indeed-Logo-2004.png"
        alt="Indeed"
        className="h-16 w-auto"
      />
    </div>
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Naukri.png"
        alt="Naukri"
        className="h-16 w-auto"
      />
    </div>
    <div>
      <img
        src="https://placements.sscbs.du.ac.in/wp-content/uploads/2021/01/Internshala.png"
        alt="Internshala"
        className="h-26 w-auto"
      />
    </div>
  </div>
</section>

      
      {/* Features Section with Cards */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-3">Search across all platforms</h2>
              <p className="mb-6">Find every relevant job listing from multiple sources with a single search</p>
              <div className="card-actions">
                <button className="btn btn-primary">Explore Jobs</button>
              </div>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-3">Smart job alerts</h2>
              <p className="mb-6">Get notified when new jobs matching your criteria are posted across any platform</p>
              <div className="card-actions">
                <button className="btn btn-primary">Set Up Alerts</button>
              </div>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300">
            <div className="card-body">
              <h2 className="card-title text-xl font-bold mb-3">One-click applications</h2>
              <p className="mb-6">Apply to jobs across different platforms without leaving Apptit</p>
              <div className="card-actions">
                <button className="btn btn-primary">Start Applying</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The most comprehensive job search</h2>
          
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat">
              <div className="stat-title">Jobs Available</div>
              <div className="stat-value">2.3M+</div>
              <div className="stat-desc">From multiple sources</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Job Platforms</div>
              <div className="stat-value">25+</div>
              <div className="stat-desc">And growing monthly</div>
            </div>
            
            <div className="stat">
              <div className="stat-title">Users</div>
              <div className="stat-value">780K</div>
              <div className="stat-desc">↗︎ 14% from last month</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Add CSS for background pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
