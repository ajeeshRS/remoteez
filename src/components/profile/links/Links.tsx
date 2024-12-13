import { Link } from 'lucide-react';
import EditLink from './EditLink';
export default function Links({ links }: any) {
  return (
    <div className="min-h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between p-10">
        <p className="font-bold text-pink-500"> Links</p>
        <div>
          {links?.length !== 0 &&
            links?.map((link: any, i: number) => (
              <div key={i} className="flex flex-col items-start">
                <p className="flex items-start py-5">
                  <span className="pr-2">{link.key}</span>
                  <EditLink link={link} />
                </p>
                {link.value ? (
                  <p className="flex items-center text-sm underline">
                    <Link className="mr-1 h-3 w-3" /> {link.value}
                  </p>
                ) : (
                  <p className="flex items-center text-sm text-neutral-500">
                    ~not added yet.
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
