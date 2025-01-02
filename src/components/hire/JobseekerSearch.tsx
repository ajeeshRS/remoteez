'use client';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { JobSeeker } from '@prisma/client';
import { useInView } from 'react-intersection-observer';
import debounce from 'lodash/debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import JobseekerCard from './JobseekerCard';
import JobseekerFilter from './JobseekerFilter';
import { getJobseekers } from '@/app/actions/employer/actions';

export default function JobseekerSearch() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <JobseekerSearchContent />
    </Suspense>
  );
}

function JobseekerSearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();

  const [loading, setLoading] = useState(false);
  const [jobseekers, setJobseekers] = useState<JobSeeker[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const limit = 6;

  const commitmentTypes = searchParams.getAll('commitment');
  const experienceTypes = searchParams.getAll('exp');

  const fetchJobseekers = useCallback(
    async (resetJobseekers = false, query?: string) => {
      if (loading || (!hasMore && !resetJobseekers)) return;

      const currentPage = resetJobseekers ? 1 : page;

      try {
        setLoading(true);
        const currentCommitments = Array.from(
          searchParams.getAll('commitment'),
        );
        const currentExps = Array.from(searchParams.getAll('exp'));

        const { jobseekers, hasMore } = await getJobseekers(
          currentPage,
          limit,
          query,
          currentCommitments,
          currentExps,
        );

        if (query || resetJobseekers) {
          setJobseekers(jobseekers);
        } else {
          setJobseekers((prev) => [...prev, ...jobseekers]);
        }

        setPage((prevPage) => (resetJobseekers ? 2 : prevPage + 1));
        setHasMore(hasMore);
      } catch (error) {
        console.error('Error fetching jobseekers:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore, page, searchParams],
  );

  // debounced search for perfomance
  const debouncedSearch = useCallback(
    debounce((query?: string) => {
      setJobseekers([]);
      setPage(1);
      setHasMore(true);
      fetchJobseekers(true, query);
    }, 500),
    [fetchJobseekers],
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

    const commitment = Array.from(params.getAll('commitment'));
    console.log('Commitments after update:', commitment);

    // adding a micro-delay
    setTimeout(() => {
      setJobseekers([]);
      setPage(1);
      setHasMore(true);

      fetchJobseekers(true);
    }, 0);
  };

  // handling changes in experience
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

    const experience = Array.from(params.getAll('exp'));
    console.log('experience after update:', experience);

    // adding a micro-delay
    setTimeout(() => {
      setJobseekers([]);
      setPage(1);
      setHasMore(true);
      fetchJobseekers(true);
    }, 0);
  };

  // debounce clean up
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // fetch job when searchParams changes
  useEffect(() => {
    setJobseekers([]);
    setPage(1);
    setHasMore(true);
    fetchJobseekers(true, searchQuery);
  }, [searchParams]);

  // infinite scrolling
  useEffect(() => {
    if (inView) {
      fetchJobseekers(false, searchQuery);
    }
  }, [inView, fetchJobseekers, searchQuery]);
  return (
    <div className="flex min-h-[90vh] w-full flex-col px-2 py-4 text-white md:h-[90vh] md:flex-row md:px-8">
      <JobseekerFilter
        handleCommitment={handleCommitmentChange}
        handleExp={handleExperienceChange}
        handleSearch={handleSearchChange}
        searchQuery={searchQuery}
      />
      <div className="flex min-h-[85vh] w-full flex-col space-y-2 md:h-[85vh] md:overflow-y-scroll md:px-5">
        {jobseekers &&
          jobseekers.length !== 0 &&
          jobseekers.map((jobseeker, i) => (
            <JobseekerCard jobseeker={jobseeker} key={i} />
          ))}

        <div ref={ref} className="flex justify-center py-4">
          {loading ? (
            <p className="text-sm text-neutral-200">Loading jobseekers...</p>
          ) : jobseekers.length === 0 ? (
            <p className="text-sm text-neutral-200">No jobseekers found.</p>
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
