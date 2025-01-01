'use client';
import { LogOut, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { CustomSession } from '@/lib/auth';
import { EMPLOYER, JOBSEEKER } from '@/lib/constants/app.constants';
import { getJobseekerInfo } from '@/app/actions/jobseeker/actions';
import { getEmployerInfo } from '@/app/actions/employer/actions';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { setEmployerProfile } from '@/state/profile/employerSlice';
import { AppDispatch } from '@/state/store';

export default function Avatar() {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string>('');
  const { data: session } = useSession();
  const customSession = session as CustomSession;
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const fetchProfileDetails = async () => {
    try {
      setLoading(true);

      if (session?.user.role === JOBSEEKER) {
        const { jobSeekerProfile } = await getJobseekerInfo();
        if (jobSeekerProfile) {
          setAvatar(jobSeekerProfile.avatar as string);
          dispatch(setJobseekerProfile(jobSeekerProfile));
        }
      } else if (session?.user.role === EMPLOYER) {
        const { employerProfile } = await getEmployerInfo();
        if (employerProfile) {
          setAvatar(employerProfile.logo as string);
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
    fetchProfileDetails();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {avatar && !loading ? (
          <Image
            width={32}
            height={32}
            className="h-8 w-8 cursor-pointer object-cover"
            src={avatar}
            alt="avatar"
          />
        ) : (
          <button className="cursor-pointer border-none bg-neutral-600 px-3 py-1 text-white outline-none">
            {customSession?.user.name.charAt(0).toUpperCase()}
          </button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="pl-2">
          Hi, {customSession?.user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => router.push('/profile')}
          className="flex cursor-pointer items-center border-none py-2 pl-2 text-sm text-white outline-none hover:text-pink-500"
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex cursor-pointer items-center border-none py-2 pl-2 text-sm text-white outline-none hover:text-pink-500"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
