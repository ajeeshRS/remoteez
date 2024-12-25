'use client';
import CreateJobForm from '@/components/jobs/CreateJobForm';
import { EMPLOYER } from '@/lib/constants/app.constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status !== 'loading' && session?.user.role !== EMPLOYER) {
    router.push('/');
  }
  return (
    <div className="flex min-h-[90vh] w-full items-start justify-center md:p-10 p-5">
      <CreateJobForm />
    </div>
  );
}
