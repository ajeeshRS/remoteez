'use client';
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
import LocationSearchInput from '@/components/ui/locationSearchInput';
import Loader from '@/components/ui/loader';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Suggestion } from '@/app/signup/page';
import axios from 'axios';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/components/ui/error-msg';
import {
  EmployerInfoSchema,
  EmployerInfoSchemaType,
} from '@/lib/validators/employer/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmployerProfile } from '@/types/common';
import {
  getEmployerInfo,
  updateEmployerInfo,
} from '@/app/actions/employer/actions';
import { toast } from 'sonner';
import { setEmployerProfile } from '@/state/profile/employerSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/state/store';
import { Role } from '@prisma/client';
interface Props {
  employerDetails: EmployerProfile | null;
}
export default function EditEmployerInfo({ employerDetails }: Props) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployerInfoSchemaType>({
    resolver: zodResolver(EmployerInfoSchema),
    defaultValues: {
      logo: undefined,
      name: '',
      companyName: '',
      companyLocation: '',
      description: '',
      role: 'HR',
      foundedYear: undefined,
      teamSize: undefined,
    },
  });

  const location = watch('companyLocation');
  const role = watch('role');

  const handleProfileUpdation = async (data: EmployerInfoSchemaType) => {
    try {
      setUpdating(true);
      const logoFile = data.logo instanceof FileList ? data.logo[0] : data.logo;

      const { ...profileData } = data;
      const submitData = {
        ...profileData,
        ...(logoFile ? { logo: logoFile } : {}),
      };

      console.log(submitData);
      const response = await updateEmployerInfo(submitData);
      if (response.success) {
        toast.success(response.message);
        const { employerProfile } = await getEmployerInfo();
        if (employerProfile) {
          dispatch(setEmployerProfile(employerProfile));
        }
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue('companyLocation', inputValue);
    debouncedFetch(inputValue);
  };

  const handleSelectLocation = (suggestion: Suggestion) => {
    setValue('companyLocation', suggestion.properties.formatted);
    setSuggestions([]);
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
    if (employerDetails) {
      reset({
        email: employerDetails?.email || '',
        name: employerDetails?.name || '',
        companyLocation: employerDetails?.companyLocation || '',
        description: employerDetails?.description || '',
        companyName: employerDetails?.companyName || '',
        role: employerDetails?.role || 'HR',
        foundedYear: employerDetails?.foundedYear || undefined,
        teamSize: employerDetails?.teamSize || undefined,
      });
    }
  }, [reset,employerDetails]);
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
        className="md:h-full min-h-[100svh] overflow-y-scroll border-l-pink-400/40 bg-black py-10"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Edit profile</SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(handleProfileUpdation)}
          className="flex h-fit w-full flex-col overflow-y-scroll py-4"
        >
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
            <label className="my-1 py-2 text-sm text-neutral-200">Name</label>
            <input
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('name')}
            />
            <ErrorMessage err={errors.name} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Company logo
            </label>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              className="w-full border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('logo')}
            />
            <ErrorMessage err={errors.logo} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Company name
            </label>
            <input
              type="text"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('companyName')}
            />
            <ErrorMessage err={errors.companyName} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Company description
            </label>
            <textarea
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('description')}
            />
            <ErrorMessage err={errors.description} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Company founded year
            </label>
            <input
              type="number"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('foundedYear')}
            />
            <ErrorMessage err={errors.foundedYear} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Team size{' '}
            </label>
            <input
              type="number"
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
              {...register('teamSize')}
            />
            <ErrorMessage err={errors.teamSize} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">Role</label>
            <Select
              onValueChange={(value: Role) => setValue('role', value)}
              value={role}
            >
              <SelectTrigger className="h-10 w-full">
                <SelectValue className="text-white" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="CEO">CEO</SelectItem>
                <SelectItem value="FOUNDER">FOUNDER</SelectItem>
              </SelectContent>
            </Select>
            <ErrorMessage err={errors.role} />
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
          <ErrorMessage err={errors.companyLocation} />
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
