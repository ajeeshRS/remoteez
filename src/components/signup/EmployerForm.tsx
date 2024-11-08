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
import { debounce } from 'lodash';
import axios from 'axios';
import { Suggestion } from '@/app/signup/page';
import { useForm } from 'react-hook-form';
import {
  EmployerSignupSchema,
  EmployerSignupSchemaType,
} from '@/lib/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../ui/error-msg';

export default function EmployerForm() {
  const [companyLocation, setCompanyLocation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployerSignupSchemaType>({
    resolver: zodResolver(EmployerSignupSchema),
    defaultValues: {
      email: '',
      companyName: '',
      password: '',
      role: '',
      companyLocation: '',
    },
  });

  const handleLocationInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCompanyLocation(inputValue);
    setValue('companyLocation', inputValue, { shouldValidate: true });
    debouncedFetch(inputValue);
  };

  const handleSelectLocation = (suggestion: Suggestion) => {
    setCompanyLocation(suggestion.properties.formatted);
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
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input
        {...register('email')}
        type="text"
        className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2]"
        placeholder="Email"
      />
      <ErrorMessage err={errors.email} />
      <input
        {...register('companyName')}
        type="text"
        className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2]"
        placeholder="Company Name"
      />
      <ErrorMessage err={errors.companyName} />

      <input
        {...register('password')}
        type="password"
        className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2]"
        placeholder="Password"
      />
      <ErrorMessage err={errors.password} />

      <>
        <Select
          onValueChange={(value) =>
            setValue('role', value, { shouldValidate: true })
          }
        >
          <SelectTrigger className="my-2 h-10 w-full">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CEO">CEO</SelectItem>
            <SelectItem value="FOUNDER">Founder</SelectItem>
            <SelectItem value="HR">HR</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage err={errors.role} />
      </>
      <LocationSearchInput
        placeholder={'Company Location'}
        value={companyLocation}
        suggestions={suggestions}
        handleInputChange={handleLocationInput}
        handleSelectLocation={handleSelectLocation}
        isLoading={isLoading}
      />
      <ErrorMessage err={errors.companyLocation} />

      <button
        type="submit"
        className="my-4 w-full bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080]"
      >
        Signup
      </button>
    </form>
  );
}
