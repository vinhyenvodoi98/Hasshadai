'use client'

import ReferenceLink from "@/app/components/ReferenceLink";
import { DecodedToken } from "@/interfaces/OIDC";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FollowProject from "./components/FollowProject";
import ReadDocument from "./components/ReadDocument";
import AnswerQuestions from "./components/AnswerQuestions";

export default function Quests() {
  const [quests, setQuest] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {id} = useParams<{ id: string}>()
  const { authState } = useOCAuth();
  const [ocidUsername, setOcidUsername] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    // Check if user is logged in with OCID
    if (authState.idToken) {
      const decodedToken = jwtDecode<DecodedToken>(authState.idToken);
      setOcidUsername(decodedToken.edu_username);
    }
  }, [authState.idToken]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/quests?id=${id}`);
        const data = await response.json();
        setQuest(data.quests);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if(id) fetchData();
  }, [id])

  return(
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col gap-8">
          { loading ?
            <div className='w-32 h-32 skeleton'/> :
            <Image
              src={`${process.env.NEXT_PUBLIC_CDN_HOST}/${quests.avatarId}`}
              height={96}
              width={96}
              alt='project image'
              className='rounded-lg pt-7'
            />
          }
          {
            loading ?
            <div className='w-40 h-9 skeleton'/> :
            <p className="text-3xl font-bold">{quests.name}</p>
          }
          <p className="text-xl">Finish all steps</p>
          <div className="flex flex-col gap-4">
            <button onClick={() => setPage(1)} className="w-full rounded-lg p-4 flex gap-4 bg-base-200 hover:bg-base-300 items-center">
              <kbd className="kbd">1</kbd>
              Follow Project
            </button>
            <button onClick={() => setPage(2)} className="w-full rounded-lg p-4 flex gap-4 bg-base-200 hover:bg-base-300 items-center">
              <kbd className="kbd">2</kbd>
              Read Document
            </button>
            <button onClick={() => setPage(3)} className="w-full rounded-lg p-4 flex gap-4 bg-base-200 hover:bg-base-300 items-center">
              <kbd className="kbd">3</kbd>
              Answer Questions
            </button>
          </div>
          <hr/>
          <div className="flex flex-col gap-4">
            <p className="text-xl">Refer friends and earn rewards</p>
            <ReferenceLink text={`${process.env.NEXT_PUBLIC_DOMAIN}/quests/${id}/ref?${ocidUsername}`}/>
          </div>
        </div>
        <div className="col-span-2 min-h-96 bg-base-200 rounded-xl">
          { loading ?
              <div className="skeleton w-full h-full"/>
            : <div className="p-7 h-full">
              {
                page === 1 ? <FollowProject link={"http://google.com"} />:
                page === 2 ? <ReadDocument link={"http://google.com"}/>:
                page === 3 ? <AnswerQuestions questions={quests.learnTier} />
                : <div>Not found</div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}
