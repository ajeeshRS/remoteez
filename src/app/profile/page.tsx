'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Experience from '@/components/profile/jobseeker/experience/Experience';
import Links from '@/components/profile/jobseeker/links/Links';
import PersonalInfo from '@/components/profile/jobseeker/personInfo/PersonalInfo';
import Projects from '@/components/profile/jobseeker/projects/Projects';
import Sidebar from '@/components/profile/Sidebar';
import Skills from '@/components/profile/jobseeker/Skills';
import {
  EMPLOYER,
  EMPLOYER_INFO,
  EXPERIENCE,
  JOBS,
  JOBSEEKER,
  LINKS,
  PERSONAL_INFO,
  PROJECTS,
  SECURITY,
  SKILLS,
} from '@/lib/constants/app.constants';
import { getJobseekerInfo } from '../actions/jobseeker/actions';
import MobileNavProfile from '@/components/profile/MobileNavProfile';
import Loader from '@/components/ui/loader';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { AppDispatch } from '@/state/store';
import Security from '@/components/profile/jobseeker/security/Security';
import { getEmployerInfo } from '../actions/employer/actions';
import { setEmployerProfile } from '@/state/profile/employerSlice';
import EmployerInfo from '@/components/profile/employer/employerInfo/EmployerInfo';
import Jobs from '@/components/profile/employer/jobs/Jobs';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  const fetchProfileDetails = async () => {
    try {
      setLoading(true);

      if (session?.user.role === JOBSEEKER) {
        const { jobSeekerProfile } = await getJobseekerInfo();
        if (jobSeekerProfile) {
          dispatch(setJobseekerProfile(jobSeekerProfile));
        }
      } else if (session?.user.role === EMPLOYER) {
        const { employerProfile } = await getEmployerInfo();
        if (employerProfile) {
          dispatch(setEmployerProfile(employerProfile));
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== 'loading') {
      fetchProfileDetails();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user.role === JOBSEEKER) {
      setActiveTab('PersonalInfo');
    } else if (session?.user.role === EMPLOYER) {
      setActiveTab('EmployerInfo');
    }
  }, [session]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case PERSONAL_INFO:
        return <PersonalInfo refetch={fetchProfileDetails} />;
      case EMPLOYER_INFO:
        return <EmployerInfo />;
      case JOBS:
        return <Jobs />;
      case SKILLS:
        return <Skills />;
      case PROJECTS:
        return <Projects />;
      case EXPERIENCE:
        return <Experience />;
      case LINKS:
        return <Links />;
      case SECURITY:
        return <Security />;
      default:
        return null;
    }
  };

  if (status !== 'loading' && !session?.user) {
    router.push('/');
  }

  if (loading || status === 'loading') {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center bg-black">
        <Loader color={'pink-600'} />
      </div>
    );
  }
  return (
    <div className="flex min-h-[90vh] w-full flex-col items-center justify-center md:flex-row">
      <Sidebar active={activeTab} setActive={setActiveTab} />
      <MobileNavProfile active={activeTab} setActive={setActiveTab} />
      {renderActiveTab()}
    </div>
  );
}
