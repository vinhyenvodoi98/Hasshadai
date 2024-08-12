'use client';

import { useState } from "react";
import LearnTier from "../../components/LearnTier";
import UploadImage from "@/app/components/UploadImage";
import CustomDatePicker from "@/app/components/CustomDatePicker";

export default function NewProject() {
  const [mediaList, setMediaList] = useState([{
    optionId: 0,
    name: "discord",
    value: ""
  },{
    optionId: 1,
    name: "twitter",
    value: ""
  }]);

  const addOption = () => {
    setMediaList(mediaList => [...mediaList, {
      optionId: mediaList.length,
      name: "website",
      value: ""
    }]);
  }

  const removeOption = (id: number) => {
    const z = mediaList.filter((z) => z.optionId !== id);
    setMediaList(z);
  }

  const addOptionValue = (optionId: number, value: string) => {
    const updatedOptions = mediaList.map((option) =>
      option.optionId === optionId ? { ...option, value: value } : option
    );
    setMediaList(updatedOptions);
  }

  return (
    <div>
      <h2 className='text-3xl my-8'>Launch new Project</h2>
      <div className='flex flex-col gap-4'>
        <UploadImage title="Upload project avatar"/>
        <UploadImage title="Upload project background"/>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your project name?</span>
          </div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w" />
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your owner wallet address?</span>
          </div>
          <input type="text" placeholder="0x..." className="input input-bordered w-full max-w" />
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">Describe your project?</span>
          </div>
          <textarea className="textarea textarea-bordered h-24" placeholder="Describe your project"></textarea>
        </label>
        <label className="form-control w-full max-w">
          <div className="label">
            <span className="label-text">What is your tokens (erc20) address?</span>
          </div>
          <input type="text" placeholder="0x..." className="input input-bordered w-full max-w" />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Contacts</span>
          </div>
          <div className="flex gap-3 flex-col">
            {mediaList.map((media) => (
              <div key={media.optionId} className="flex gap-2">
                <input onChange={(e) => addOptionValue(media.optionId, e.target.value)} type="text" placeholder={media.name} className="flex-auto w-fit input input-bordered" />
                <button onClick={() => removeOption(media.optionId)} className="btn btn-outline btn-error w-12">x</button>
              </div>
            ))}
            <div onClick={() => addOption()} className="border border-neutral-content border-dashed w-full font-bold text-xl place-items-center px-4 py-2 h-12 rounded-md cursor-pointer"> + </div>
          </div>
        </label>

        <div className="form-control w-full">
          <div className="label">
            <span className="label-text">Select when IDO start-end?</span>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <CustomDatePicker title="From"/>
            <CustomDatePicker title="To"/>
          </div>
        </div>

        <div>
          <div className="label">
            <span className="label-text">Learn Tier</span>
          </div>
          <LearnTier />
        </div>


        <div className='my-4'>
          <button
              onClick={() => console.log('test')}
              className='btn btn-primary w-40'
            >
              Submit
          </button>
        </div>
      </div>
    </div>
  );
}
