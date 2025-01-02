'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LocationSearchInput from '../ui/locationSearchInput';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  JobSeekerSignupSchema,
  JobSeekerSignupSchemaType,
} from '@/lib/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Suggestion } from '@/app/signup/page';
import { debounce } from 'lodash';
import axios from 'axios';
import ErrorMessage from '../ui/error-msg';
import { handleJobSeekerSignup } from '@/lib/auth.axios';
import Loader from '../ui/loader';
import { ExperienceRange } from '@prisma/client';

export default function JobSeekerForm() {
  const [location, setLocation] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [signing, setSigning] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<JobSeekerSignupSchemaType>({
    resolver: zodResolver(JobSeekerSignupSchema),
    defaultValues: {
      email: '',
      fullname: '',
      password: '',
      desiredJobTitle: '',
      currentLocation: '',
    },
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
    setValue('currentLocation', inputValue, { shouldValidate: true });
    debouncedFetch(inputValue);
  };

  const handleSelectLocation = (suggestion: Suggestion) => {
    setLocation(suggestion.properties.formatted);
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

  return (
    <form
      onSubmit={handleSubmit((data) =>
        handleJobSeekerSignup(data, setSigning, reset),
      )}
    >
      <input
        type="text"
        {...register('fullname')}
        className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-sm outline-none placeholder:text-sm focus:border-neutral-400"
        placeholder="Full Name"
      />
      <ErrorMessage err={errors.fullname} />
      <input
        type="text"
        {...register('email')}
        className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-sm outline-none placeholder:text-sm focus:border-neutral-400"
        placeholder="Email"
      />
      <ErrorMessage err={errors.email} />

      <input
        type="password"
        {...register('password')}
        className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-sm outline-none placeholder:text-sm focus:border-neutral-400"
        placeholder="Password"
      />
      <ErrorMessage err={errors.password} />

      <>
        <Select
          onValueChange={(value: ExperienceRange) =>
            setValue('experience', value, { shouldValidate: true })
          }
        >
          <SelectTrigger className="my-2 h-10 w-full">
            <SelectValue placeholder="Select Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ZERO_TO_ONE">0-1 yrs</SelectItem>
            <SelectItem value="ONE_TO_THREE">1-3 yrs</SelectItem>
            <SelectItem value="THREE_TO_SIX">3-6 yrs</SelectItem>
            <SelectItem value="SIX_PLUS">6+ yrs</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage err={errors.experience} />
      </>
      <input
        type="text"
        {...register('desiredJobTitle')}
        className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-sm outline-none placeholder:text-sm focus:border-neutral-400"
        placeholder="Desired Job Title"
      />
      <ErrorMessage err={errors.desiredJobTitle} />

      <LocationSearchInput
        placeholder={'Current location'}
        value={location}
        suggestions={suggestions}
        handleInputChange={handleInputChange}
        handleSelectLocation={handleSelectLocation}
        isLoading={isLoading}
      />
      <ErrorMessage err={errors.currentLocation} />

      <button
        type="submit"
        className="my-4 flex h-10 w-full items-center justify-center bg-pink-600 px-3 text-white outline-none hover:bg-pink-700"
      >
        {signing ? <Loader /> : 'Signup'}
      </button>
    </form>
  );
}
