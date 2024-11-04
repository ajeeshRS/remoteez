import { Suggestion } from '@/app/signup/page';
import { ChangeEvent } from 'react';

interface LocationSearchInputProps {
  placeholder: string;
  query: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  suggestions: Suggestion[];
  handleSuggestionClick: (suggestion: Suggestion) => void;
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
        className="my-2 h-10 w-full border px-5 text-sm placeholder:text-sm focus:outline-[#00B2B2]"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      {isLoading && <div className="mt-2 text-sm">Loading...</div>}
      {suggestions.length !== 0 && (
        <div className="absolute z-10 mt-2 h-fit max-h-36 w-full overflow-scroll rounded-md border bg-white shadow-lg dark:bg-black">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.properties.place_id}
              className="cursor-pointer bg-white px-4 py-2 text-sm hover:bg-neutral-100 dark:bg-black dark:hover:bg-neutral-800"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.properties.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
