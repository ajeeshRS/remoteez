import { Suggestion } from '@/app/signup/page';
import { ChangeEvent } from 'react';

interface LocationSearchInputProps {
  placeholder: string;
  value: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  suggestions: Suggestion[];
  handleSelectLocation: (suggestion: Suggestion) => void;
}

export default function LocationSearchInput({
  placeholder,
  value,
  handleInputChange,
  isLoading,
  suggestions,
  handleSelectLocation,
}: LocationSearchInputProps) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-sm text-white outline-none placeholder:text-sm focus:border-neutral-400"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
      />
      {isLoading && <div className="mt-2 text-sm text-white">Loading...</div>}
      {suggestions.length !== 0 && (
        <div className="absolute z-10 mt-2 h-fit max-h-36 w-full overflow-scroll rounded-md border border-gray-600 bg-black shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.properties.place_id}
              className="cursor-pointer bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-black"
              onClick={() => handleSelectLocation(suggestion)}
            >
              {suggestion.properties.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
