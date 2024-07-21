import Image from 'next/image';
import { format } from 'date-fns';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { addCommas } from '../utils/format';

interface ProjectCardInterface {
  project: {
    id: string;
    name: string;
    image: string;
    type: string;
    status: string;
    descriptions: string;
    targetRaise: number;
    raiseUnit: {
      name: string;
      image: string;
    };
    tokenPrice: string;
    registerPeriodFrom: number;
    registerPeriodTo: number;
  };
}

const CountDown = dynamic(() => import('@/app/components/Countdown'), {
  ssr: false,
});

export default function ProjectCard({ project }: ProjectCardInterface) {
  return (
    <div className='card w-full bg-base-200 shadow-xl p-2 cursor-pointer'>
      <Link href={`/ido/${project.id}`}>
        <div className='g grid grid-cols-3 gap-4'>
          <Image
            src={project.image}
            height={128}
            width={128}
            alt='project image'
          />
          <div className='col-span-2 flex flex-col justify-end h-full'>
            {project.status === 'UPCOMING' ? (
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
            {project.descriptions}
          </p>
          <div className='flex justify-between py-5 px-2 bg-base-200 items-center'>
            <h3 className='text-sm text-neutral-100'>Targeted Raise</h3>
            <div className='flex gap-2'>
              <Image
                style={{ borderRadius: '50%' }}
                src={project.raiseUnit.image}
                height={32}
                width={32}
                alt='raise token'
              />
              <h2 className='ordinal text-2xl slashed-zero tabular-nums text-neutral-100'>
                {addCommas(project.targetRaise)}
              </h2>
              <h2 className='text-2xl text-neutral-100'>
                {project.raiseUnit.name}
              </h2>
            </div>
          </div>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-sm'>TOKEN PRICE</h3>
              <h2 className='text-lg text-neutral-100'>{project.tokenPrice}</h2>
            </div>
            <div>
              <h3 className='text-sm'>TYPE</h3>
              <h2 className='text-lg text-neutral-100'>{project.type}</h2>
            </div>
          </div>
          <div>
            <h3 className='text-sm'>REGISTER PERIOD (FROM)</h3>
            <h2 className='text-lg text-neutral-100'>
              {format(new Date(project.registerPeriodFrom), 'dd.MM.yyy HH:MM')}{' '}
              UTC
            </h2>
          </div>
          <div>
            <h3 className='text-sm'>REGISTER PERIOD (T0)</h3>
            <h2 className='text-lg text-neutral-100'>
              {format(new Date(project.registerPeriodTo), 'dd.MM.yyy HH:MM')}{' '}
              UTC
            </h2>
          </div>
        </div>
      </Link>
      <div className='my-4'>
        <button
          onClick={() => console.log('test')}
          className='btn btn-primary w-full'
        >
          Register
        </button>
      </div>
      <CountDown endTimestamp={project.registerPeriodTo} type='right' />
    </div>
  );
}
