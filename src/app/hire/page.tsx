'use client';
import JobseekerSearch from '@/components/hire/JobseekerSearch';
import Loader from '@/components/ui/loader';
import { EMPLOYER } from '@/lib/constants/app.constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status !== 'loading' && session?.user.role !== EMPLOYER) {
    router.push('/');
  }

  if (status === 'loading') {
    return (
      <div className="flex min-h-[90vh] w-full items-center justify-center px-5 md:flex-row md:px-10">
        <Loader color='pink-600' />
      </div>
    );
  }
  return (
    <div className="flex min-h-[90vh] w-full items-start justify-start px-5 md:flex-row md:px-10">
      <JobseekerSearch />
    </div>
  );
}
