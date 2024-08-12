'use client';

import { Project } from '@/interfaces/project';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import SimpleProjectCard from '../components/SimpleProjectCard';

export default function Profile() {
  const {address} = useAccount()
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/projects?creator=${address}`);
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
      <p className='text-2xl'>
        Your Projects
      </p>
      <div className='grid grid-cols-4 mt-8'>
        {projects && projects.map((project: any) => (
          <SimpleProjectCard project={project}/>
        ))}
      </div>
    </div>
  );
}
