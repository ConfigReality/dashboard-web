import { ProjectCard } from "@/components/ProjectCard";
import { createClient } from "@/utils/supabase/server";

async function getProjects() {
  const supabase = createClient();
  const { data: projects, error } = await supabase
    .from("Project")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return projects;
}

export default async function Project() {
  const projects = await getProjects();
  return (
    <>
      <div className="flex flex-col h-full dark:bg-gray-800 dark:text-gray-100 shadow-md rounded-xl px-4 py-8">
        <div
          className={`grid grid-cols-1 gap-4
            md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2`}
        >
          <ProjectCard isNew />
          {projects &&
            projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
        </div>
      </div>
    </>
  );
}