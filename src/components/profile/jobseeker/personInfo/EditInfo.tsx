import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import LocationSearchInput from '../../../ui/locationSearchInput';
import { Suggestion } from '@/app/signup/page';
import {
  PersonalInfoSchema,
  PersonalInfoSchemaType,
} from '@/lib/validators/jobseeker/profile.validator';
import { updateJobseekerInfo } from '@/app/actions/jobseeker/actions';
import Loader from '@/components/ui/loader';
import ErrorMessage from '@/components/ui/error-msg';
import { JobSeekerProfile } from '@/types/common';
import { JobType } from '@prisma/client';

interface Props {
  personalDetails: JobSeekerProfile | null;
  refetch: () => void;
}

export default function EditInfo({ personalDetails, refetch }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PersonalInfoSchemaType>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      avatar: undefined,
      email: '',
      fullName: '',
      location: '',
      desiredJobTitle: '',
      bio: '',
      preferredJobType: 'FULL_TIME',
    },
  });

  const location = watch('location');
  const preferredJobType = watch('preferredJobType');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue('location', inputValue);
    debouncedFetch(inputValue);
  };

  const handleSelectLocation = (suggestion: Suggestion) => {
    setValue('location', suggestion.properties.formatted);
    setSuggestions([]);
  };

  const handleProfileUpdation = async (data: PersonalInfoSchemaType) => {
    try {
      setUpdating(true);
      const avatarFile =
        data.avatar instanceof FileList ? data.avatar[0] : data.avatar;

      const { ...profileData } = data;
      const submitData = {
        ...profileData,
        ...(avatarFile ? { avatar: avatarFile } : {}),
      };

      console.log(submitData);
      const response = await updateJobseekerInfo(submitData);
      if (response.success) {
        toast.success(response.message);
        refetch();
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const debouncedFetch = useRef(
    debounce(async (inputValue: string) => {
      if (inputValue.length > 2) {
        setIsLoading(true);
        try {
          const response = await axios.get(
            process.env.NEXT_PUBLIC_GEOAPIFY_API_URL as string,
            {
              params: {
                text: inputValue,
                apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
              },
            },
          );
          setSuggestions(response.data.features);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300),
  ).current;

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  useEffect(() => {
    if (personalDetails?.location) {
      setValue('location', personalDetails.location);
    }
  }, [personalDetails, setValue]);

  useEffect(() => {
    if (personalDetails) {
      reset({
        email: personalDetails?.email || '',
        fullName: personalDetails?.fullName || '',
        location: personalDetails?.location || '',
        desiredJobTitle: personalDetails?.desiredJobTitle || '',
        bio: personalDetails?.bio || '',
        preferredJobType: personalDetails?.preferredJobType || 'FULL_TIME',
      });
    }
  }, [reset,personalDetails]);

  return (
    <Sheet
      onOpenChange={(open) => {
        if (open) {
          document.body.classList.add('sheet-open');
        } else {
          document.body.classList.remove('sheet-open');
        }
      }}
    >
      <SheetTrigger className="my-4 border border-pink-600 p-3 hover:border-transparent hover:bg-pink-600">
        Edit profile
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Edit profile</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => handleProfileUpdation(data))}
          className="flex h-fit w-full flex-col overflow-y-scroll py-10"
        >
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">Avatar</label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              className="w-full border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('avatar')}
            />
            <ErrorMessage err={errors.avatar} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">Email</label>
            <input
              type="text"
              className="w-full border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('email')}
            />
            <ErrorMessage err={errors.email} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Full name
            </label>
            <input
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('fullName')}
            />
            <ErrorMessage err={errors.fullName} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">Bio</label>
            <textarea
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('bio')}
            />
            <ErrorMessage err={errors.bio} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">Role</label>
            <input
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('desiredJobTitle')}
            />
            <ErrorMessage err={errors.desiredJobTitle} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Preferred job type
            </label>
            <Select
              onValueChange={(value: JobType) =>
                setValue('preferredJobType', value)
              }
              value={preferredJobType}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue className="text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PART_TIME">Part time</SelectItem>
                <SelectItem value="FULL_TIME">Full time</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage err={errors.preferredJobType} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Location
            </label>
            <LocationSearchInput
              placeholder={'Current location'}
              value={location}
              suggestions={suggestions}
              handleInputChange={handleInputChange}
              handleSelectLocation={handleSelectLocation}
              isLoading={isLoading}
            />
          </div>
          <ErrorMessage err={errors.location} />
          <button
            type="submit"
            className="my-5 flex items-center justify-center bg-white py-2 hover:bg-neutral-300"
          >
            {updating ? <Loader /> : 'Update'}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
