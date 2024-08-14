'use client'

import ProjectForm from "@/app/components/ProjectForm";
import { Project } from "@/interfaces/project";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProject() {
  const searchParams = useSearchParams()
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const id = searchParams.get('id')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects?id=${id}`);
        const data = await response.json();
        setProject(data.project);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if(id) fetchData();
  }, [id])

  const handleSubmit = async (project: Project) => {
    const createNewProject = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project as Project),
    });

    const result = await createNewProject.json();
    console.log(result)
  };

  return(
    <div className="w-full">
      {
        loading ?
        <div className="w-full h-96 skeleton"/> :
        <ProjectForm initialData={project} handleSubmit={handleSubmit} />
      }
    </div>
  )
}