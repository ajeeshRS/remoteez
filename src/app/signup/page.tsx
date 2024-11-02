import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center">
      <div className="login-form-container shadow-md md:w-2/6 w-5/6 h-fit bg-white dark:bg-neutral-900 flex flex-col items-center justify-center p-5">
        <h3 className="font-bold md:text-2xl text-xl w-full text-center">Create your account</h3>

        <Tabs defaultValue="jobseeker" className="w-full py-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobseeker">Job seeker</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
          </TabsList>
          <TabsContent value="jobseeker">
            <form>
              <input
                type="text"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Full Name"
              />

              <input
                type="text"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Email"
              />
              <input
                type="password"
                className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
                placeholder="Password"
              />
              <>
                <Select>
                  <SelectTrigger className="w-full h-10 my-2">
                    <SelectValue placeholder="Select Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">0-1 yrs</SelectItem>
                    <SelectItem value="banana">1-3 yrs</SelectItem>
                    <SelectItem value="blueberry">3-6 yrs</SelectItem>
                    <SelectItem value="grapes">6-10 yrs</SelectItem>
                    <SelectItem value="pineapple">10+ yrs</SelectItem>
                  </SelectContent>
                </Select>
              </>

              <button className="hover:bg-[#008080] bg-[#00B2B2] text-white py-1 px-3 my-4 w-full">
                Signup
              </button>
            </form>
          </TabsContent>
          <TabsContent value="employer">
            <form>
              <div className="space-y-1">
                <input
                  type="text"
                  className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
                  placeholder="Email"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  className="w-full h-10 px-5 my-2  border placeholder:text-sm focus:outline-[#00B2B2]"
                  placeholder="Password"
                />
              </div>
              <button className="hover:bg-[#008080] bg-[#00B2B2] text-white py-1 px-3 my-4 w-full">
                Signup
              </button>
            </form>
          </TabsContent>
        </Tabs>
        <p className="text-xs w-full flex items-center justify-center py-2">
            Already have an account?
            <span className="pl-1 hover:underline cursor-pointer">
              <Link href="/login">Login</Link>
            </span>
          </p>
      </div>
    </div>
  );
}
