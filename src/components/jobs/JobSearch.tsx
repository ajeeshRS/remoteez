'use client';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Job } from '@prisma/client';
import { getJobs } from '@/app/actions/actions';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import JobCard from './JobCard';
import JobFilter from './JobFilter';

interface FilterState {
  commitment: string[];
  exp: string[];
  pay: string[];
}

export default function JobSearch() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <JobSearchContent />
    </Suspense>
  );
}

function JobSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();

  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const limit = 6;

  const commitmentTypes = searchParams.getAll('commitment');
  const experienceTypes = searchParams.getAll('exp');
  const payTypes = searchParams.getAll('pay');

  const fetchJobs = useCallback(
    async (resetJobs = false, query?: string) => {
      if (loading || (!hasMore && !resetJobs)) return;

      const currentPage = resetJobs ? 1 : page;

      try {
        setLoading(true);
        const currentCommitments = Array.from(
          searchParams.getAll('commitment'),
        );
        const currentExps = Array.from(searchParams.getAll('exp'));
        const currentPays = Array.from(searchParams.getAll('pay'));

        const { jobs, hasMore } = await getJobs(
          currentPage,
          limit,
          query,
          currentCommitments,
          currentExps,
          currentPays,
        );

        if (query || resetJobs) {
          setJobs(jobs);
        } else {
          setJobs((prevJobs) => [...prevJobs, ...jobs]);
        }

        setPage((prevPage) => (resetJobs ? 2 : prevPage + 1));
        setHasMore(hasMore);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, page, searchParams],
  );

  // debounced search for perfomance
  const debouncedSearch = useCallback(
    debounce((query?: string) => {
      setJobs([]);
      setPage(1);
      setHasMore(true);
      fetchJobs(true, query);
    }, 500),
    [fetchJobs],
  );

  // handling search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // handling changes in commitment
  const handleCommitmentChange = (type: string) => {
    const params = new URLSearchParams(searchParams);

    if (commitmentTypes.includes(type)) {
      const updatedCommitments = commitmentTypes.filter((t) => t !== type);

      params.delete('commitment');
      updatedCommitments.forEach((t) => params.append('commitment', t));
    } else {
      params.append('commitment', type);
    }

    router.replace(`?${params.toString()}`);

  };

  // handling changes in commitment
  const handleExperienceChange = (exp: string) => {
    const params = new URLSearchParams(searchParams);

    if (experienceTypes.includes(exp)) {
      const updatedExps = experienceTypes.filter((t) => t !== exp);

      params.delete('exp');
      updatedExps.forEach((t) => params.append('exp', t));
    } else {
      params.append('exp', exp);
    }

    router.replace(`?${params.toString()}`);

  };

  // handling changes in commitment
  const handlePayChange = (pay: string) => {
    const params = new URLSearchParams(searchParams);

    if (payTypes.includes(pay)) {
      const updatedPays = payTypes.filter((p) => p !== pay);

      params.delete('pay');
      updatedPays.forEach((p) => params.append('pay', p));
    } else {
      params.append('pay', pay);
    }

    router.replace(`?${params.toString()}`);

  };
  
  // fetch job when searchParams changes
  useEffect(() => {
    setJobs([]);
    setPage(1);
    setHasMore(true);
    fetchJobs(true, searchQuery);
  }, [searchParams]);

  // debounce clean up
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  

  // infinite scrolling
  useEffect(() => {
    if (inView) {
      fetchJobs(false, searchQuery);
    }
  }, [inView, fetchJobs, searchQuery]);
  return (
    <div className="flex min-h-[90vh] w-full flex-col px-2 py-4 text-white md:h-[90vh] md:flex-row md:px-8">
      <JobFilter
        handleCommitment={handleCommitmentChange}
        handleExp={handleExperienceChange}
        handlePay={handlePayChange}
        handleSearch={handleSearchChange}
        searchQuery={searchQuery}
      />
      <div className="flex min-h-[85vh] w-full flex-col space-y-2 md:h-[85vh] md:overflow-y-scroll md:px-5">
        {jobs &&
          jobs.length !== 0 &&
          jobs.map((job, i) => <JobCard job={job} key={i} />)}

        <div ref={ref} className="flex justify-center py-4">
          {loading ? (
            <p className="text-sm text-neutral-200">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p className="text-sm text-neutral-200">No jobs found.</p>
          ) : !hasMore ? (
            <p className="text-sm text-neutral-200">
              Looks like you&apos;ve reached the end.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
