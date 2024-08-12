'use client';

import { useState } from "react";
import LearnTier from "../../components/LearnTier";
import UploadImage from "@/app/components/UploadImage";
import CustomDatePicker from "@/app/components/CustomDatePicker";
import { Contact, Project, Question } from "@/interfaces/project";
import Contacts from "@/app/components/Contacts";
import { useAccount } from "wagmi";

export default function NewProject() {
  const {address} = useAccount()
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [ownerAddress, setOwnerAddress] = useState<string>("")
  const [tokenAddress, setTokenAddress] = useState<string>("")
  const [startAt, setStartAt] = useState<Date>(new Date())
  const [endAt, setEndAt] = useState<Date>(new Date())
  const [avatar, setAvatar] = useState<File | null>(null);
  const [background, setbBackground] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: '',
      answers: [{ id: 1, text: '', isCorrect: false }],
    },
  ]);

  const [contactList, setContactList] = useState<Contact[]>([{
    optionId: 0,
    name: "discord",
    value: ""
  },{
    optionId: 1,
    name: "twitter",
    value: ""
  }]);

  const handleSubmit = async () => {
    if (!avatar || !background) return;

    const avatarFormData = new FormData();
    avatarFormData.append('file', avatar);

    const avaResponse = await fetch('/api/images', {
      method: 'POST',
      body: avatarFormData,
    });

    const avaParser = await avaResponse.json();
    const avatarId = avaParser.filename;

    const bgFormData = new FormData();
    bgFormData.append('file', background);

    const bgResponse = await fetch('/api/images', {
      method: 'POST',
      body: bgFormData,
    });

    const bgParser = await bgResponse.json();
    const bgId = bgParser.filename;

    const createNewProject = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        creator: address,
        avatarId,
        bgId,
        name,
        description,
        ownerAddress,
        tokenAddress,
        learnTier: questions,
        contacts: contactList,
        startAt,
        endAt
      } as Project),
    });

    const result = await createNewProject.json();
    console.log(result)
  };

  return (
    <div>
      <h2 className='text-3xl my-8'>Launch new Project</h2>
      <div className='flex flex-col gap-4'>
        <UploadImage title="Upload project avatar" setFile={setAvatar}/>
        <UploadImage title="Upload project background" setFile={setbBackground}/>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your project name?</span>
          </div>
          <input onChange={(e)=> setName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w" />
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">Describe your project?</span>
          </div>
          <textarea onChange={(e)=> setDescription(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Describe your project"></textarea>
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your owner wallet address?</span>
          </div>
          <input onChange={(e)=> setOwnerAddress(e.target.value)} type="text" placeholder="0x..." className="input input-bordered w-full max-w" />
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your tokens (erc20) address?</span>
          </div>
          <input onChange={(e)=> setTokenAddress(e.target.value)} type="text" placeholder="0x..." className="input input-bordered w-full max-w" />
        </label>
        <Contacts contactList={contactList} setContactList={setContactList}/>

        <div className="form-control w-full">
          <div className="label">
            <span className="label-text">Select when IDO start-end?</span>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <CustomDatePicker title="From" date={startAt} setDate={setStartAt}/>
            <CustomDatePicker title="To" date={endAt} setDate={setEndAt}/>
          </div>
        </div>

        <div>
          <div className="label">
            <span className="label-text">Learn Tier</span>
          </div>
          <LearnTier questions={questions} setQuestions={setQuestions}/>
        </div>

        <div className='my-4'>
          <button
              onClick={() => handleSubmit()}
              className='btn btn-primary w-40'
            >
              Submit
          </button>
        </div>
      </div>
    </div>
  );
}
