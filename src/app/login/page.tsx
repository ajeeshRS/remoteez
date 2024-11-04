import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';

export default function Page() {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="login-form-container flex h-fit w-5/6 flex-col items-center justify-center bg-white p-5 shadow-md dark:bg-neutral-900 md:w-2/6">
        <h3 className="w-full text-center text-xl font-bold md:text-2xl">
          Login to your account
        </h3>
        <form className="flex w-full flex-col items-center justify-center py-8">
          <input
            type="text"
            className="my-2 h-10 w-5/6 border px-5 placeholder:text-sm focus:outline-[#00B2B2] md:w-4/6"
            placeholder="Email"
          />

          <input
            type="password"
            className="my-2 h-10 w-5/6 border px-5 placeholder:text-sm focus:outline-[#00B2B2] md:w-4/6"
            placeholder="Password"
          />
          <p className="flex w-5/6 cursor-pointer items-center justify-start text-xs hover:underline md:w-4/6">
            Forgot Password ?
          </p>
          <p className="flex w-5/6 items-center justify-center py-4 text-xs md:w-4/6">
            Don&apos;t have an account?
            <span className="cursor-pointer pl-1 hover:underline">
              <Link href="/signup">Signup</Link>
            </span>
          </p>
          <button className="my-4 w-5/6 bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080] md:w-4/6">
            Login
          </button>
          <button className="flex w-5/6 items-center justify-center bg-[#00B2B2] px-3 py-1 text-white hover:bg-[#008080] md:w-4/6">
            <FaGoogle className="mr-2 h-4 w-4 text-white" /> Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
