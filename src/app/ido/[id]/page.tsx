'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';

const CountDown = dynamic(() => import('@/app/components/Countdown'), {
  ssr: false,
});

export default function IDODetails() {
  return (
    <div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
        <div className='flex flex-col justify-center gap-8'>
          <h1 className='text-4xl text-white'>Ordify (Public)</h1>
          <p className='text-justify'>
            Ordify is a Suite of products, carefully tailored to enhance your
            investment experience across diverse chains Ordify serves as the
            gateway between the Bitcoin world and the EVM world with its
            products set to improve the user’s experience, enhance portfolio
            with early access to projects launching on any bitcoin chain, or EVM
            chains, and easy float with its high security bridge from Bitcoin to
            EVM chains. Ordify achieves this by leveraging Off and on chain
            technology.
          </p>
          <div className='flex gap-4'>
            <Link
              href='https://google.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <div className='btn btn-primary w-12 h-12 p-2'>
                <Image
                  src='/media/website.svg'
                  height={24}
                  width={24}
                  alt='website'
                />
              </div>
            </Link>
            <div>
              <Link
                href='https://google.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='btn btn-primary w-12 h-12 p-2'>
                  <Image
                    src='/media/twitter.svg'
                    height={24}
                    width={24}
                    alt='twitter'
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link
                href='https://google.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='btn btn-primary w-12 h-12 p-2'>
                  <Image
                    src='/media/telegram.svg'
                    height={24}
                    width={24}
                    alt='telegram'
                  />
                </div>
              </Link>
            </div>
            <div>
              <Link
                href='https://google.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <div className='btn btn-primary w-12 h-12 p-2'>
                  <Image
                    src='/media/medium.svg'
                    height={24}
                    width={24}
                    alt='medium'
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='grid gap-8'>
          <div className='rounded-lg bg-base-200 p-8'>
            <div className='flex justify-between'>
              <div className='grid gap-2'>
                <p className='text-sm font-bold'>TOTAL RAISED</p>
                <div className='flex gap-2 items-center'>
                  <Image
                    style={{ borderRadius: '50%' }}
                    src='/tokens/usdt.png'
                    height={32}
                    width={32}
                    alt='raise token'
                  />
                  <h1 className='text-white'>1000000 USDT</h1>
                </div>
              </div>
              <div className='bg-base-100 w-40 h-12 rounded-lg flex justify-center items-center'>
                <p className='text-base font-bold'>0.11 USDT</p>
              </div>
            </div>
            <div className='divider'></div>
            <div className='grid gap-8'>
              <div className='flex justify-between text-white font-bold'>
                <div>100000 / 1000000 USDT</div>
                <div>Progress 10%</div>
              </div>
              <progress
                className='progress progress-primary w-full h-4 rounded-full'
                value='10'
                max='100'
              ></progress>
              <div className='flex justify-between font-bold'>
                <div>LIMITED</div>
                <div>PARTICIPANTS: 400</div>
              </div>
              <div className='text-white'>
                <p>Total Allocation: 0</p>
                <p>Remaining Allocation: 0</p>
              </div>
              <div className='flex justify-between'>
                <button className='btn btn-primary w-40'>Approve</button>
                <div>
                  <p>Starts in</p>
                  <CountDown endTimestamp={1711497199000} type='colons' />
                </div>
              </div>
            </div>
          </div>
          <div className='grid gap-4 rounded-lg bg-base-200 p-8'>
            <div className='font-bold'>
              <p className='text-sm'>REGISTRATION STARTS IN</p>
              <p className='text-xl text-white'>
                {format(new Date(1711397199000), 'dd.MM.yyy HH:MM')} UTC
              </p>
            </div>
            <CountDown endTimestamp={1711397199000} type='next' />
            <button className='btn w-full' disabled={true}>
              Coming Soon
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16'>
        <div>
          <h1 className='text-white my-4'>TOKEN INFOMATION</h1>
          <div className='bg-base-200 p-8 rounded-lg font-bold'>
            <div className='flex justify-between'>
              <p>TOKEN</p>
              <p className='text-white'>ORFY</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>TOKEN FOR SALE</p>
              <p className='text-white'>30000000</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>NETWORK</p>
              <p className='text-white'>SOLANA</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>TOKEN ADDRESS</p>
              <p className='text-white'>TBA</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>DECIMALS</p>
              <p className='text-white'>18</p>
            </div>
          </div>
        </div>
        <div>
          <h1 className='text-white my-4'>POOL INFOMATION</h1>
          <div className='bg-base-200 p-8 rounded-lg font-bold'>
            <div className='flex justify-between'>
              <p>TOKEN DISTRIBUTION</p>
              <p className='text-white'>--</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>MIN. ALLOCATION</p>
              <p className='text-white'>0 USDT</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>MAX. ALLOCATION</p>
              <p className='text-white'>0 USDT</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>MIN SWAP LEVEL</p>
              <p className='text-white'>--</p>
            </div>
            <div className='divider'></div>
            <div className='flex justify-between'>
              <p>ACCESS TYPE</p>
              <div className='badge badge-outline badge-success h-8 rounded-md border-2 font-bold bg-success/10'>
                Public
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
