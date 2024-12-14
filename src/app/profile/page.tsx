'use client';
import Experience from '@/components/profile/experience/Experience';
import Links from '@/components/profile/links/Links';
import PersonalInfo from '@/components/profile/personInfo/PersonalInfo';
import Projects from '@/components/profile/projects/Projects';
import Sidebar from '@/components/profile/Sidebar';
import Skills from '@/components/profile/Skills';
import {
  EXPERIENCE,
  LINKS,
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
} from '@/lib/constants/app.constants';
import { getJobseekerInfo } from '../actions/jobseeker/actions';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MobileNavProfile from '@/components/profile/MobileNavProfile';
import Loader from '@/components/ui/loader';

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('PersonalInfo');
  const [profileDetails, setProfileDetails] = useState<any>();
  const [links, setLinks] = useState<any[]>([]);
  const [exp, setExp] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const fetchProfileDetails = async () => {
    try {
      setLoading(true);
      const response = await getJobseekerInfo();
      setProfileDetails(response.jobSeekerProfile);
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const linkData = [
      {
        key: 'Github',
        value: profileDetails?.githubLink ? profileDetails.githubLink : '',
      },
      {
        key: 'Twitter',
        value: profileDetails?.twitterLink ? profileDetails.twitterLink : '',
      },
      {
        key: 'Portfolio',
        value: profileDetails?.portfolioLink
          ? profileDetails.portfolioLink
          : '',
      },
      {
        key: 'Linkedin',
        value: profileDetails?.linkedinLink ? profileDetails.linkedinLink : '',
      },
    ];
    setLinks(linkData);

    const expData = {
      previousCompanies: profileDetails?.previousCompanies,
      experienceRange: profileDetails?.experienceRange,
    };

    setExp(expData);
  }, [profileDetails]);

  useEffect(() => {
    fetchProfileDetails();
  }, [session]);

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
      {activeTab === PERSONAL_INFO ? (
        <PersonalInfo
          personalDetails={profileDetails}
          refetch={fetchProfileDetails}
        />
      ) : activeTab === SKILLS ? (
        <Skills skills={profileDetails?.skills} />
      ) : activeTab === PROJECTS ? (
        <Projects projects={profileDetails?.projects} />
      ) : activeTab === EXPERIENCE ? (
        <Experience experiences={exp} />
      ) : (
        activeTab === LINKS && <Links links={links} />
      )}
    </div>
  );
}
