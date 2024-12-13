'use client';
import { deleteProject } from '@/app/actions/jobseeker/actions';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Loader from '@/components/ui/loader';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
export default function DeleteDialog({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProjectDelete = async () => {
    try {
      setLoading(true);
      const response = await deleteProject(projectId);
      console.log(response);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
    }
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="mx-1 bg-pink-400 p-1 hover:bg-pink-500">
        <Trash className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="pt-3 text-neutral-400">
            This action cannot be undone. This will permanently delete your
            project and its details from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={handleProjectDelete}
            className="bg-red-500 px-3 py-2 hover:bg-red-600"
          >
            {loading ? <Loader /> : 'Confirm'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
