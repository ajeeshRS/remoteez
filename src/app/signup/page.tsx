'use client'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { debounce } from 'lodash'
import { useCallback, useState } from 'react'
import axios from 'axios'
import LocationSearchInput from '@/components/ui/locationSearchInput'

export default function Page() {
  const [query, setQuery] = useState<string>('')
  const [employerQuery, setEmployerQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchSuggestions = useCallback(
    debounce(async (inputValue) => {
      if (inputValue.length > 2) {
        setIsLoading(true)
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_GEOAPIFY_API_URL as string, {
            params: {
              text: inputValue,
              apiKey: process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY,
            },
          })
          setSuggestions(response.data.features)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSuggestions([])
      }
    }, 300),
    []
  )

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value
    setQuery(inputValue)
    fetchSuggestions(inputValue)
  }

  const handleSuggestionClick = (suggestion: any) => {
    setQuery(suggestion.properties.formatted)
    setSuggestions([])
  }

  const handleEmployerInputChange = (e: any) => {
    const inputValue = e.target.value
    setEmployerQuery(inputValue)
    fetchSuggestions(inputValue)
  }

  const handleEmployerSuggestionClick = (suggestion: any) => {
    setEmployerQuery(suggestion.properties.formatted)
    setSuggestions([])
  }
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center">
      <div className="login-form-container shadow-md md:w-2/6 w-5/6 h-fit bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-5">
        <h3 className="font-bold md:text-2xl text-xl w-full text-center">Create your account</h3>

        <Tabs defaultValue="jobseeker" className="w-full py-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobseeker">Job seeker</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
          </TabsList>
          <TabsContent value="jobseeker">
            <form>
              <input
                type="text"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm text-sm focus:outline-[#00B2B2]"
                placeholder="Full Name"
              />

              <input
                type="text"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm text-sm focus:outline-[#00B2B2]"
                placeholder="Email"
              />
              <input
                type="password"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm text-sm focus:outline-[#00B2B2]"
                placeholder="Password"
              />
              <>
                <Select>
                  <SelectTrigger className="w-full h-10 my-2">
                    <SelectValue placeholder="Select Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">0-1 yrs</SelectItem>
                    <SelectItem value="banana">1-3 yrs</SelectItem>
                    <SelectItem value="blueberry">3-6 yrs</SelectItem>
                    <SelectItem value="grapes">6-10 yrs</SelectItem>
                    <SelectItem value="pineapple">10+ yrs</SelectItem>
                  </SelectContent>
                </Select>
              </>
              <input
                type="text"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm text-sm focus:outline-[#00B2B2]"
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
              <button className="hover:bg-[#008080] bg-[#00B2B2] text-white py-1 px-3 my-4 w-full">
                Signup
              </button>
            </form>
          </TabsContent>
          <TabsContent value="employer">
            <form>
              <input
                type="text"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Company Name"
              />
              <input
                type="text"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Email"
              />
              <input
                type="password"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
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
              <button className="hover:bg-[#008080] bg-[#00B2B2] text-white py-1 px-3 my-4 w-full">
                Signup
              </button>
            </form>
          </TabsContent>
        </Tabs>
        <p className="text-xs w-full flex items-center justify-center py-2">
          Already have an account?
          <span className="pl-1 hover:underline cursor-pointer">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  )
}
