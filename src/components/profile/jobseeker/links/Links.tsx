import { Link } from 'lucide-react';
import EditLink from './EditLink';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { useEffect, useState } from 'react';

export interface Link {
  key: string;
  value: string;
}
export default function Links() {
  const [links, setLinks] = useState<Link[]>([]);

  const profileDetails = useSelector(
    (state: RootState) => state.jobseekerReducer.jobseeker,
  );

  useEffect(() => {
    const linkData = [
      {
        key: 'Github',
        value: profileDetails?.githubLink ? profileDetails.githubLink : '',
      },
      {
        key: 'Twitter',
        value: profileDetails?.twitterLink ? profileDetails.twitterLink : '',
      },
      {
        key: 'Portfolio',
        value: profileDetails?.portfolioLink
          ? profileDetails.portfolioLink
          : '',
      },
      {
        key: 'Linkedin',
        value: profileDetails?.linkedinLink ? profileDetails.linkedinLink : '',
      },
    ];
    setLinks(linkData);
  }, [profileDetails]);
  return (
    <div className="min-h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between px-5 md:p-10">
        <p className="font-bold text-pink-500"> Links</p>
        <div>
          {links?.length !== 0 &&
            links?.map((link: { key: string; value: string }, i: number) => (
              <div key={i} className="flex flex-col items-start">
                <p className="flex items-start py-5">
                  <span className="pr-2">{link.key}</span>
                  <EditLink link={link} />
                </p>
                {link.value ? (
                  <p className="flex items-center text-wrap text-xs underline md:text-sm">
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
