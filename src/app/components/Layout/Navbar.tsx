'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import Wallet from '../Wallet';

export default function Navbar() {
  return (
    <header className='min-w-full inset-x-none top-none z-10 right-scroll-bar-position shadow-xl mb-10 text-white'>
      <div className='mx-auto navbar flex items-center max-w-full justify-between bg-base-100'>
        <div className=''>
          <Link href='/' className='btn btn-ghost text-xl'>
            Hasshadai
          </Link>
        </div>
        <div className='flex gap-4'>
          <Link href='/ido' className='btn btn-ghost text-xl'>
            IDO
          </Link>
          <Link href='/claims' className='btn btn-ghost text-xl'>
            Claims
          </Link>
        </div>
        <div className='flex-none gap-2'>
          <Link href='/projects/new' className='btn btn-primary text-xl'>
            Launch new Project
          </Link>
          <Wallet />
        </div>
      </div>
    </header>
  );
}
