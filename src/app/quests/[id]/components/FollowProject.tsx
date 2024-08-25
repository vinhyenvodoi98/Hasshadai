import Image from "next/image";
import Link from "next/link";

export default function FollowProject({ link }: {link:string}) {
  return(
    <div className="flex flex-col justify-center items-center gap-8 h-full">
      <img src='/images/follow-project.jpeg' className='w-28 h-28 rounded-3xl'/>
      <p>Let&apos;s join our community</p>
      <Link
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        <div className='btn btn-primary btn-wide h-12 p-2'>
          Join with us
          <Image
            src='/media/telegram.svg'
            height={24}
            width={24}
            alt='telegram'
          />
        </div>
      </Link>
    </div>
  )
}