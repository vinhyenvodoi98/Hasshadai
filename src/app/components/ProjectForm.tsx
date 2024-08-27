import { Contact, LearnTier, Project, Question } from "@/interfaces/project";
import Contacts from "./Contacts";
import UploadImage from "./UploadImage";
import { useAccount } from "wagmi";
import { useState } from "react";
import LearnTierComponent from "./LearnTierComponent";
import CreateLaunchPadContract from "./CreateLaunchpadContract";

interface ProjectFormInterface {
  initialData?: {
    avatarId: string
    bgId: string
    name: string
    description: string
    ownerAddress: string
    tokenAddress: string
    learnTier: LearnTier
    contacts: Contact[]
    startAt: Date
    endAt: Date
    numberOfTier: number
    maxCap: number
    launchPadContract: string
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
  const [document, setDocument] = useState(initialData?.learnTier.document || "")
  const [maxCap, setMaxCap] = useState(initialData?.maxCap || 0)
  const [numberOfTier, setNumberOfTier] = useState(initialData?.numberOfTier || 0)
  const [launchPadContract, setLaunchPadContract] = useState<string>(initialData?.launchPadContract || "")
  const [questions, setQuestions] = useState<Question[]>(initialData?.learnTier.questions ||[
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
      learnTier: {
        document,
        questions
      },
      contacts: contactList,
      startAt,
      endAt,
      maxCap,
      numberOfTier,
      launchPadContract,
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

        <Contacts contactList={contactList} setContactList={setContactList}/>

        <div>
          <div className="label">
            <span className="label-text">Learn Tier</span>
          </div>
          <LearnTierComponent documentLink={document} setDocument={setDocument} questions={questions} setQuestions={setQuestions}/>
        </div>

        <div>
          <div className="label">
            <span className="label-text">Create LaunchPad</span>
          </div>
          <CreateLaunchPadContract
            name={name}
            maxCap={maxCap}
            setMaxCap={setMaxCap}
            startAt={startAt}
            setStartAt={setStartAt}
            endAt={endAt}
            setEndAt={setEndAt}
            noOfTier={numberOfTier}
            setNoOfTier={setNumberOfTier}
            projectOwner={ownerAddress}
            setProjectOwner={setOwnerAddress}
            tokenAddress={tokenAddress}
            setTokenAddress={setTokenAddress}
            launchPadContract={launchPadContract}
            setLaunchPadContract={setLaunchPadContract}
            />
        </div>

        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">LaunchPad contract address</span>
          </div>
          <input value={launchPadContract.length > 0 ? launchPadContract : "You can see address after deploy"} type="text" disabled className="input input-bordered w-full max-w" />
        </label>

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