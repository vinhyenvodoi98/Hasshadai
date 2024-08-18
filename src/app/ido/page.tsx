'use client';
import ProjectCard from '@/app/components/ProjectCard';
import { Project } from '@/interfaces/project';
import { useEffect, useState } from 'react';

export default function IDO() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects?status=upcomming`);
        const data = await response.json();
        setProjects(data.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className='text-3xl my-8'>Upcoming Projects</h2>
      <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
        {loading && <div className='w-full h-96 rounded-xl skeleton'/>}
        {projects && projects.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </div>
    </div>
  );
}
