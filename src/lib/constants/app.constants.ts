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
    question: 'How can I complete my resume on Remoteez?',
    answer:
      "After registering as a jobseeker, navigate to the 'Profile' section. Fill in your personal details, work experience, education, and skills to complete your resume.",
  },
  {
    question: 'How do I search and apply for jobs?',
    answer:
      "Jobseekers can search for jobs using the 'Job Search' feature. Use filters such as location, job title, or skills. Once you find a suitable job, click 'Apply' and submit your application.",
  },
  {
    question: 'How can employers post job listings?',
    answer:
      "Employers can post job listings by logging in, navigating to the 'Post a Job' section, and filling in the job details, including title, description, location, and required skills.",
  },
  {
    question: 'Can employers search for candidates with specific skills?',
    answer:
      "Yes, employers can use the 'Candidate Search' feature to find jobseekers with specific skills. Use filters to narrow down the search based on skills, experience, and location.",
  },
  {
    question: 'Is there a fee for posting jobs on Remoteez?',
    answer:
      "Remoteez offers both free and premium job posting options. Free postings have limited visibility, while premium postings can reach a broader audience. Check the 'Pricing' section for more details.",
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
export const THREE_TO_SIX = '2-6 years';
export const SIX_PLUS = '6+ years';

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


export const jobs = [
  {
    id: "1a2b3c4d-5678-9101-1121-314151617181",
    employerId: "employer123",
    title: "Full Stack Developer",
    jobType: "FULL_TIME",
    minExperience: 3,
    maxExperience: 5,
    description: "Looking for a skilled full-stack developer proficient in MERN stack to join our dynamic team.",
    companyName: "Tech Innovations Ltd",
    companyLogo: "https://example.com/logo1.png",
    companyDescription: "A leading tech company focused on innovative solutions.",
    companyEmail: "hr@techinnovations.com",
    skillsRequired: ["React.js", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
    minSalary: 50000,
    maxSalary: 80000,
    currency: "INR",
    isVerified: true,
    postedAt: new Date("2024-12-20"),
    link: "https://example.com/jobs/full-stack-developer",
    updatedAt: new Date("2024-12-21"),
    employer: { id: "employer123", name: "Tech Innovations Ltd" },
    bookmark: [],
  },
  {
    id: "2a3b4c5d-6789-1011-1213-415161718192",
    employerId: "employer456",
    title: "Frontend Developer",
    jobType: "CONTRACT",
    minExperience: 2,
    maxExperience: 4,
    description: "Hiring a frontend developer with expertise in React.js and Tailwind CSS.",
    companyName: "Creative Coders Inc",
    companyLogo: "https://example.com/logo2.png",
    companyDescription: "A creative agency specializing in web and mobile applications.",
    companyEmail: "careers@creativecoders.com",
    skillsRequired: ["React.js", "Tailwind CSS", "JavaScript", "GSAP"],
    minSalary: 30000,
    maxSalary: 60000,
    currency: "INR",
    isVerified: false,
    postedAt: new Date("2024-12-19"),
    link: "https://example.com/jobs/frontend-developer",
    updatedAt: new Date("2024-12-21"),
    employer: { id: "employer456", name: "Creative Coders Inc" },
    bookmark: [],
  },
  {
    id: "3a4b5c6d-7890-1112-1314-516171819203",
    employerId: "employer789",
    title: "Backend Developer",
    jobType: "PART_TIME",
    minExperience: 4,
    maxExperience: 7,
    description: "Backend developer needed with strong experience in Node.js, Kafka, and PostgreSQL.",
    companyName: "Backend Solutions",
    companyLogo: "https://example.com/logo3.png",
    companyDescription: "A specialized backend service provider for large-scale applications.",
    companyEmail: "jobs@backendsolutions.com",
    skillsRequired: ["Node.js", "Kafka", "PostgreSQL", "Redis"],
    minSalary: 40000,
    maxSalary: 70000,
    currency: "USD",
    isVerified: true,
    postedAt: new Date("2024-12-18"),
    link: "https://example.com/jobs/backend-developer",
    updatedAt: new Date("2024-12-21"),
    employer: { id: "employer789", name: "Backend Solutions" },
    bookmark: [],
  },
];