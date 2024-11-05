'use client';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { debounce } from 'lodash';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import LocationSearchInput from '@/components/ui/locationSearchInput';

export interface Suggestion {
  properties: {
    formatted: string;
    place_id: string;
  };
}

export default function Page() {
  const [query, setQuery] = useState<string>('');
  const [employerQuery, setEmployerQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    debouncedFetch(inputValue);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.properties.formatted);
    setSuggestions([]);
  };

  const handleEmployerInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setEmployerQuery(inputValue);
    debouncedFetch(inputValue);
  };

  const handleEmployerSuggestionClick = (suggestion: Suggestion) => {
    setEmployerQuery(suggestion.properties.formatted);
    setSuggestions([]);
  };

  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center">
      <div className="login-form-container flex h-fit w-5/6 flex-col items-center justify-center bg-white p-5 shadow-md dark:bg-neutral-900 md:w-2/6">
        <h3 className="w-full text-center text-xl font-bold md:text-2xl">
          Create your account
        </h3>

        <Tabs defaultValue="jobseeker" className="w-full py-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobseeker">Job seeker</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
          </TabsList>
          <TabsContent value="jobseeker">
            <form>
              <input
                type="text"
                className="my-2 h-10 w-full border px-5 text-sm placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Full Name"
              />
              <input
                type="text"
                className="my-2 h-10 w-full border px-5 text-sm placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Email"
              />
              <input
                type="password"
                className="my-2 h-10 w-full border px-5 text-sm placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Password"
              />
              <>
                <Select>
                  <SelectTrigger className="my-2 h-10 w-full">
                    <SelectValue placeholder="Select Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">0-1 yrs</SelectItem>
                    <SelectItem value="banana">1-3 yrs</SelectItem>
                    <SelectItem value="blueberry">3-6 yrs</SelectItem>
                    <SelectItem value="grapes">6+ yrs</SelectItem>
                  </SelectContent>
                </Select>
              </>
              <input
                type="text"
                className="my-2 h-10 w-full border px-5 text-sm placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Desired Job Title"
              />
              <LocationSearchInput
                placeholder={'Current location'}
                query={query}
                suggestions={suggestions}
                handleInputChange={handleInputChange}
                handleSuggestionClick={handleSuggestionClick}
                isLoading={isLoading}
              />
              <button className="my-4 w-full bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080]">
                Signup
              </button>
            </form>
          </TabsContent>
          <TabsContent value="employer">
            <form>
              <input
                type="text"
                className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Company Name"
              />
              <input
                type="text"
                className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Email"
              />
              <input
                type="password"
                className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Password"
              />
              <LocationSearchInput
                placeholder={'Company Location'}
                query={employerQuery}
                suggestions={suggestions}
                handleInputChange={handleEmployerInputChange}
                handleSuggestionClick={handleEmployerSuggestionClick}
                isLoading={isLoading}
              />
              <button className="my-4 w-full bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080]">
                Signup
              </button>
            </form>
          </TabsContent>
        </Tabs>
        <p className="flex w-full items-center justify-center py-2 text-xs">
          Already have an account?
          <span className="cursor-pointer pl-1 hover:underline">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
