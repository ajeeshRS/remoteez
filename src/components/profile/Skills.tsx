'use client';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Skills({ skills }: any) {
  const [input, setInput] = useState('');
  const [skillSet, setSkillSet] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSkillSet((prev) => [...prev, input]);
      setInput('');
    }
  };

  const handleSkillRemoval = (skil: string) => {
    setSkillSet((prev) => prev.filter((skill) => skill !== skil));
  };

  useEffect(() => {
    setSkillSet(skills);
  }, []);
  return (
    <div className="min-h-[90vh] overflow-y-scroll w-full md:px-20 px-5 p-5 text-white">
      <div className="flex w-full flex-col items-start justify-between p-10">
        <p className="font-bold text-pink-500"> Skills</p>
        <div className="grid grid-cols-3 py-5">
          {skillSet?.length === 0 && <p>No skills added yet.</p>}
          {skillSet?.map((skill, _) => (
            <p
              className="my-2 mr-2 flex items-center justify-between text-nowrap bg-pink-400/20 px-2 py-1"
              key={skill}
            >
              {skill}{' '}
              <X
                className="mx-1 h-4 w-4 cursor-pointer hover:text-pink-600"
                onClick={() => handleSkillRemoval(skill)}
              />
            </p>
          ))}
        </div>
        <div className="my-5 flex items-end">
          <div className="flex flex-col">
            <label className="my-1 py-2 text-sm text-neutral-400">
              Add skills by pressing ENTER after typing
            </label>
            <input
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              className="border border-pink-400/20 bg-transparent px-3 py-2 text-sm text-white outline-none"
              placeholder="Add skills"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
