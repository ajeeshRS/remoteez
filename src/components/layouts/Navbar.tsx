"use client";
import { mulish } from "@/app/fonts/fonts";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="relative z-10 w-full px-10 py-4 flex items-center  justify-between text-black bg-white dark:bg-neutral-900">
      <div className="Logo">
        <h2
          onClick={() => router.push("/")}
          className={`font-bold text-2xl flex items-start ${mulish.className} dark:text-neutral-50 cursor-pointer`}
        >
          Remoteez
        </h2>
      </div>
      <ul className="nav-item-container w-2/5 flex items-center justify-between">
        <li className="md:block hidden hover:text-neutral-800 text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-50 cursor-pointer">
          For job seekers
        </li>
        <li className="md:block hidden hover:text-neutral-800 text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-50 cursor-pointer">
          For employers
        </li>
        <li>
          {resolvedTheme && (
            <button onClick={toggleTheme} className="flex items-center">
              {resolvedTheme === "light" ? (
                <Moon className="w-5 h-5 text-neutral-800 dark:text-neutral-50" />
              ) : (
                <Sun className="w-5 h-5 text-neutral-800 dark:text-neutral-50" />
              )}
            </button>
          )}
        </li>
        <li>
          <button
            onClick={() => router.push("/login")}
            className="hover:bg-[#008080] bg-[#00B2B2] text-white py-1 px-3"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
}
