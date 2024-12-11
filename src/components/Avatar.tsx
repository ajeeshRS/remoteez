import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { LogOut, User } from 'lucide-react';
import { CustomSession } from '@/lib/auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Avatar() {
  const { data: session } = useSession();
  const customSession = session as CustomSession;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="border-none bg-neutral-600 px-3 py-1 text-white outline-none">
          {customSession?.user.name.charAt(0).toUpperCase()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="pl-2">
          Hi, {customSession?.user.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center border-none py-2 pl-2 text-sm text-white outline-none hover:text-pink-500">
          <User className="mr-2 h-4 w-4" />
          <Link href={'/profile'}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex cursor-pointer items-center border-none py-2 pl-2 text-sm text-white outline-none hover:text-pink-500"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
