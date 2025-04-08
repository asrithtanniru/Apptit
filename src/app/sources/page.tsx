'use client'

import Link from 'next/link'
import { Search, Briefcase, TrendingUp } from 'lucide-react'
import { useSession } from 'next-auth/react';

export default function Sources() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Next Opportunity</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Access thousands of job listings from leading platforms in one convenient place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
          <Briefcase className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Multiple Sources</h3>
          <p className="text-gray-600">Access job listings from top platforms without switching between sites.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
          <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Trending Opportunities</h3>
          <p className="text-gray-600">Discover high-demand positions and fast-growing industries.</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg flex flex-col items-center text-center">
          <Search className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Smart Filtering</h3>
          <p className="text-gray-600">Find exactly what you're looking for with advanced search options.</p>
        </div>
      </div>


      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Top Job Platforms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {platforms.map((platform) => (
          <div key={platform.name} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                <div className="h-12 w-12 flex items-center justify-center">
                  <img src={platform.logo} alt={`${platform.name} logo`} className="h-10 w-10 object-contain" />
                </div>
              </div>
              <p className="text-gray-600 mb-6">{platform.description}</p>
              <Link
                href={platform.link}
                className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-medium rounded-lg transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore {platform.name}
              </Link>
            </div>
          </div>
        ))}
      </div>


      <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to accelerate your job search?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Create an account to save your favorite listings, get personalized recommendations, and more.
        </p>
        {!isLoggedIn && (
          <>
            <Link className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300" href="/login">
              Get Started
            </Link>
          </>
        )
        }
        {isLoggedIn && (
          <>
            <Link className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300" href="/jobs">
              Browse Jobs
            </Link>
          </>
        )
        }
      </div>
    </div>
  );
}

const platforms = [
  {
    name: "LinkedIn",
    logo: "https://media.licdn.com/dms/image/v2/D4E12AQH1Zci0N5h81g/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1668339640418?e=2147483647&v=beta&t=8BAgWEbSU6_dLYI0cyPS6QmavHy6IMYvZww8O7WX_Og",
    description: "Professional networking and job listings platform.",
    link: "https://www.linkedin.com/jobs/"
  },
  {
    name: "Glassdoor",
    logo: "https://1000logos.net/wp-content/uploads/2021/12/Glassdoor-Logo-2017.png",
    description: "Company reviews, salaries, and job openings.",
    link: "https://www.glassdoor.com/Job/index.htm"
  },
  {
    name: "Indeed",
    logo: "https://1000logos.net/wp-content/uploads/2023/01/Indeed-Logo-2004.png",
    description: "One of the largest job search engines worldwide.",
    link: "https://www.indeed.com/"
  },
  {
    name: "Naukri",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Naukri.png",
    description: "India's leading job search and hiring platform.",
    link: "https://www.naukri.com/"
  },
  {
    name: "Internshala",
    logo: "https://placements.sscbs.du.ac.in/wp-content/uploads/2021/01/Internshala.png",
    description: "Internships and fresher job opportunities which is ideal for students.",
    link: "https://internshala.com/"
  }
];
