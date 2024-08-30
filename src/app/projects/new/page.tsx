'use client';

import ProjectForm from "@/app/components/ProjectForm";
import { Project } from "@/interfaces/project";
import { toast } from "react-toastify";

export default function NewProject() {
  const handleSubmit = async (project: Project) => {
    try {
      const createNewProject = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project as Project),
      });

      const result = await createNewProject.json();
      toast.success("Create project successfully! ")
    } catch(error) {
      toast.error(error as string)
    }
  };

  return(
    <ProjectForm handleSubmit={handleSubmit} />
  )
}
