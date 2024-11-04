import { Suggestion } from '@/app/signup/page'
import { ChangeEvent } from 'react'

interface LocationSearchInputProps {
  placeholder: string
  query: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  suggestions: Suggestion[]
  handleSuggestionClick: (suggestion: Suggestion) => void
}

export default function LocationSearchInput({
  placeholder,
  query,
  handleInputChange,
  isLoading,
  suggestions,
  handleSuggestionClick,
}: LocationSearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="w-full h-10 px-5 my-2 border placeholder:text-sm text-sm focus:outline-[#00B2B2]"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      {isLoading && <div className="mt-2 text-sm">Loading...</div>}
      {suggestions.length !== 0 && (
        <div className="absolute z-10 w-full mt-2 dark:bg-black bg-white border rounded-md shadow-lg h-fit max-h-36 overflow-scroll">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.properties.place_id}
              className="px-4 py-2 cursor-pointer bg-white hover:bg-neutral-100 dark:bg-black dark:hover:bg-neutral-800 text-sm"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.properties.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
