"use client"
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface ReferenceLinkProps {
  text: string;
}

const ReferenceLink: React.FC<ReferenceLinkProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // Reset copied state after 1.5 seconds
  };

  return (
    <div className=' grid grid-cols-8 gap-2'>
      <div className='px-2 bg-base-300 col-span-7 text-nowrap flex items-center rounded-lg'>
        <p className='overflow-hidden'>{text}</p>
      </div>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <button className='btn btn-primary'>{copied ? 'Copied!' : 'Copy'}</button>
      </CopyToClipboard>
    </div>
  );
};

export default ReferenceLink;