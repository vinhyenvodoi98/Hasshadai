interface ExplainCardInterface {
  title: string;
  description: string;
}

export default function ExplainCard({
  title,
  description,
}: ExplainCardInterface) {
  return (
    <div className='card w-full bg-base-200 shadow-xl'>
      <div className='rounded-lg flex flex-col justify-between h-full'>
        <h2 className='card-title m-6'>{title}</h2>
        <p className='m-6 h-20'>{description}</p>
        <div className=''>
          <button className='btn btn-primary rounded-t-none rounded-b-lg w-full'>
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
}
