import {
  addBookmark,
  getJobseekerInfo,
  removeBookmark,
} from '@/app/actions/jobseeker/actions';
import { JOBSEEKER } from '@/lib/constants/app.constants';
import { setJobseekerProfile } from '@/state/profile/jobseekerSlice';
import { AppDispatch, RootState } from '@/state/store';
import { Bookmark } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { RxBookmark, RxBookmarkFilled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function BookmarkButton({ id }: { id: string }) {
  const [bookmarks, setBookmark] = useState<Bookmark[]>([]);
  const { data: session } = useSession();

  const dispatch = useDispatch<AppDispatch>();
  const userBookmarks = useSelector(
    (state: RootState) => state.jobseekerReducer.jobseeker?.Bookmark,
  );

  const getFiltered = (id: string) => {
    return bookmarks.filter((b) => b.jobId === id);
  };

  const refetchProfile = async () => {
    const { jobSeekerProfile } = await getJobseekerInfo();
    if (jobSeekerProfile) {
      dispatch(setJobseekerProfile(jobSeekerProfile));
    }
  };

  const showToast = (response: {
    success: boolean;
    error?: string;
    message?: string;
  }) => {
    if (response.success) {
      toast.success(response.message);
      refetchProfile();
    } else {
      toast.error(response.error);
    }
  };

  const toggleBookmark = async (id: string) => {
    try {
      const filtedItem = getFiltered(id);
      // removing
      if (filtedItem.length > 0) {
        const bmId = filtedItem[0];
        const response = await removeBookmark(bmId.id);
        showToast(response);
        return;
      }

      // adding
      const response = await addBookmark(id);
      showToast(response);
    } catch (error) {
      console.error('error toggling bookmark : ', error);
      toast.error('error updating bookmark');
    }
  };

  useEffect(() => {
    if (userBookmarks) {
      setBookmark(userBookmarks);
    }
  }, [userBookmarks]);

  useEffect(() => {
    refetchProfile();
  }, []);
  return (
    <button
      onClick={() => toggleBookmark(id)}
      className={`cursor-pointer ${session?.user.role === JOBSEEKER ? 'block' : 'hidden'} `}
    >
      {getFiltered(id).length > 0 ? (
        <RxBookmarkFilled className="bg-pink- h-6 w-6 text-pink-600" />
      ) : (
        <RxBookmark className="text-pink bg-pink- h-6 w-6" />
      )}
    </button>
  );
}
