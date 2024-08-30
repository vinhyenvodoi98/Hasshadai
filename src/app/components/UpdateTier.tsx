import { Tier } from "@/interfaces/project"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import Whitelist from "./Whitelist"
import { toast } from "react-toastify"
import CustomToastWithLink from "./CustomToastWithLink"
import { useWriteContract } from "wagmi"
import LaunchPadAbi from '../../../contracts/out/LaunchpadToken.sol/LaunchpadERC20.json'

interface UpdateTierInterface {
  launchPadContract: string,
  tiers: Tier[],
  setTiers: Dispatch<SetStateAction<Tier[]>>
}

export default function  UpdateTier({launchPadContract, setTiers, tiers}: UpdateTierInterface) {
  const { writeContract} = useWriteContract()
  const handleOpenModal = () => {
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('update_tier').showModal()
  }

  const addNewTier = (tier: number) => {
    const newTier = [...tiers];
    newTier.push({
      tier,
      maxTierCap: 0,
      maxUserCap: 0,
      minUserCap: 0,
      tierUsers: 0,
      whiteList: []
    });
    setTiers(newTier);
  };

  const addToWhitelist = (index: number, newEntry: string) => {
    setTiers(prevTiers =>
      prevTiers.map((tier, i) =>
        i === index
          ? { ...tier, whiteList: [...tier.whiteList, newEntry] }
          : tier
      )
    );
  };

  const handleInputChange = (
    index: number,
    field: keyof Tier,
    value: number
  ) => {
    setTiers(prevTiers =>
      prevTiers.map((tier, i) =>
        i === index
          ? { ...tier, [field]: value }
          : tier
      )
    );
  };

  const handleSubmit = () => {
    const maxTierCaps: number[] = tiers.map(item => item.maxTierCap);
    const maxUserCaps: number[] = tiers.map(item => item.maxUserCap);
    const minUserCaps: number[] = tiers.map(item => item.minUserCap);
    const tierlist: number[] = tiers.map(item => item.tier + 1);
    const tierUsers: number[] = tiers.map(item => item.tierUsers);

    writeContract({
      abi: LaunchPadAbi.abi,
      address: launchPadContract as `0x${string}`,
      functionName: 'updateTiers',
      args: [
        tierlist,
        maxTierCaps,
        minUserCaps,
        maxUserCaps,
        tierUsers
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
      <button className="btn w-60 btn-secondary" onClick={()=>handleOpenModal()}>Update tier</button>
      <dialog id="update_tier" className="modal">
        <div className="modal-box w-11/12 max-w-5xl flex flex-col gap-4">
          <h3 className="font-bold text-lg">Update tier</h3>
          { tiers.map((tier, index) => (
            <div key={index} className="flex flex-col gap-2 border-primary p-4 border rounded-lg">
              <div className="w-full">
                <div className="label">
                  <span className="label-text">Tier Number</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w"
                  value={tier.tier + 1}
                  disabled
                />
              </div>
              <div className="w-full">
                <div className="label">
                  <span className="label-text">max Tier Cap</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w"
                  value={tier.maxTierCap}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, 'maxTierCap', Number(e.target.value))
                  }
                />
              </div>
              <div className="w-full">
                <div className="label">
                  <span className="label-text">Min User Cap</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w"
                  value={tier.minUserCap}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, 'minUserCap', Number(e.target.value))
                  }
                />
              </div>
              <div className="w-full">
                <div className="label">
                  <span className="label-text">Max User Cap</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w"
                  value={tier.maxUserCap}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, 'maxUserCap', Number(e.target.value))
                  }
                />
              </div>
              <div className="w-full">
                <div className="label">
                  <span className="label-text">Total of users</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w"
                  value={tier.tierUsers}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(index, 'tierUsers', Number(e.target.value))
                  }
                />
              </div>
              <div className="w-full">
                <div className="label">
                  <span className="label-text">Whitelist</span>
                </div>
                <Whitelist launchPadContract={launchPadContract} tierIndex={index} setWhitelist={addToWhitelist} whitelist={tier.whiteList} />
              </div>
            </div>
          )) }
          <div>
            <button className="btn btn-secondary btn-sm" onClick={() => addNewTier(tiers.length)}>Add New Tier</button>
          </div>
          <div className="modal-action">
            <button onClick={()=> handleSubmit()} className="btn btn-accent w-32">Submit</button>
            <form method="dialog">
              <button className="btn w-32 btn-neutral">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}