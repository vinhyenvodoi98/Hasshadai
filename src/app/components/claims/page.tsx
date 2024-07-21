'use client';

import { useState } from 'react';
import ClaimsTab from './claims';
import OverviewTab from './overview';

export default function Claims() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabs = ['Overview', 'Claims'];

  return (
    <div>
      <div role='tablist' className='tabs tabs-lifted tabs-lg flex'>
        {tabs.map((tab, index) => (
          <h1
            key={index}
            role='tab'
            className={`tab [--tab-border-color:white] ${
              currentTab === index && 'tab-active text-white'
            }`}
            onClick={() => setCurrentTab(index)}
          >
            {tab}
          </h1>
        ))}
        <div className='border-b w-full'></div>
      </div>
      <div className='py-8 w-full'>
        {currentTab === 0 ? <OverviewTab /> : <ClaimsTab />}
      </div>
    </div>
  );
}
