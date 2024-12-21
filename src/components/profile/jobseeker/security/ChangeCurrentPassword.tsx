'use client';
import { changeEmployerCurrentPassword } from '@/app/actions/employer/actions';
import { changeCurrentPassword } from '@/app/actions/jobseeker/actions';
import ErrorMessage from '@/components/ui/error-msg';
import Loader from '@/components/ui/loader';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { EMPLOYER, JOBSEEKER } from '@/lib/constants/app.constants';
import {
  ChangeCurrentPasswordSchema,
  ChangeCurrentPasswordSchemaType,
} from '@/lib/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ChangeCurrentPassword() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const role = session?.user.role;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeCurrentPasswordSchemaType>({
    resolver: zodResolver(ChangeCurrentPasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleChangePassword = async (
    data: ChangeCurrentPasswordSchemaType,
  ) => {
    try {
      setLoading(true);
      let response;
      if (role === JOBSEEKER) {
        response = await changeCurrentPassword(data);
      }

      if (role === EMPLOYER) {
        response = await changeEmployerCurrentPassword(data);
      }

      if (response?.success) {
        toast.success(response.message);
        reset();
      } else {
        toast.error(response?.error);
      }
    } catch (error) {
      console.error('error in changing password: ', error);
      toast.error('Some error occured');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="my-4 border border-pink-600 p-3 hover:border-transparent hover:bg-pink-600">
        Change current password
      </SheetTrigger>
      <SheetContent
        side={'right'}
        className="h-full overflow-y-scroll border-l-pink-400/40 bg-black py-10"
      >
        <SheetHeader>
          <SheetTitle className="text-white">
            Change current password
          </SheetTitle>
        </SheetHeader>
        <form
          onSubmit={handleSubmit((data) => handleChangePassword(data))}
          className="flex h-fit w-full flex-col overflow-y-scroll py-10"
        >
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Current password
            </label>
            <input
              type="password"
              {...register('currentPassword')}
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.currentPassword} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              New password
            </label>
            <input
              type="password"
              {...register('newPassword')}
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.newPassword} />
          </div>
          <div className="flex w-full flex-col">
            <label className="my-1 py-2 text-sm text-neutral-200">
              Confirm new password
            </label>
            <input
              type="password"
              {...register('confirmPassword')}
              className="border border-pink-400/60 bg-transparent px-3 py-2 text-sm text-white outline-none"
            />
            <ErrorMessage err={errors.confirmPassword} />
          </div>
          <button
            type="submit"
            className="my-10 flex items-center justify-center bg-white py-2 hover:bg-neutral-300"
          >
            {loading ? <Loader /> : 'Save'}
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
