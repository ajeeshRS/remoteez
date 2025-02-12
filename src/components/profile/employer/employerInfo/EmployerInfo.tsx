import { RootState } from '@/state/store';
import { MapPin, User } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import EditEmployerInfo from './EditEmployerInfo';

export default function EmployerInfo() {
  const employerDetails = useSelector(
    (state: RootState) => state.employerReducer.employer,
  );

  return (
    <div className="md:h-[90vh] h-[85svh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="pb-10 font-bold text-pink-500"> Employer info</p>

        {employerDetails?.logo !== null && employerDetails?.logo ? (
          <Image
            width={96}
            height={96}
            src={employerDetails?.logo}
            alt="avatar-img"
            className="h-24 w-24 object-cover"
          />
        ) : (
          <p className="flex h-24 w-24 items-center justify-center rounded-full bg-pink-600 text-white">
            <User className="h-8 w-8" />
          </p>
        )}
        <div className="flex flex-col items-start">
          <h3 className="my-2 font-bold">{employerDetails?.name}</h3>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Email</p>
          <p className="my-1 text-sm">{employerDetails?.email}</p>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Role</p>
          <p className="my-2 text-sm">{employerDetails?.role}</p>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Company</p>
          <p className="my-2 text-sm">{employerDetails?.companyName}</p>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Company founded year</p>
          <p className="my-2 text-sm">
            {employerDetails?.foundedYear
              ? employerDetails.foundedYear
              : 'not added yet'}
          </p>
        </div>
        <div className="my-2">
          <p className="text-sm text-neutral-400">Team size</p>
          <p className="my-2 text-sm">
            {employerDetails?.teamSize
              ? employerDetails.teamSize
              : 'not added yet'}
          </p>
        </div>
        <p className="my-3 flex items-center text-sm">
          <MapPin className="mr-2 h-4 w-4" />
          {employerDetails?.companyLocation
            ? employerDetails.companyLocation
            : 'not added yet'}
        </p>

        <div className="my-2">
          <p className="text-sm text-neutral-400">Description</p>
          <p className="my-1 text-sm">
            {employerDetails?.description
              ? employerDetails.description
              : 'Not added yet.'}
          </p>
        </div>
        <EditEmployerInfo employerDetails={employerDetails} />
      </div>
    </div>
  );
}
