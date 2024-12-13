'use client';
import { MapPin, User } from 'lucide-react';
import EditInfo from './EditInfo';
import { ProfileDetailProps } from '@/types/common';

interface Props {
  personalDetails?: ProfileDetailProps;
  refetch: () => void;
}
export default function PersonalInfo({ personalDetails, refetch }: Props) {
  return (
    <div className="h-[90vh] overflow-y-scroll w-full md:px-20 px-5 p-5 text-white">

      <div className="flex w-full flex-col items-start justify-between p-10">
      <p className="font-bold text-pink-500 pb-10"> Personal info</p>

        <p className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-600 text-white">
          <User className="h-8 w-8" />
        </p>
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
        <EditInfo personalDetails={personalDetails} refetch={refetch} />
      </div>
    </div>
  );
}
