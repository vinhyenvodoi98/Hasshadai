import { ChangeEvent, useState } from "react"
import CustomToastWithLink from "./CustomToastWithLink"
import { toast } from "react-toastify"
import { useWriteContract } from 'wagmi'
import LaunchPadAbi from '../../../contracts/out/LaunchpadToken.sol/LaunchpadERC20.json'

interface WhitelistInterface {
  launchPadContract: string
  tierIndex: number,
  whitelist: string[],
  setWhitelist: (tierIndex: number, whitelistInput:string) => void
}

export default function Whitelist({launchPadContract, tierIndex, whitelist, setWhitelist}: WhitelistInterface) {
  const [whitelistInput, setWhitelistInput] = useState("")
  const { writeContract} = useWriteContract()
  const handleOpenModal = () => {
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('white_list').showModal()
  }

  const handleAddWhitelist = () => {
    if (!whitelist.includes(whitelistInput)) {
      setWhitelist(tierIndex, whitelistInput);
      setWhitelistInput(""); // Clear the input field after adding
    }
  };


  const handleSubmit = async () => {
    const tier = Array(whitelist.length).fill(tierIndex+1)
    writeContract({
      abi: LaunchPadAbi.abi,
      address: launchPadContract as `0x${string}`,
      functionName: 'updateUsers',
      args: [
        whitelist,
        tier
      ],
    },{
      onSuccess (data:any) {
        toast.success(
          CustomToastWithLink(data)
        );
      },
      onError(error:any) {
        console.log("error",error)
      },
    })
  }

  return (
    <div>
      <button className="btn w-60 btn-secondary" onClick={()=>handleOpenModal()}>Whitelist</button>
      <dialog id="white_list" className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col gap-4">
          <h3 className="font-bold text-lg">Whitelist</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Whitelist Address: 0x"
              className="input input-bordered w-full max-w"
              value={whitelistInput}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWhitelistInput(e.target.value)
              }
            />
            <button onClick={() => handleAddWhitelist()} className="btn btn-outline btn-success w-12">+</button>
          </div>
          {
            whitelist.map(address => (
              <div key={address} className="border-primary/40 p-4 rounded-md border">
                {address}
              </div>
            ))
          }

          <div className="modal-action">
            <button onClick={() => handleSubmit()} className="btn btn-accent w-32">Save</button>
            <form method="dialog">
              <button className="btn w-32 btn-neutral">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}