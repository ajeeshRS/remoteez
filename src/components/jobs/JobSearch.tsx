'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Currency, JobType } from '../profile/employer/jobs/CreateJobForm';
import { RxBookmark, RxBookmarkFilled } from 'react-icons/rx';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import Image from 'next/image';
import { Briefcase, DollarSign, IndianRupee, MapPin } from 'lucide-react';
import { Job } from '@prisma/client';
import { getJobs } from '@/app/actions/actions';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';

export default function JobSearch() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView();
  const limit = 6;

  const fetchJobs = async (query?: string) => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      const { jobs, hasMore } = await getJobs(page, limit, query);
      if (query) {
        setJobs(jobs);
        console.log(jobs);
      } else {
        setJobs((prevJobs) => [...prevJobs, ...jobs]);
      }
      setPage((prevPage) => prevPage + 1);
      setHasMore(hasMore);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setJobs([]);
      setPage(1);
      setHasMore(true);
      fetchJobs(query);
    }, 500),
    [],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (inView) {
      fetchJobs();
    }
  }, [inView]);
  return (
    <div className="flex h-[90vh] w-full px-8 py-4 text-white">
      <form
        onSubmit={() => {}}
        className="mb-8 h-full w-1/5 space-y-4 overflow-y-scroll border border-pink-500/70 px-4 py-8"
      >
        <h1 className="mb-8 text-xl font-bold">Filter</h1>
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-grow rounded-none border border-neutral-600 bg-transparent p-2 focus:border-none focus:outline-none focus:outline-pink-500/70 focus:ring-0"
          />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem className="border-b-0" value="commitment">
              <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
                Commitment
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm font-normal text-neutral-300">
                {['Full time', 'Part time', 'Internship', 'Freelance'].map(
                  (type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded-none" />
                      <span>{type}</span>
                    </div>
                  ),
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b-0" value="remote">
              <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
                Remote
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm font-normal text-neutral-300">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded-none" />
                  <span>Remote only</span>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b-0" value="experience">
              <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
                Experience Level
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm font-normal text-neutral-300">
                {['0-1 YOE', '1-3 YOE', '3-6 YOE', '6+ YOE'].map((yoe) => (
                  <div key={yoe} className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded-none" />
                    <span>{yoe}</span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-b-0" value="pay">
              <AccordionTrigger className="text-start text-base font-medium text-neutral-50 hover:no-underline">
                Pay
              </AccordionTrigger>
              <AccordionContent className="space-y-2 text-sm font-normal text-neutral-300">
                {['$0-10k', '$10-20k', '$20-50k', '$50-100k', '$100k+'].map(
                  (pay) => (
                    <div key={pay} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded-none" />
                      <span>{pay}</span>
                    </div>
                  ),
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </form>
      <div className="flex h-[85vh] w-full flex-col space-y-2 overflow-y-scroll px-5">
        {jobs &&
          jobs.length !== 0 &&
          jobs.map((job, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-start border border-neutral-800 bg-black p-5"
            >
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-inherit p-2">
                    <Image
                      src={job.companyLogo}
                      alt="sample-img"
                      width={40}
                      height={40}
                      className="h-10 w-10 object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-pink-400">
                      {job.title}
                    </p>
                    <p className="text-xs">{job.companyName}</p>
                  </div>
                </div>
                <p className="text-xs">
                  Posted on {job.postedAt.toLocaleDateString()}
                </p>
              </div>
              <div className="my-3 flex w-full items-center justify-between space-x-5 text-sm">
                <div className="flex items-center space-x-5">
                  <p className="bg-neutral-800 p-1">{job.jobType}</p>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-pink-500" />
                    <span>remote</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {job.currency == 'INR' ? (
                      <IndianRupee className="h-4 w-4 text-pink-500" />
                    ) : (
                      <DollarSign className="h-4 w-4 text-pink-500" />
                    )}
                    <span>
                      {job.minSalary / 1000}k-{job.maxSalary / 1000}k
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Briefcase className="h-4 w-4 text-pink-500" />
                    <span>
                      {`${job.minExperience}-${job.maxExperience}`} YOE
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-10">
                  <button className="bg-pink-600 px-4 py-2 text-sm hover:bg-pink-700">
                    Apply
                  </button>
                  <button>
                    <RxBookmark className="text-pink bg-pink- h-6 w-6" />
                    {/* <RxBookmarkFilled className="text-pink-600 h-6 w-6 bg-pink-" /> */}
                  </button>
                </div>
              </div>
              <div className="flex w-full flex-wrap items-center">
                {job.skillsRequired.map((skill, i) => (
                  <p key={i} className="my-2 mr-4 bg-pink-500/30 p-1 text-sm">
                    {skill}
                  </p>
                ))}
              </div>
            </div>
          ))}
        <div ref={ref} className="flex justify-center py-4">
          {loading && (
            <p className="text-sm text-neutral-200">Loading jobs...</p>
          )}
          {!hasMore && (
            <p className="text-sm text-neutral-200">
              Looks like you've reached the end.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
