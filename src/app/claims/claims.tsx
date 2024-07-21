import Image from 'next/image';
import { useState } from 'react';

export default function ClaimsTab() {
  const networks = [
    {
      name: 'Edu',
      image: '/svg/eduLogo.svg',
    }
  ];

  const claimable = [
    {
      image: '/projects/projectmock.png',
      symbol: 'ORDY',
      amount: '1000000',
    },
  ];

  const [currentChain, setCurrentChain] = useState(0);

  return (
    <div className='grid gap-8'>
      <div className='flex gap-4 items-center'>
        <p>Network:</p>
        <div className='flex gap-4'>
          {networks.map((network, index) => (
            <div
              key={network.name}
              onClick={() => setCurrentChain(index)}
              className={`cursor-pointer rounded-full border-2 p-1 ${currentChain === index ? 'border-primary' : 'border-neutral-600'}`}
            >
              <Image
                src={network.image}
                height={28}
                width={28}
                alt={network.name}
                style={{
                  borderRadius: '50%',
                  filter:
                    currentChain === index ? 'grayscale(0%)' : 'grayscale(90%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='grid gap-4'>
        {claimable.map((claimableToken, index) => (
          <ClaimCard
            key={index}
            image={claimableToken.image}
            amount={claimableToken.amount}
            symbol={claimableToken.symbol}
          />
        ))}
      </div>
    </div>
  );
}

interface ClaimCardInterface {
  image: string;
  amount: string;
  symbol: string;
}

export function ClaimCard({ image, amount, symbol }: ClaimCardInterface) {
  return (
    <div className='flex justify-between items-center bg-base-200 rounded-lg p-4'>
      <div className='flex gap-4'>
        <Image
          src={image}
          height={64}
          width={64}
          alt='mock project'
          style={{ borderRadius: '50%' }}
        />
        <div className='font-bold'>
          <p className='text-base'>Tokens: </p>
          <p className='text-white text-4xl'>{`${amount} ${symbol}`}</p>
        </div>
      </div>
      <button className='btn btn-primary w-60'>Claims</button>
    </div>
  );
}
