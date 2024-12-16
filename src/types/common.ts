export interface Msg {
  message: string;
}

// export interface ProfileDetailProps {
//   avatar: string | null;
//   bio: string | null;
//   desiredJobTitle: string;
//   email: string;
//   experienceRange: string;
//   fullName: string;
//   githubLink: string | null;
//   id: string;
//   linkedinLink: string | null;
//   location: string;
//   portfolioLink: string | null;
//   preferredJobType: string | null;
//   previousCompanies: any[];
//   projects: string[];
//   resume: string | null;
//   skills: string[];
//   twitterLink: string | null;
// }

export interface JobSeekerProfile {
  id: string;
  fullName: string;
  email: string;
  bio: string | null;
  desiredJobTitle: string;
  experienceRange: 'ZERO_TO_ONE' | 'ONE_TO_THREE' | 'THREE_TO_SIX' | 'SIX_PLUS';
  location: string;
  preferredJobType:
    | 'FULL_TIME'
    | 'PART_TIME'
    | 'INTERNSHIP'
    | 'FREELANCE'
    | null;
  avatar: string | null;
  githubLink: string | null;
  linkedinLink: string | null;
  twitterLink: string | null;
  portfolioLink: string | null;
  resume: string | null;
  skills: string[];
  previousCompanies: PreviousCompany[];
  projects: Project[];
}

interface Project {
  deployedLink: string | null;
  title: string | null;
  description: string | null;
  githubURL: string | null;
  id: string | null;
  jobSeekerId: string | null;
  skills: string[];
}

export interface PreviousCompany {
  companyName: string | null;
  companyWebsite: string | null;
  duration: string | null;
  jobSeekerId: string | null;
  id: string | null;
  role: string | null;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'INTERNSHIP' | 'FREELANCE' | null;
}
