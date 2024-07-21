'use client';
import ProjectCard from '@/app/components/ProjectCard';
import { projectMockDatas } from '../mocks/data';

export default function IDO() {
  return (
    <div>
      <h2 className='text-3xl my-8'>Upcoming Projects</h2>
      <div className='grid lg:grid-cols-3 gap-8 md:grid-cols-2 grid-cols-1'>
        {projectMockDatas.map((mock, id) => (
          <ProjectCard key={id} project={mock} />
        ))}
      </div>
    </div>
  );
}
