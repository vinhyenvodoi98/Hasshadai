import { Dispatch, SetStateAction, useEffect, useState } from "react"
import CustomDatePicker from "./CustomDatePicker";
import TokenCheck from "./TokenCheck";
import { useSimulateContract, useWriteContract } from 'wagmi'
import FactoryAbi from '../../../contracts/out/Factory.sol/LaunchpadFactory.json'
import { toast } from "react-toastify";
import Link from "next/link";

interface CreateLaunchPadContractInterface {
  name: string,
  maxCap: number,
  setMaxCap: Dispatch<SetStateAction<number>>,
  startAt: Date,
  setStartAt: Dispatch<SetStateAction<Date>>,
  endAt: Date,
  setEndAt: Dispatch<SetStateAction<Date>>,
  noOfTier: number,
  setNoOfTier: Dispatch<SetStateAction<number>>,
  projectOwner: string,
  setProjectOwner: Dispatch<SetStateAction<string>>,
  tokenAddress: string,
  setTokenAddress: Dispatch<SetStateAction<string>>,
  launchPadContract: string
  setLaunchPadContract: Dispatch<SetStateAction<string>>,
}

export default function CreateLaunchPadContract({
    name,
    maxCap,
    setMaxCap,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    noOfTier,
    setNoOfTier,
    projectOwner,
    setProjectOwner,
    tokenAddress,
    setTokenAddress,
    launchPadContract,
    setLaunchPadContract,
  }: CreateLaunchPadContractInterface) {

  const { writeContract} = useWriteContract()
  const [loadLaunchpadAddress, setLoadLaunchpadAddress] = useState(false)

  const handleOpenModal = () => {
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('create_launchpad_contract').showModal()
  }

  const { data } = useSimulateContract({
    abi: FactoryAbi.abi,
    address: process.env.NEXT_PUBLIC_LAUNCHPAD_FACTORY as `0x${string}`,
    functionName: 'deployClone',
    args: [
      name,
      maxCap,
      new Date(startAt).getTime(),
      new Date(endAt).getTime(),
      noOfTier,
      projectOwner,
      tokenAddress,
      1
    ],
  })

  const CustomToastWithLink = (tx:string) => (
    <div>
      <p>Transaction has been created successfully:</p>
      <Link target="_blank" href={`https://opencampus-codex.blockscout.com/tx/${tx}`}>Details</Link>
    </div>
  );

  useEffect(() => {
    if(data?.result && loadLaunchpadAddress){
      setLaunchPadContract(data?.result)
      setLoadLaunchpadAddress(false)
    }
  }, [data, loadLaunchpadAddress])

  return (
    <div>
      <button className="btn w-60 btn-accent" onClick={()=>handleOpenModal()}>Deploy Launchpad Contract</button>
      <dialog id="create_launchpad_contract" className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col gap-4">
          <h3 className="font-bold text-lg">Deploy Launchpad Contract</h3>
          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text">Project name</span>
            </div>
            <input value={name} disabled type="text" className="input input-bordered w-full max-w" />
          </label>

          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text">What is your owner wallet address?</span>
            </div>
            <input value={projectOwner} onChange={(e)=> setProjectOwner(e.target.value)} type="text" placeholder="0x..." className="input input-bordered w-full max-w" />
          </label>

          <TokenCheck initialData={tokenAddress} setToken={setTokenAddress} />

          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text">Max cap</span>
            </div>
            <input value={maxCap} onChange={(e)=> setMaxCap(Number(e.target.value))} type="number" className="input input-bordered w-full max-w" />
          </label>

          <label className="form-control w-full max-w">
            <div className="label">
              <span className="label-text">Number of Tier</span>
            </div>
            <input value={noOfTier} onChange={(e)=> setNoOfTier(Number(e.target.value))} type="number" className="input input-bordered w-full max-w" />
          </label>

          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Select when IDO start-end?</span>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <CustomDatePicker title="From" date={new Date(startAt)} setDate={setStartAt}/>
              <CustomDatePicker title="To" date={new Date(endAt)} setDate={setEndAt}/>
            </div>
          </div>
          <div className="modal-action">
            <button disabled={!Boolean(data?.request) || launchPadContract.length > 0} onClick={() =>
                writeContract( data!.request,{
                onSuccess (data) {
                  toast.success(
                    CustomToastWithLink(data)
                  );
                  setLoadLaunchpadAddress(true)
                },
                onError(error) {
                  console.log("error",error)
                },
              })
              } className="btn btn-accent w-32">Deploy</button>
            <form method="dialog">
              <button className="btn w-32 btn-neutral">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}