import { Delete, Link, Pen, Trash } from 'lucide-react';
import AddProject from './AddProject';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import DeleteDialog from './DeleteDialog';
import EditProject from './EditProject';

export default function Projects({ projects }: any) {
  return (
    <div className="h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between p-10">
        <p className="font-bold text-pink-500">Projects</p>
        <div className="my-10 grid grid-cols-2 gap-6">
          {projects?.length !== 0 ? (
            projects?.map((project: any) => (
              <div
                key={project.title}
                className="border border-pink-400/20 p-4"
              >
                <div className="flex w-full items-center justify-between">
                  <p className="py-2 font-bold text-neutral-300">
                    {project.title}
                  </p>
                  <div className="flex items-center">
                    {/* <button className="mx-1 bg-pink-400 p-1 hover:bg-pink-500">
                      <Pen className="h-4 w-4" />
                    </button> */}
                    <EditProject project={project} />
                    <DeleteDialog projectId={project.id} />
                  </div>
                </div>
                <p className="py-1 text-sm">{project.description}</p>
                <p className="flex items-center py-2 text-sm">
                  <Link className="mr-1 h-4 w-4 text-gray-200" />{' '}
                  {project.githubURL}
                </p>
                <p className="flex items-center py-2 text-sm">
                  <Link className="mr-1 h-4 w-4 text-gray-200" />{' '}
                  {project.deployedLink}
                </p>
                <div className="grid grid-cols-3">
                  {project.skills.map((skill: any) => (
                    <p
                      className="my-2 mr-2 flex items-center justify-between text-nowrap bg-pink-400/20 px-2 py-1"
                      key={skill}
                    >
                      {skill}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="p-3">No projects added yet.</p>
          )}
          <AddProject />
        </div>
      </div>
    </div>
  );
}
