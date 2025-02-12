'use client';
import { MapPin, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

import EditInfo from './EditInfo';
import { RootState } from '@/state/store';
import Loader from '@/components/ui/loader';
import { updateOpenToWorkStatus } from '@/app/actions/jobseeker/actions';

interface Props {
  refetch: () => void;
}

export default function PersonalInfo({ refetch }: Props) {
  const personalDetails = useSelector(
    (state: RootState) => state.jobseekerReducer.jobseeker,
  );
  const { status } = useSession();

  const handleOpenToWorkStatus = async () => {
    const response = await updateOpenToWorkStatus(
      !personalDetails?.openToWork as boolean,
    );
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(response.error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex h-[90vh] w-full items-center justify-center bg-black">
        <Loader />
      </div>
    );
  }
  return (
    <div className="h-[90dvh] w-full overflow-y-scroll p-5 px-5 text-white md:h-[90vh] md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="pb-10 font-bold text-pink-500"> Personal info</p>

        {personalDetails?.avatar !== null && personalDetails?.avatar ? (
          <Image
            width={96}
            height={96}
            src={personalDetails?.avatar}
            alt="avatar-img"
            className="h-24 w-24 object-cover"
          />
        ) : (
          <p className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-600 text-white">
            <User className="h-8 w-8" />
          </p>
        )}
        <div className="flex items-center">
          <h3 className="my-2 font-bold">{personalDetails?.fullName}</h3>
        </div>
        <p className="text-base">
          <span className="mr-3 text-neutral-400">You are a</span>
          {personalDetails?.desiredJobTitle}
        </p>
        <p className="my-3 flex items-center text-sm">
          <MapPin className="mr-2 h-4 w-4" />
          {personalDetails?.location}
        </p>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Email</p>
          <p className="my-1 text-sm">{personalDetails?.email}</p>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Preferred job type</p>
          <p className="my-1 text-sm">
            {personalDetails?.preferredJobType
              ? personalDetails.preferredJobType
              : 'not added yet'}
          </p>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Bio</p>
          <p className="my-1 text-sm">
            {personalDetails?.bio ? personalDetails.bio : 'Not added yet.'}
          </p>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Status</p>
          <p className="my-1 text-sm">
            {personalDetails?.openToWork ? 'Open to work' : 'Not open to work'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <EditInfo personalDetails={personalDetails} refetch={refetch} />
          <button
            onClick={handleOpenToWorkStatus}
            className='className="my-4 hover:bg-pink-600" border border-pink-600 p-3 hover:border-transparent hover:bg-pink-600'
          >
            {personalDetails?.openToWork ? 'Not open to work' : 'Open to work'}
          </button>
        </div>
      </div>
    </div>
  );
}
