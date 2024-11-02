import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="w-full h-[90vh] flex items-center justify-center">
      <div className="login-form-container shadow-md md:w-2/6 w-5/6 h-fit bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-5">
        <h3 className="font-bold md:text-2xl text-xl w-full text-center">Login to your account</h3>
        <form className="w-full flex flex-col items-center justify-center py-8">
          <input
            type="text"
            className="md:w-4/6 w-5/6 h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
            placeholder="Email"
          />
          <input
            type="password"
            className="md:w-4/6 w-5/6 h-10 px-5 my-2 border placeholder:text-sm focus:outline-[#00B2B2]"
            placeholder="Password"
          />
          <p className="text-xs md:w-4/6 w-5/6 flex items-center justify-start hover:underline cursor-pointer">
            Forgot Password ?
          </p>
          <p className="text-xs md:w-4/6 w-5/6 flex items-center justify-center py-4">
            Don&apos;t have an account?
            <span className="pl-1 hover:underline cursor-pointer">
              <Link href="/signup">Signup</Link>
            </span>
          </p>
          <button className="hover:bg-[#008080] bg-[#00B2B2] text-white py-1 px-3 my-4 md:w-4/6 w-5/6">
            Login
          </button>
          <button className="hover:bg-[#008080] bg-[#00B2B2] text-white py-1 px-3 md:w-4/6 w-5/6 flex items-center justify-center">
            <FaGoogle className="mr-2 w-4 h-4 text-white" /> Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
