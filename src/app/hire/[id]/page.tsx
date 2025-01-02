'use client';
import { getJobseekerById } from '@/app/actions/employer/actions';
import { renderYOE } from '@/components/hire/JobseekerCard';
import Loader from '@/components/ui/loader';
import {
  ArrowLeft,
  Briefcase,
  Clock,
  Dot,
  Link,
  MapPin,
  User,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { toast } from 'sonner';
import { FaXTwitter } from 'react-icons/fa6';
import { GrProjects } from 'react-icons/gr';
import { JobSeekerProfileCard, PreviousCompany, Project } from '@/types/common';
import { getDurationInYM } from '@/lib/utils';

export default function Page() {
  const [jobseekerInfo, setJobseekerInfo] =
    useState<JobSeekerProfileCard | null>(null);
  const [loading, setLoading] = useState(false);

  const { status } = useSession();
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const fetchJobseeker = async () => {
    try {
      setLoading(true);
      const { success, error, jobseeker } = await getJobseekerById(
        id as string,
      );

      if (!success) {
        toast.error(error);
      }

      if (jobseeker) {
        setJobseekerInfo(jobseeker);
      }
    } catch (error) {
      console.error('error getting jobseeker info : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobseeker();
  }, [id]);

  if (!id) {
    router.back();
    return;
  }

  const handleRoutePush = (link: string) => {
    router.push(link);
  };

  if (loading || status === 'loading') {
    return (
      <div className="flex h-[90vh] w-full flex-col items-center justify-center p-10 text-white">
        <Loader color="pink-600" />
      </div>
    );
  }
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-start overflow-y-scroll p-10 text-white">
      <div
        className="flex h-fit w-full cursor-pointer items-center justify-start space-x-2 hover:text-pink-600"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to jobseekers</span>
      </div>

      <div className="flex w-full flex-col items-start justify-center space-y-6 py-10 md:w-4/6 md:p-10">
        <div className="flex w-full items-center justify-between space-x-3">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <p className="text-xl font-bold text-pink-400">
                {jobseekerInfo?.fullName}
              </p>
              <div className="my-2 flex items-center space-x-2">
                <p className="text-xs">{jobseekerInfo?.desiredJobTitle}</p>
                <div className="flex items-center space-x-3">
                  <p
                    onClick={() =>
                      handleRoutePush(jobseekerInfo?.resume as string)
                    }
                    className={`flex cursor-pointer items-center space-x-2 text-sm hover:text-pink-600 hover:underline ${jobseekerInfo?.resume ? 'block' : 'hidden'}`}
                  >
                    <Dot className="h-5 w-5" /> View Resume
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-5">
          {jobseekerInfo?.githubLink && (
            <FaGithub
              onClick={() =>
                handleRoutePush(jobseekerInfo?.githubLink as string)
              }
              className="h-6 w-6 cursor-pointer"
            />
          )}
          {jobseekerInfo?.linkedinLink && (
            <FaLinkedin
              onClick={() =>
                handleRoutePush(jobseekerInfo?.linkedinLink as string)
              }
              className={`h-6 w-6 cursor-pointer`}
            />
          )}
          {jobseekerInfo?.twitterLink && (
            <FaXTwitter
              onClick={() =>
                handleRoutePush(jobseekerInfo?.twitterLink as string)
              }
              className="h-6 w-6 cursor-pointer"
            />
          )}
          {jobseekerInfo?.portfolioLink && (
            <GrProjects
              onClick={() =>
                handleRoutePush(jobseekerInfo?.portfolioLink as string)
              }
              className="h-6 w-6 cursor-pointer"
            />
          )}
        </div>

        <div className="grid w-full grid-cols-2 items-center gap-3 space-x-5 md:flex">
          <p className="bg-neutral-800 p-1 text-center">
            {jobseekerInfo?.preferredJobType
              ? jobseekerInfo.preferredJobType
              : 'FULL_TIME'}
          </p>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-pink-500" />
            <span>{jobseekerInfo?.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Briefcase className="h-4 w-4 text-pink-500" />
            <span>{renderYOE(jobseekerInfo?.experienceRange as string)}</span>
          </div>
        </div>
        {jobseekerInfo?.skills && jobseekerInfo.skills.length > 0 && (
          <div className="flex w-full flex-col items-start justify-center">
            <h3 className="text-sm font-semibold text-pink-400">Skills</h3>
            <div className="my-2 grid grid-cols-2 gap-3 md:flex md:space-x-3">
              {jobseekerInfo?.skills.map((skill, i) => (
                <p
                  key={i}
                  className="my-2 bg-pink-500/30 p-1 text-center text-sm"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        )}

        {jobseekerInfo?.bio && (
          <div className="flex w-full flex-col items-start justify-center">
            <h3 className="text-sm font-semibold text-pink-400">About</h3>
            <div className="bg-inherit p-2">
              {jobseekerInfo && jobseekerInfo.avatar ? (
                <Image
                  src={jobseekerInfo?.avatar}
                  alt="sample-img"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-pink-600" />
              )}
            </div>
            <p className="my-2 text-sm text-neutral-100">{jobseekerInfo.bio}</p>
          </div>
        )}

        {jobseekerInfo?.previousCompanies &&
          jobseekerInfo.previousCompanies.length !== 0 && (
            <div className="flex w-full flex-col items-start justify-center">
              <h3 className="text-sm font-semibold text-pink-400">
                Previous experiences
              </h3>
              <div className="my-10 grid grid-cols-1 items-center gap-3 md:grid-cols-2">
                {jobseekerInfo.previousCompanies.map((company) => (
                  <ExperienceCard company={company} key={company.id} />
                ))}
              </div>
            </div>
          )}

        {jobseekerInfo?.projects && jobseekerInfo.projects.length !== 0 && (
          <div className="flex w-full flex-col items-start justify-center">
            <h3 className="text-sm font-semibold text-pink-400">Projects</h3>
            <div className="my-10 grid grid-cols-1 items-center gap-3 md:grid-cols-2">
              {jobseekerInfo.projects.map((project) => (
                <JobseekerProjectCard project={project} key={project.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ExperienceCard = ({ company }: { company: PreviousCompany }) => {
  const router = useRouter();

  return (
    <div key={company.id} className="border border-pink-400/20 p-5">
      <div className="flex w-full items-center justify-between">
        <p className="py-2 font-bold text-neutral-300">{company.role}</p>
      </div>
      <p className="py-1 text-sm text-neutral-400">{company.jobType}</p>
      <p className="py-1 text-sm">{company.companyName}</p>
      <p
        onClick={() => router.push(company.companyWebsite as string)}
        className="hover:underlin flex cursor-pointer items-center text-wrap py-2 text-[11px] hover:underline md:text-sm"
      >
        <Link className="mr-1 h-3 w-3 text-gray-200" />
        {company.companyWebsite}
      </p>
      <p className="flex items-center py-2 text-sm">
        <Clock className="mr-1 h-4 w-4" />
        {company.duration}
      </p>
      <p className="flex items-center py-2 text-sm text-pink-600">
        {getDurationInYM(company.duration as string)}
      </p>
    </div>
  );
};

const JobseekerProjectCard = ({ project }: { project: Project }) => {
  const router = useRouter();

  const handleRoutePush = (link: string) => {
    router.push(link);
  };
  return (
    <div key={project.title} className="border border-pink-400/20 p-4">
      <div className="flex w-full items-center justify-between">
        <p className="py-2 text-lg font-bold text-neutral-300">
          {project.title}
        </p>
      </div>
      <p className="py-1 text-sm">{project.description}</p>
      <p
        onClick={() => handleRoutePush(project.githubURL as string)}
        className="flex h-fit w-full cursor-pointer items-center text-wrap py-2 text-[11px] hover:underline md:text-sm"
      >
        <Link className="mr-1 h-3 w-3 text-gray-200" />
        {project.githubURL}
      </p>
      <p
        onClick={() => handleRoutePush(project.deployedLink as string)}
        className="flex h-fit w-full cursor-pointer items-center text-wrap py-2 text-[11px] hover:underline md:text-sm"
      >
        <Link className="mr-1 h-3 w-3 text-gray-200" />
        {project.deployedLink}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {project.skills.map((skill: string) => (
          <p
            className="my-2 mr-2 flex items-center justify-between text-nowrap bg-pink-400/20 px-2 py-1"
            key={skill}
          >
            {skill}
          </p>
        ))}
      </div>
    </div>
  );
};
