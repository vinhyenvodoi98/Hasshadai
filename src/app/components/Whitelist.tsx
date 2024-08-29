import { Answer, Question } from "@/interfaces/project";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"

interface WhitelistInterface {
  whitelist: string[],
  setWhitelist: Dispatch<SetStateAction<string[]>>
}

export default function Whitelist({whitelist, setWhitelist}: WhitelistInterface) {
  const [whitelistInput, setWhitelistInput] = useState("")
  const handleOpenModal = () => {
    // eslint-disable-next-line
    // @ts-ignore
    document.getElementById('white_list').showModal()
  }

  const handleAddWhitelist = () => {
    if (!whitelist.includes(whitelistInput)) {
      setWhitelist((prevItems) => [whitelistInput, ...prevItems]);
      setWhitelistInput(""); // Clear the input field after adding
    }
  };

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
            <form method="dialog">
              <button className="btn btn-accent w-32">Save</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}