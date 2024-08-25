import Link from "next/link";

export default function ReadDocument({link}:{link:string}) {
  return(
    <div className="flex flex-col justify-center items-center gap-8 h-full">
      <img src='/images/read-document.jpeg' className='w-28 h-28 rounded-3xl'/>
      <p>Read our document to know more about us</p>
      <Link
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='btn btn-primary btn-wide h-12 p-2'>
          Documents
        </div>
      </Link>
    </div>
  )
}