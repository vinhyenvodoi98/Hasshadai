import { Contact, Project, Question } from "@/interfaces/project";
import Contacts from "./Contacts";
import CustomDatePicker from "./CustomDatePicker";
import UploadImage from "./UploadImage";
import LearnTier from "./LearnTier";
import { useAccount } from "wagmi";
import { useState } from "react";
import TokenCheck from "./TokenCheck";

interface ProjectFormInterface {
  initialData?: {
    avatarId: string
    bgId: string
    name: string
    description: string
    ownerAddress: string
    tokenAddress: string
    learnTier: Question[],
    contacts: Contact[],
    startAt: Date,
    endAt: Date
  } | null;
  handleSubmit: (project: Project) => void;
}

export default function ProjectForm({ initialData, handleSubmit }: ProjectFormInterface) {
  const {address} = useAccount()
  const [name, setName] = useState<string>(initialData?.name || "")
  const [description, setDescription] = useState<string>(initialData?.description || "")
  const [ownerAddress, setOwnerAddress] = useState<string>(initialData?.ownerAddress || "")
  const [tokenAddress, setTokenAddress] = useState<string>(initialData?.tokenAddress || "")
  const [startAt, setStartAt] = useState<Date>(initialData?.startAt ||new Date())
  const [endAt, setEndAt] = useState<Date>(initialData?.endAt || new Date())
  const [avatar, setAvatar] = useState<File | null>(null);
  const [background, setbBackground] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Question[]>(initialData?.learnTier ||[
    {
      question: '',
      answers: [{ id: 1, text: '', isCorrect: false }],
    },
  ]);

  const [contactList, setContactList] = useState<Contact[]>(initialData?.contacts || [{
    optionId: 0,
    name: "discord",
    value: ""
  },{
    optionId: 1,
    name: "twitter",
    value: ""
  }]);

  const onSubmit = async () => {
    var avatarId, bgId
    if (!(!avatar || !background )) {
      const avatarFormData = new FormData();
      avatarFormData.append('file', avatar);

      const avaResponse = await fetch('/api/images', {
        method: 'POST',
        body: avatarFormData,
      });

      const avaParser = await avaResponse.json();
      avatarId = avaParser.filename;

      const bgFormData = new FormData();
      bgFormData.append('file', background);

      const bgResponse = await fetch('/api/images', {
        method: 'POST',
        body: bgFormData,
      });

      const bgParser = await bgResponse.json();
      bgId = bgParser.filename;
    }

    handleSubmit({
      creator: address,
      avatarId: avatarId || initialData?.avatarId,
      bgId: bgId || initialData?.bgId,
      name,
      description,
      ownerAddress,
      tokenAddress,
      learnTier: questions,
      contacts: contactList,
      startAt,
      endAt
    } as Project)
  }

  return (
    <div>
      <h2 className='text-3xl my-8'>Launch new Project</h2>
      <div className='flex flex-col gap-4'>
        <UploadImage initialData={initialData?.avatarId} title="Upload project avatar" setFile={setAvatar}/>
        <UploadImage initialData={initialData?.bgId} title="Upload project background" setFile={setbBackground}/>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your project name?</span>
          </div>
          <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full max-w" />
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">Describe your project?</span>
          </div>
          <textarea value={description} onChange={(e)=> setDescription(e.target.value)} className="textarea textarea-bordered h-24" placeholder="Describe your project"></textarea>
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your owner wallet address?</span>
          </div>
          <input value={ownerAddress} onChange={(e)=> setOwnerAddress(e.target.value)} type="text" placeholder="0x..." className="input input-bordered w-full max-w" />
        </label>
        <TokenCheck initialData={tokenAddress} setToken={setTokenAddress} />
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
              onClick={() => onSubmit()}
              className='btn btn-primary w-40'
            >
              Submit
          </button>
        </div>
      </div>
    </div>
  );
}