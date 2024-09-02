import { ChangeEvent, useState } from 'react';
import CustomToastWithLink from './CustomToastWithLink';
import { toast } from 'react-toastify';
import {
	type BaseError,
	useAccount,
	useReadContracts,
	useWaitForTransactionReceipt,
	useWriteContract,
} from 'wagmi';
import LaunchPadAbi from '../../../contracts/out/LaunchpadToken.sol/LaunchpadERC20.json';
import Erc20Abi from '../../../contracts/out/ERC20.sol/ERC20.json';

interface DepositInterface {
	launchPadContract: string | undefined;
	tokenSymbol: string;
	decimals: number | undefined;
	tokenAddr: string | undefined;
}

export default function Deposit({
	launchPadContract,
	tokenSymbol,
	decimals,
	tokenAddr,
}: DepositInterface) {
	const [amount, setAmount] = useState(0);
	const { data: hash, error, isPending, writeContract } = useWriteContract();
	const { address } = useAccount();

	const { data: userDetail } = useReadContracts({
		contracts: [
			{
				address: launchPadContract as `0x${string}`,
				abi: LaunchPadAbi.abi as any,
				functionName: 'userDetails',
				args: [address || ''],
			},
		],
		query: {
			enabled: !!address,
		},
	});
	const handleOpenModal = () => {
		// eslint-disable-next-line
		// @ts-ignore
		document.getElementById('deposit').showModal();
	};

	async function handleSubmit() {
		// const amountArg = BigInt(amount) * BigInt(10 ** decimals!);
		writeContract(
			{
				address: launchPadContract as `0x${string}`,
				abi: LaunchPadAbi.abi,
				functionName: 'buyTokens',
				args: [amount],
			},
			{
				onSuccess(data: any) {
					toast.success(CustomToastWithLink(data));
				},
				onError(error: any) {
					console.log('error', error.message);
				},
			}
		);
	}

	async function approveErc20(e: any) {
		e.preventDefault();
		// const amountArg = BigInt(amount) * BigInt(10 ** decimals!);
		writeContract(
			{
				address: tokenAddr as `0x${string}`,
				abi: Erc20Abi.abi,
				functionName: 'approve',
				args: [launchPadContract, amount],
			},
			{
				onSuccess(data: any) {
					toast.success(CustomToastWithLink(data));
				},
				onError(error: any) {
					console.log('error', error.message);
				},
			}
		);
	}

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	return (
		<div>
			{/* <button className="btn w-60 btn-secondary" onClick={()=>handleOpenModal()}>Whitelist</button> */}
			<div
				className="tooltip"
				data-tip={
					!address
						? 'Please connect first!'
						: !(userDetail?.[0]?.result as Array<BigInt>)?.[0]
						? 'You are not whitelisted'
						: undefined
				}
			>
				<button
					className="btn btn-primary w-40"
					disabled={
						!address || !(userDetail?.[0]?.result as Array<BigInt>)?.[0]
					}
					onClick={() => handleOpenModal()}
				>
					Deposit
				</button>
			</div>
			<dialog id="deposit" className="modal">
				<div className="modal-box w-11/12 max-w-5xl flex flex-col gap-4">
					<h3 className="font-bold text-lg">Deposit</h3>

					<div className="flex gap-2">
						<input
							type="number"
							value={amount}
							onChange={(e) => setAmount(e.target.value as unknown as number)}
							placeholder={`Enter deposit amount in ${tokenSymbol}`}
							className="input input-bordered w-full max-w"
							required
						/>
					</div>
					<div className="mt-5">
						{hash && <div>Transaction Hash: {hash}</div>}
						{isConfirming && <div>Waiting for confirmation...</div>}
						{isConfirmed && <div>Transaction confirmed.</div>}
						{error && (
							<div>
								Error: {(error as BaseError).shortMessage || error.message}.
								{error.message.includes(
									'Make sure to add enough allowance'
								) && (
									<button className="btn btn-ghost" onClick={approveErc20}>
										Approve here!
									</button>
								)}
							</div>
						)}
					</div>
					<div className="modal-action">
						<button
							onClick={() => handleSubmit()}
							className="btn btn-accent w-32"
							disabled={!decimals || isPending}
						>
							Deposit
						</button>
						<form method="dialog">
							<button className="btn w-32 btn-neutral">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
