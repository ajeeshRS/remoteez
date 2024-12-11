export interface Msg {
  message: string;
}

export interface ProfileDetailProps {
  avatar: string | null;
  bio: string | null;
  desiredJobTitle: string;
  email: string;
  experienceRange: string;
  fullName: string;
  githubLink: string | null;
  id: string;
  linkedinLink: string | null;
  location: string;
  portfolioLink: string | null;
  preferredJobType: string | null;
  previousCompanies: string[];
  projects: string[];
  resume: string | null;
  skills: string[];
  twitterLink: string | null;
}
