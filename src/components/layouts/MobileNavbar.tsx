'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CustomSession } from '@/lib/auth';
import { EMPLOYER, JOBSEEKER } from '@/lib/constants/app.constants';
import { LogOut, Plus } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { RiMenu2Fill } from 'react-icons/ri';
import { BsStack } from 'react-icons/bs';
import { FaHireAHelper } from 'react-icons/fa';
import { TbWorldSearch } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

export default function MobileNavbar() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const customSession = session as CustomSession;
  return (
    <div className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center justify-center">
            <RiMenu2Fill className="h-5 w-5 text-black dark:text-white" />
          </button>
        </SheetTrigger>
        <SheetContent side={'left'} className="bg-white dark:bg-neutral-900">
          <SheetHeader>
            <SheetTitle className="flex w-full items-center justify-start text-2xl">
              Remoteez
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-full w-full flex-col items-start justify-between py-10">
            <ul className="w-full">
              {status !== 'loading' && customSession?.user.role === EMPLOYER ? (
                <>
                  <li className="flex cursor-pointer items-center border-none py-2 pl-2 text-lg outline-none hover:text-pink-500">
                    <Plus className="mr-2 h-4 w-4" /> Post a job
                  </li>
                </>
              ) : customSession?.user.role === JOBSEEKER ? (
                <>
                  <li className="flex cursor-pointer items-center border-none py-2 pl-2 text-lg outline-none hover:text-pink-500">
                    <BsStack className="mr-2 h-4 w-4" /> Explore jobs
                  </li>
                </>
              ) : (
                <>
                  <li className="flex cursor-pointer items-center border-none py-2 pl-2 text-lg outline-none hover:text-pink-500">
                    <TbWorldSearch className="mr-2 h-4 w-4" /> For Jobs
                  </li>
                  <li className="flex cursor-pointer items-center border-none py-2 pl-2 text-lg outline-none hover:text-pink-500">
                    <FaHireAHelper className="mr-2 h-4 w-4" /> For Hire
                  </li>
                </>
              )}
            </ul>

            {status !== 'loading' && customSession?.user ? (
              <div className="flex h-fit w-full items-center justify-between bg-neutral-100 px-3 py-2 dark:bg-neutral-600">
                <div className="flex items-center">
                  <p className="flex h-10 w-10 items-center justify-center bg-[#00B2B2] text-white">
                    {customSession?.user.name.charAt(0).toUpperCase()}
                  </p>
                  <p className="px-2">{customSession?.user.name}</p>
                </div>
                <SheetClose onClick={() => signOut()}>
                  <LogOut className="h-5 w-5" />
                </SheetClose>
              </div>
            ) : (
              <SheetClose
                className="my-4 flex w-full items-center justify-center bg-[#00B2B2] px-3 py-1 text-white outline-none hover:bg-[#008080] md:w-5/6"
                onClick={() => router.push('/login')}
              >
                Login
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
