import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { addCommas } from '../utils/format';
import { Project } from '@/interfaces/project';

interface ProjectCardInterface {
  project: Project;
}

const CountDown = dynamic(() => import('@/app/components/Countdown'), {
  ssr: false,
});

export default function ProjectCard({ project }: ProjectCardInterface) {
  return (
    <div className='card w-full bg-base-200 shadow-xl p-2 cursor-pointer'>
      <div className='g grid grid-cols-3 gap-4'>
        <Image
          src={`${process.env.NEXT_PUBLIC_CDN_HOST}/${project.avatarId}`}
          height={128}
          width={128}
          alt='project image'
        />
        <div className='col-span-2 flex flex-col justify-end h-full'>
          {project.startAt > new Date() ? (
            <div className='badge badge-outline badge-primary h-8 rounded-md border-2 font-bold bg-primary/10'>
              UPCOMING
            </div>
          ) : (
            <div className='badge badge-outline badge-success h-8 rounded-md border-2 font-bold bg-success/10'>
              LIVE
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-4 p-2'>
        <h2 className='card-title text-3xl text-neutral-100'>
          {project.name}
        </h2>
        <p className='text-pretty text-sm h-20 overflow-y-scroll'>
          {project.description}
        </p>
        <div className='flex justify-between py-5 px-2 bg-base-200 items-center'>
          <h3 className='text-sm text-neutral-100'>Targeted Raise</h3>
          <div className='flex gap-2'>
            <Image
              style={{ borderRadius: '50%' }}
              src={"/tokens/usdt.png"}
              height={32}
              width={32}
              alt='raise token'
            />
            <h2 className='ordinal text-2xl slashed-zero tabular-nums text-neutral-100'>
              {addCommas(300000)}
            </h2>
            <h2 className='text-2xl text-neutral-100'>
              USDT
            </h2>
          </div>
        </div>
        <div className='flex justify-between'>
          <div>
            <h3 className='text-sm'>TOKEN PRICE</h3>
            <h2 className='text-lg text-neutral-100'>0.11</h2>
          </div>
          <div>
            <h3 className='text-sm'>TYPE</h3>
            <h2 className='text-lg text-neutral-100'>Public</h2>
          </div>
        </div>
        <div>
          <h3 className='text-sm'>REGISTER PERIOD (FROM)</h3>
          <h2 className='text-lg text-neutral-100'>
            {format(new Date(project.startAt), 'dd.MM.yyy HH:MM')}{' '}
            UTC
          </h2>
        </div>
        <div>
          <h3 className='text-sm'>REGISTER PERIOD (T0)</h3>
          <h2 className='text-lg text-neutral-100'>
            {format(new Date(project.endAt), 'dd.MM.yyy HH:MM')}{' '}
            UTC
          </h2>
        </div>
      </div>
      <div className='my-4'>
        <Link href={`/ido/${project._id}`}>
          <button
            onClick={() => console.log('test')}
            className='btn btn-primary w-full'
          >
            Register
          </button>
        </Link>
      </div>
      <CountDown endTimestamp={new Date(project.endAt).getTime()} type='right' />
    </div>
  );
}
