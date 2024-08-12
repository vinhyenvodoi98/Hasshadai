'use client';
import { Contact } from '@/interfaces/project';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ContactInterface {
  contactList: Contact[];
  setContactList: Dispatch<SetStateAction<Contact[]>>;
}

export default function Contacts({
  contactList,
  setContactList,
}: ContactInterface) {

  const addOption = () => {
    setContactList(contactList => [...contactList, {
      optionId: contactList.length,
      name: "website",
      value: ""
    }]);
  }

  const removeOption = (id: number) => {
    const z = contactList.filter((z) => z.optionId !== id);
    setContactList(z);
  }

  const addOptionValue = (optionId: number, value: string) => {
    const updatedOptions = contactList.map((option) =>
      option.optionId === optionId ? { ...option, value: value } : option
    );
    setContactList(updatedOptions);
  }

  return(
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">Contacts</span>
      </div>
      <div className="flex gap-3 flex-col">
        {contactList.map((media) => (
          <div key={media.optionId} className="flex gap-2">
            <input onChange={(e) => addOptionValue(media.optionId, e.target.value)} type="text" placeholder={media.name} className="flex-auto w-fit input input-bordered" />
            <button onClick={() => removeOption(media.optionId)} className="btn btn-outline btn-error w-12">x</button>
          </div>
        ))}
        <div onClick={() => addOption()} className="border border-neutral-content border-dashed w-full font-bold text-xl place-items-center px-4 py-2 h-12 rounded-md cursor-pointer"> + </div>
      </div>
    </label>
  )
}