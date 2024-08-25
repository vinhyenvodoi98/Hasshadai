'use client';

import ProjectForm from "@/app/components/ProjectForm";
import { Project } from "@/interfaces/project";

export default function NewProject() {
  const handleSubmit = async (project: Project) => {
    const createNewProject = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project as Project),
    });

    const result = await createNewProject.json();
  };

  return(
    <ProjectForm handleSubmit={handleSubmit} />
  )
}
