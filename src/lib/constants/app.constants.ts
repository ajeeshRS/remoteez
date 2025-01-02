export const EMPLOYER = 'EMPLOYER';
export const JOBSEEKER = 'JOBSEEKER';

export const faqs = [
  {
    question: 'How do I register as a jobseeker on Remoteez?',
    answer:
      "To register as a jobseeker, click on the 'Sign Up' button, select 'Jobseeker,' and fill in the required details. Once registered, you can complete your resume and start searching for jobs.",
  },
  {
    question: 'How do I register as an employer?',
    answer:
      "Employers can register by clicking on 'Sign Up,' selecting 'Employer,' and providing company details. After registration, you can post job listings and search for candidates with specific skills.",
  },
  {
    question: 'How do I search and apply for jobs?',
    answer:
      "Jobseekers can search for jobs using the 'Job Search' feature. Use filters such as location, job title, experience. Once you find a suitable job, click 'Apply' and submit your application.",
  },
  {
    question: 'How can employers post job listings?',
    answer:
      "Employers can post job listings by logging in, navigating to the 'Post a Job' section, and filling in the job details, including title, description, location, and required skills.",
  },
  {
    question: 'Can employers search for candidates ?',
    answer:
      "Yes, employers can use the 'Jobseeker Search' feature to find jobseekers . Use filters to narrow down the search based on title and experience.",
  },
  {
    question: 'Is all the jobs on remoteez are remote only',
    answer:
      'Yes, Remoteez only promote remote works, so all the jobs posted here are remote only.',
  },
];

export const PERSONAL_INFO = 'PersonalInfo';
export const EMPLOYER_INFO = 'EmployerInfo';
export const SKILLS = 'Skill';
export const PROJECTS = 'Projects';
export const EXPERIENCE = 'Experience';
export const LINKS = 'Links';
export const SECURITY = 'Security';
export const JOBS = 'Jobs';

export const ZERO_TO_ONE = '0-1 years';
export const ONE_TO_THREE = '1-3 years';
export const THREE_TO_SIX = '3-6 years';
export const SIX_PLUS = '6+ years';

export const ExperienceRangeFilterItems = [
  'ZERO_TO_ONE',
  'ONE_TO_THREE',
  'THREE_TO_SIX',
  'SIX_PLUS',
];

export const jobseekerSidebarItems = [
  { title: 'personal info', active: PERSONAL_INFO },
  { title: 'skills', active: SKILLS },
  { title: 'projects', active: PROJECTS },
  { title: 'experience', active: EXPERIENCE },
  { title: 'links', active: LINKS },
  { title: 'security', active: SECURITY },
];

export const employerSidebarItems = [
  { title: 'employer info', active: EMPLOYER_INFO },
  { title: 'jobs', active: JOBS },
  { title: 'security', active: SECURITY },
];
