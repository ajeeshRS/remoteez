import Loader from '@/components/ui/loader';

export default function Page() {
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex h-fit w-2/5 flex-col items-center justify-center p-5 shadow-md dark:bg-neutral-900">
        <h2 className="w-full text-center text-xl font-bold md:text-2xl py-3">
          Forgot Password
        </h2>
        <input
          type="text"
          className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2] md:w-5/6"
          placeholder="Enter your registered email"
        />
        <button
          type="submit"
          className="hover:bg-[#008080 my-4 flex w-full items-center justify-center bg-[#00B2B2] px-3 py-1 text-white outline-none md:w-5/6"
        >
          send reset mail
        </button>
      </div>
    </div>
  );
}
