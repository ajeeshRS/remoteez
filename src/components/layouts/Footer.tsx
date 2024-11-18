import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex md:flex-row flex-col items-center justify-between px-10 py-5 md:px-20 dark:bg-neutral-900 bg-white">
      <div>
        <p className="font-medium text-sm flex items-center md:my-0 my-2"> <Copyright className="w-4 h-4 mx-2"/> 2024 Remoteez.</p>
      </div>
      <ul className="flex items-center md:my-0 my-2">
        <li className="text-sm mx-3 font-medium cursor-pointer hover:text-pink-500">About</li>
        <li className="text-sm mx-3 font-medium cursor-pointer hover:text-pink-500">Blog</li>
        <li className="text-sm mx-3 font-medium cursor-pointer hover:text-pink-500">Contact</li>
        <li className="text-sm mx-3 font-medium cursor-pointer hover:text-pink-500">Twitter</li>
      </ul>
    </footer>
  );
}
