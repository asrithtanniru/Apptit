// types/jobs.ts
export interface JobRequest {
  keyword: string;
  location: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  link?: string;
  salary?: string;
  postedAt?: string;
  description?: string;
  source?: string;
  platform?: string
}

export interface LinkedInJob {
  title: string;
  company: string;
  location: string;
  link: string;
}

export interface GlassdoorJob {
  title: string;
  company: string;
  location: string;
  link: string;
}

export interface ApiResponse {
  linkedin?: LinkedInJob[];
  glassdoor?: {
    jobs: GlassdoorJob[];
  };
}
