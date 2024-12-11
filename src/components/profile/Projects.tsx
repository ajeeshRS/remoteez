import { Link, Pen, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Projects({ projects }: any) {
  const [input, setInput] = useState('');
  const [skillSet, setSkillSet] = useState<string[]>([]);
  const skills = ['Javascript', 'Rust', 'Typescript', 'Reactjs', 'Nodejs'];

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
  // const projects = [
  //   {
  //     title: 'E-Commerce Platform',
  //     desc: 'A fully functional e-commerce platform with a secure payment gateway, user authentication, and order tracking.',
  //     githubUrl: 'https://github.com/username/ecommerce-platform',
  //     deployedUrl: 'https://ecommerce-platform.example.com',
  //     skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'CSS'],
  //   },
  //   {
  //     title: 'Blogging Platform',
  //     desc: 'A blogging platform where users can write, edit, and publish blog posts with SEO-friendly URLs and a clean, responsive design.',
  //     githubUrl: 'https://github.com/username/blogging-platform',
  //     deployedUrl: 'https://blogging-platform.example.com',
  //     skills: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
  //   },
  //   {
  //     title: 'Crypto Wallet',
  //     desc: 'A secure web-based crypto wallet to generate mnemonics, create multiple wallets, and view public keys for each wallet.',
  //     githubUrl: 'https://github.com/username/crypto-wallet',
  //     deployedUrl: 'https://crypto-wallet.example.com',
  //     skills: ['React', 'TypeScript', 'Solana Web3.js', 'Zod', 'Tailwind CSS'],
  //   },
  //   {
  //     title: 'Task Management App',
  //     desc: 'A productivity app to manage daily tasks with support for deadlines, progress tracking, and a drag-and-drop interface.',
  //     githubUrl: 'https://github.com/username/task-manager',
  //     deployedUrl: 'https://task-manager.example.com',
  //     skills: ['React', 'Redux', 'Firebase', 'Firestore', 'CSS Modules'],
  //   },
  //   {
  //     title: 'Decentralized Voting dApp',
  //     desc: 'A decentralized voting system on the Solana blockchain that ensures secure, transparent, and tamper-proof elections.',
  //     githubUrl: 'https://github.com/username/solana-voting-dapp',
  //     deployedUrl: 'https://solana-voting-dapp.example.com',
  //     skills: [
  //       'Solana',
  //       'Rust',
  //       'Anchor',
  //       'React',
  //       'TypeScript',
  //       'Tailwind CSS',
  //     ],
  //   },
  // ];
  return (
    <div className="min-h-[90vh] overflow-y-scroll w-full md:px-20 px-5 p-5 text-white">
      <div className="flex w-full flex-col items-start justify-between p-10">
        <p className="font-bold text-pink-500">Projects</p>
        <div className="my-10 grid grid-cols-2 gap-6">
          {projects?.length !== 0 ? (
            projects?.map((project: any) => (
              <div
                key={project.title}
                className="border border-pink-400/20 p-4"
              >
                <div className="flex w-full items-center justify-between">
                  <p className="py-2 font-bold text-neutral-300">
                    {project.title}
                  </p>
                  <button className="bg-pink-400 p-1 hover:bg-pink-500">
                    <Pen className="h-4 w-4" />
                  </button>
                </div>
                <p className="py-1 text-sm">{project.desc}</p>
                <p className="flex items-center py-2 text-sm">
                  <Link className="mr-1 h-4 w-4 text-gray-200" />{' '}
                  {project.githubUrl}
                </p>
                <p className="flex items-center py-2 text-sm">
                  <Link className="mr-1 h-4 w-4 text-gray-200" />{' '}
                  {project.deployedUrl}
                </p>
                <div className="grid grid-cols-3">
                  {project.skills.map((skill: any) => (
                    <p
                      className="my-2 mr-2 flex items-center justify-between text-nowrap bg-pink-400/20 px-2 py-1"
                      key={skill}
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className='p-3'>No projects added yet.</p>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <button className="border border-pink-600 p-3 hover:border-transparent hover:bg-pink-600">
                Add new project
              </button>
            </SheetTrigger>
            <SheetContent
              side={'right'}
              className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Add project</SheetTitle>
              </SheetHeader>
              <div className="flex h-fit w-full flex-col overflow-y-scroll py-10">
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Project title
                  </label>
                  <input
                    type="text"
                    className="w-full border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Description
                  </label>
                  <textarea className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none" />
                </div>
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Github URL
                  </label>
                  <input
                    type="text"
                    className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div className="flex w-full flex-col">
                  <label className="my-1 py-2 text-sm text-neutral-200">
                    Deployed URL
                  </label>
                  <input
                    type="text"
                    className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                  />
                </div>
                <div className="my-5 flex flex-col items-start">
                  <div className="flex flex-col">
                    <label className="my-1 py-2 text-sm text-neutral-200">
                      Add skills by pressing ENTER after typing
                    </label>
                    <input
                      onKeyDown={(e) => handleKeyDown(e)}
                      onChange={(e) => setInput(e.target.value)}
                      value={input}
                      type="text"
                      className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
                      placeholder="Add skills"
                    />
                  </div>
                  <div className="grid grid-cols-2 py-5">
                    {skillSet.map((skill, i) => (
                      <p
                        className="my-2 mr-2 flex items-center justify-between text-wrap bg-pink-400/60 px-2 py-1 text-white"
                        key={i}
                      >
                        {skill}
                        <X
                          className="mx-1 h-4 w-4 cursor-pointer hover:text-pink-600"
                          onClick={() => handleSkillRemoval(skill)}
                        />
                      </p>
                    ))}
                  </div>
                </div>
                <SheetClose className="bg-white py-2 hover:bg-neutral-300">
                  Add
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
