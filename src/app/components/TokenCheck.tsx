import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useReadContracts } from "wagmi";
import ERC20Abi from '../../../contracts/out/ERC20.sol/ERC20.json';

interface TokenCheckface {
  initialData?: string
  setToken: Dispatch<SetStateAction<string>>
}

export default function TokenCheck({initialData, setToken}: TokenCheckface) {
  const [preview, setPreview] = useState<any>(null);

  const handleInput = (address: string) => {
    setToken(address)
  };

  const { data: token } = useReadContracts({
    contracts: [
      {
        address: initialData as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'name',
      },
      {
        address: initialData as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'symbol',
      },
      {
        address: initialData as `0x${string}`,
        abi: ERC20Abi.abi as any,
        functionName: 'decimals',
      },
    ],
  });

  return (
    <label className="form-control w-full max-w">
      <div className="label">
        <span className="label-text">What is ERC20 address participants will deposit?</span>
        {token && <span className="label-text-alt">{`Name: ${token[0].result} (${token[1].result})`}</span>}
      </div>
      <input value={initialData} onChange={(e)=> handleInput(e.target.value)} type="text" placeholder="0x..." className="input input-bordered w-full max-w" />
      <div className="label">
        <span className="label-text-alt"></span>
        {token && <span className="label-text-alt">{`Decimals: ${token[2].result}`}</span> }
      </div>
    </label>
  );
}
