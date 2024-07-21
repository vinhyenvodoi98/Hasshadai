export default function OverviewTab() {
  return (
    <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
      <OverviewCard title='KYC'>
        <div className='flex flex-col justify-between text-white items-center gap-4'>
          <p className='font-bold text-lg'>Get Verified!</p>
          <p className='text-center text-base'>
            In order to participate in the gaming revolution, you need to be KYC
            verified. Learn more about KYC Verification here
          </p>
          <button className='btn btn-primary'>Process KYC</button>
        </div>
      </OverviewCard>

      <OverviewCard title='Tier'>
        <div className='flex flex-col justify-center text-white items-center h-44'>
          <p className='text-center text-base'>
            Once you start having activity, your tier level will be shown here.
          </p>
        </div>
      </OverviewCard>

      <OverviewCard title='Points'>
        <div className='flex flex-col justify-center text-white items-center h-44'>
          <p className='font-bold text-4xl'>0</p>
        </div>
      </OverviewCard>
    </div>
  );
}

export function OverviewCard({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <div className='rounded-lg bg-base-200'>
      <div className='px-4 pt-4 text-2xl font-bold'>{title}</div>
      <div className='divider'></div>
      <div className='px-4 pb-4'>{children}</div>
    </div>
  );
}
