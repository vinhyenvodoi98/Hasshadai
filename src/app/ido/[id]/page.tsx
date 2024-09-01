'use client';

import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Project } from '@/interfaces/project';
import { shortenAddress } from '@/app/utils/addresses';
import { useAccount, useReadContracts } from 'wagmi';
import ERC20Abi from '../../../../contracts/out/ERC20.sol/ERC20.json';
import LaunchPadAbi from '../../../../contracts/out/LaunchpadToken.sol/LaunchpadERC20.json';
import Deposit from '@/app/components/Deposit';

const CountDown = dynamic(() => import('@/app/components/Countdown'), {
	ssr: false,
});

export default function IDODetails() {
	const { id } = useParams<{ id: string }>();
	const { address } = useAccount();

	const [project, setProject] = useState<Project | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/projects?id=${id}`);
				const data = await response.json();
				setProject(data.project);
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		if (id) fetchData();
	}, [id]);

	const { data: token } = useReadContracts({
		contracts: [
			{
				address: project?.tokenAddress as `0x${string}`,
				abi: ERC20Abi.abi as any,
				functionName: 'name',
			},
			{
				address: project?.tokenAddress as `0x${string}`,
				abi: ERC20Abi.abi as any,
				functionName: 'symbol',
			},
			{
				address: project?.tokenAddress as `0x${string}`,
				abi: ERC20Abi.abi as any,
				functionName: 'decimals',
			},
		],
	});

	return (
		<div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
				<div className="flex flex-col gap-8">
					<div>
						{project ? (
							<div className="relative">
								<img
									src={`${process.env.NEXT_PUBLIC_CDN_HOST}/${project?.bgId}`}
									alt="project image"
									className="rounded-lg w-full h-56"
								/>
								<Image
									src={`${process.env.NEXT_PUBLIC_CDN_HOST}/${project?.avatarId}`}
									height={128}
									width={128}
									alt="project image"
									className="rounded-lg absolute left-4 top-4"
								/>
							</div>
						) : (
							<div className="w-32 h-32 skeleton" />
						)}
					</div>
					<h1
						className={`text-4xl text-white ${loading && 'skeleton w-36 h-10'}`}
					>
						{project?.name}
					</h1>
					<p className={`text-justify h-64 ${loading && 'skeleton'}`}>
						{project?.description}
					</p>
					<div className="flex gap-4">
						<Link
							href="https://google.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="btn btn-primary w-12 h-12 p-2">
								<Image
									src="/media/website.svg"
									height={24}
									width={24}
									alt="website"
								/>
							</div>
						</Link>
						<div>
							<Link
								href="https://google.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="btn btn-primary w-12 h-12 p-2">
									<Image
										src="/media/twitter.svg"
										height={24}
										width={24}
										alt="twitter"
									/>
								</div>
							</Link>
						</div>
						<div>
							<Link
								href="https://google.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="btn btn-primary w-12 h-12 p-2">
									<Image
										src="/media/telegram.svg"
										height={24}
										width={24}
										alt="telegram"
									/>
								</div>
							</Link>
						</div>
						<div>
							<Link
								href="https://google.com"
								target="_blank"
								rel="noopener noreferrer"
							>
								<div className="btn btn-primary w-12 h-12 p-2">
									<Image
										src="/media/medium.svg"
										height={24}
										width={24}
										alt="medium"
									/>
								</div>
							</Link>
						</div>
					</div>
				</div>
				<div className="grid gap-8">
					<div className="rounded-lg bg-base-200 p-8">
						<div className="flex justify-between">
							<div className="grid gap-2">
								<p className="text-sm font-bold">TOTAL RAISED</p>
								<div className="flex gap-2 items-center">
									<Image
										style={{ borderRadius: '50%' }}
										src="/tokens/usdt.png"
										height={32}
										width={32}
										alt="raise token"
									/>
									<h1 className="text-white">{project?.maxCap} USDT</h1>
								</div>
							</div>
							<div className="bg-base-100 w-40 h-12 rounded-lg flex justify-center items-center">
								<p className="text-base font-bold">0.11 USDT</p>
							</div>
						</div>
						<div className="divider"></div>
						<div className="grid gap-8">
							<div className="flex justify-between text-white font-bold">
								<div>0 / {project?.maxCap} USDT</div>
								<div>Progress 0%</div>
							</div>
							<progress
								className="progress progress-primary w-full h-4 rounded-full"
								value="0"
								max="100"
							></progress>
							<div className="flex justify-between font-bold">
								<div>LIMITED</div>
								<div>PARTICIPANTS: 400</div>
							</div>
							<div className="text-white">
								<p>Total Allocation: 0</p>
								<p>Remaining Allocation: 0</p>
							</div>
							<div className="flex justify-between">
								<Link href={`/quests/${id}`}>
									<button className="btn btn-primary w-40">
										Join Learn Tier
									</button>
								</Link>
								<Deposit
									launchPadContract={project?.launchPadContract}
									decimals={token?.[2].result as number}
									tokenSymbol={token?.[1].result as string}
                  tokenAddr={project?.tokenAddress}
								/>
								{loading ? (
									<div className="w-20 h-8 skeleton"></div>
								) : new Date(project?.startAt as any).getTime() <
								  new Date().getTime() ? (
									<div>
										<p>End in</p>
										<CountDown
											endTimestamp={new Date(project?.endAt as any).getTime()}
											type="colons"
										/>
									</div>
								) : (
									<div>
										<p>Starts in</p>
										<CountDown
											endTimestamp={new Date(project?.startAt as any).getTime()}
											type="colons"
										/>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className="grid gap-4 rounded-lg bg-base-200 p-8">
						{loading ? (
							<div className="w-20 h-8 skeleton"></div>
						) : new Date(project?.startAt as any).getTime() <
						  new Date().getTime() ? (
							<div className="font-bold">
								<p className="text-sm">REGISTRATION END AT</p>
								<p className="text-xl text-white">
									{format(
										new Date(project?.endAt as any).getTime(),
										'dd.MM.yyy HH:MM'
									)}{' '}
									UTC
								</p>
							</div>
						) : (
							<div className="font-bold">
								<p className="text-sm">REGISTRATION START AT</p>
								<p className="text-xl text-white">
									{format(
										new Date(project?.startAt as any).getTime(),
										'dd.MM.yyy HH:MM'
									)}{' '}
									UTC
								</p>
							</div>
						)}
						{loading ? (
							<div className="w-full h-20 skeleton"></div>
						) : new Date(project?.startAt as any).getTime() <
						  new Date().getTime() ? (
							<CountDown
								endTimestamp={new Date(project?.endAt as any).getTime()}
								type="next"
							/>
						) : (
							<CountDown
								endTimestamp={new Date(project?.startAt as any).getTime()}
								type="next"
							/>
						)}
						<button className="btn w-full" disabled={true}>
							Coming Soon
						</button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
				<div>
					<h1 className="text-white my-4">TOKEN INFOMATION</h1>
					<div className="bg-base-200 p-8 rounded-lg font-bold">
						<div className="flex justify-between">
							<p>TOKEN</p>
							{token && <p className="text-white">{`${token[0].result}`}</p>}
						</div>
						<div className="divider"></div>
						<div className="flex justify-between">
							<p>TOKEN FOR SALE</p>
							<p className="text-white">{project?.maxCap}</p>
						</div>
						<div className="divider"></div>
						<div className="flex justify-between">
							<p>NETWORK</p>
							<p className="text-white">EDU Chain</p>
						</div>
						<div className="divider"></div>
						<div className="flex justify-between">
							<p>TOKEN ADDRESS</p>
							<p className="text-white">
								{project ? shortenAddress(project.tokenAddress) : 'loading'}
							</p>
						</div>
						<div className="divider"></div>
						<div className="flex justify-between">
							<p>DECIMALS</p>
							<p className="text-white">18</p>
						</div>
					</div>
				</div>
				<div>
					<h1 className="text-white my-4">POOL INFOMATION</h1>
					<div className="bg-base-200 p-8 rounded-lg font-bold">
						<div className="flex justify-between">
							<p>TOKEN DISTRIBUTION</p>
							<p className="text-white">--</p>
						</div>
						<div className="divider"></div>
						<div className="flex justify-between">
							<p>MIN. ALLOCATION</p>
							<p className="text-white">0 USDT</p>
						</div>
						<div className="divider"></div>
						<div className="flex justify-between">
							<p>MAX. ALLOCATION</p>
							<p className="text-white">0 USDT</p>
						</div>
						<div className="divider"></div>
						<div className="flex justify-between">
							<p>MIN SWAP LEVEL</p>
							<p className="text-white">--</p>
						</div>
						<div className="</button>divider"></div>
						<div className="flex justify-between">
							<p>ACCESS TYPE</p>
							<div className="badge badge-outline badge-success h-8 rounded-md border-2 font-bold bg-success/10">
								Public
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
