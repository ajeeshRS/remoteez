import { Link } from 'lucide-react';

import AddProject from './AddProject';
import DeleteDialog from './DeleteDialog';
import EditProject from './EditProject';

export default function Projects({ projects }: any) {
  return (
    <div className="h-[90vh] w-full overflow-y-scroll p-5 px-5 text-white md:px-20">
      <div className="flex w-full flex-col items-start justify-between md:p-10 px-5">
        <p className="font-bold text-pink-500">Projects</p>
        <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects?.length !== 0 ? (
            projects?.map((project: any) => (
              <div
                key={project.title}
                className="border border-pink-400/20 p-4"
              >
                <div className="flex w-full items-center justify-between">
                  <p className="py-2 font-bold text-lg text-neutral-300">
                    {project.title}
                  </p>
                  <div className="flex items-center">
                    <EditProject project={project} />
                    <DeleteDialog projectId={project.id} />
                  </div>
                </div>
                <p className="py-1 text-sm">{project.description}</p>
                <p className="flex h-fit w-full items-center py-2 text-wrap md:text-sm text-[11px] hover:underline">
                  <Link className="mr-1 h-3 w-3 text-gray-200" />
                 {project.githubURL}
                </p>
                <p className="flex h-fit w-full items-center py-2 text-wrap md:text-sm text-[11px] hover:underlin">
                  <Link className="mr-1 h-3 w-3 text-gray-200" />
                 {project.deployedLink}
                </p>
                <div className="grid md:grid-cols-3 grid-cols-2">
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
