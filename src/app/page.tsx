'use client';

import { useEffect, useState } from 'react';
import ExplainCard from './components/ExplainCard';
import ProjectCard from './components/ProjectCard';
import { projectMockDatas } from './mocks/data';
import { Project } from '@/interfaces/project';

export default function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const explainData = [
    {
      title: 'What is Hasshadai',
      description:
        "Before getting started, let's dig into Hasshadai and what it stands for",
    },
    {
      title: 'Tier System',
      description: 'Get to know more about the IDO allocation system here',
    },
    {
      title: 'How to get started?',
      description:
        'Time for action! This guide enlights you on your blockchain gaming path',
    },
  ];

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
    <div className='gap-24 grid'>
      <div className='grid lg:grid-cols-2 grid-cols-1 place-items-center '>
        <div className='grid gap-4'>
          <h1 className='text-4xl'>
            Join Best launchpad on Educhain with Hasshadai
          </h1>
          <p className='text-lg'>
            Decide your tier, stake and participate in all the token launches we
            bring to you in a guaranteed way.
          </p>
        </div>
        <div>
          <div className='w-96 h-96'>
            <img src='/images/landingpage-1.jpeg' className='rounded-3xl'/>
          </div>
        </div>
      </div>
      <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
        {explainData.map((mock, id) => (
          <ExplainCard
            key={id}
            title={mock.title}
            description={mock.description}
          />
        ))}
      </div>
      <h2 className='text-3xl'>Upcoming Projects</h2>
      <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
        {loading && <div className='w-full h-96 rounded-xl skeleton'/>}
        {projects && projects.map((project, id) => (
          <ProjectCard key={id} project={project} />
        ))}
      </div>
    </div>
  );
}
