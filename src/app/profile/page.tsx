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
  EXPERIENCE,
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

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('PersonalInfo');
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();

  const fetchProfileDetails = async () => {
    try {
      setLoading(true);
      const { jobSeekerProfile } = await getJobseekerInfo();
      if (jobSeekerProfile) {
        dispatch(setJobseekerProfile(jobSeekerProfile));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileDetails();
  }, [session]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case PERSONAL_INFO:
        return <PersonalInfo refetch={fetchProfileDetails} />;
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
        return <PersonalInfo refetch={fetchProfileDetails} />;
    }
  };

  if (loading) {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center bg-black">
        <Loader color={'white'} />
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
