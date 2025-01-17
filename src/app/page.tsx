'use client';

import ExplainCard from './components/ExplainCard';
import IDO from './ido/page';

export default function Home() {
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
      <IDO />
    </div>
  );
}
