import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardInterface {
  project: {
    _id: string;
    name: string;
    avatarId: string;
    bgId: string;
    description: string;
  };
}

export default function SimpleProjectCard({ project }: ProjectCardInterface) {
  return (
    <div className='card w-full bg-base-200 shadow-xl p-2 cursor-pointer'>
      <div className='relative w-full'>
        <img
          src={`${process.env.NEXT_PUBLIC_CDN_HOST}/${project.bgId}`}
          alt='project image'
          className='rounded-lg h-40 w-full object-fit'
        />
        <img
          src={`${process.env.NEXT_PUBLIC_CDN_HOST}/${project.avatarId}`}
          alt='project image'
          className='rounded-lg h-24 w-24 top-2 left-2 absolute'
        />
      </div>
      <div className='flex flex-col gap-4 p-2'>
        <h2 className='card-title text-3xl text-neutral-100'>
          {project.name}
        </h2>
        <p className='text-pretty text-sm h-20 overflow-y-scroll'>
          {project.description}
        </p>
      </div>
      <div className='my-4'>
        <Link href={`/projects/edit?id=${project._id}`}>
          <button
            className='btn btn-primary w-full'
          >
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}
