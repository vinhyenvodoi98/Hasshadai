import type {
	Access,
	Info,
	Kind,
	KindedOptions,
	Upgradeable,
} from '@openzeppelin/wizard';
import { erc20, premintPattern, infoDefaults } from '@openzeppelin/wizard';

import AccessControlSection from './AccessControlSection';
import HelpTooltip from './HelpTooltip';
import { Dispatch, SetStateAction } from 'react';
import ToggleRadio from './ToggleRadio';
import UpgradeabilitySection from './UpgradeabilitySection';
import InfoSection from './InfoSection';

export default function ERC20Controls({
	opts,
	setAllOpts,
}: {
	opts: Required<KindedOptions['ERC20']>;
	setAllOpts: Dispatch<
		SetStateAction<{ [k in Kind]: Required<KindedOptions[k]> }>
	>;
}) {
	const requireAccessControl = erc20.isAccessControlRequired(opts);

	const handleInputChange = (
		key: keyof Required<KindedOptions['ERC20']>,
		value: any
	) => {
		setAllOpts((prevOpts) => {
			let t = {
				...prevOpts,
				ERC20: {
					...prevOpts.ERC20,
					[key]: value,
				},
			};
			return t;
		});
	};

	return (
		<div className="space-y-2 w-80">
			{/* Settings Section */}
			<section className="p-2 shadow-lg rounded-lg bg-base-100">
				<h1 className="text-2xl font-bold">Settings</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="form-control">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							value={opts.name}
							onChange={(e) => handleInputChange('name', e.target.value)}
							className="input input-bordered"
						/>
					</div>

					<div className="form-control">
						<label className="label">
							<span className="label-text">Symbol</span>
						</label>
						<input
							type="text"
							value={opts.symbol}
							onChange={(e) => handleInputChange('symbol', e.target.value)}
							className="input input-bordered"
						/>
					</div>
				</div>

				<div className="form-control mt-1">
					<label className="px-0 label flex ">
						<span className="label-text">Premint</span>
						<HelpTooltip>
							Create an initial amount of tokens for the deployer.
						</HelpTooltip>
					</label>
					<input
						type="text"
						value={opts.premint}
						onChange={(e) => handleInputChange('premint', e.target.value)}
						placeholder="0"
						pattern={premintPattern.source}
						className="input input-bordered"
					/>
				</div>
			</section>

			{/* Features Section */}
			<section className="p-2 shadow-lg rounded-lg bg-base-100">
				<h1 className="text-2xl font-bold mb-1">Features</h1>
				<div className="form-control space-y-4">
					{[
						{
							key: 'mintable',
							label: 'Mintable',
							helpText:
								'Privileged accounts will be able to create more supply.',
						},
						{
							key: 'burnable',
							label: 'Burnable',
							helpText: 'Token holders will be able to destroy their tokens.',
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc20#ERC20Burnable',
						},
						{
							key: 'pausable',
							label: 'Pausable',
							helpText:
								'Privileged accounts will be able to pause functionality marked as whenNotPaused. Useful for emergency response.',
							link: 'https://docs.openzeppelin.com/contracts/api/utils#Pausable',
						},
						{
							key: 'permit',
							label: 'Permit',
							helpText:
								'Without paying gas, token holders will be able to allow third parties to transfer from their account.',
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc20#ERC20Permit',
						},
						{
							key: 'flashmint',
							label: 'Flash Minting',
							helpText:
								"Built-in flash loans. Lend tokens without requiring collateral as long as they're returned in the same transaction.",
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc20#ERC20FlashMint',
						},
					].map(({ key, label, helpText, link }) => (
						<label
							key={key}
							className="flex items-center space-x-2 cursor-pointer"
						>
							<input
								type="checkbox"
								checked={!!opts[key as keyof KindedOptions['ERC20']]}
								onChange={(e) =>
									handleInputChange(
										key as keyof KindedOptions['ERC20'],
										e.target.checked
									)
								}
								className="checkbox"
							/>
							<span className="label-text flex-grow">{label}</span>
							<HelpTooltip link={link}>{helpText}</HelpTooltip>
						</label>
					))}
				</div>
			</section>

			{/* Votes Section */}
			<section className="p-2 shadow-lg rounded-lg bg-base-100">
				<label className="flex items-center mb-1">
					<span className="text-2xl font-bold">Votes</span>
					<span className="ml-2 flex-grow">
						<ToggleRadio
							value={opts.votes}
							defaultValue="blocknumber"
							setValue={(value: any) => handleInputChange('votes', value)}
						/>
					</span>
					<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#governor">
						Uses voting durations expressed as block numbers.
					</HelpTooltip>
				</label>
				<div className="form-control space-y-2">
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="votes"
							value="blocknumber"
							checked={opts.votes === 'blocknumber'}
							onChange={() => handleInputChange('votes', 'blocknumber')}
							className="radio"
						/>
						<span className="label-text flex-grow">Block Number</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#governor">
							Uses voting durations expressed as block numbers.
						</HelpTooltip>
					</label>
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="votes"
							value="timestamp"
							checked={opts.votes === 'timestamp'}
							onChange={() => handleInputChange('votes', 'timestamp')}
							className="radio"
						/>
						<span className="label-text flex-grow">Timestamp</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#timestamp_based_governance">
							Uses voting durations expressed as timestamps.
						</HelpTooltip>
					</label>
				</div>
			</section>

			{/* Access Control Section */}
			<AccessControlSection
				access={opts.access}
				required={requireAccessControl}
				setAccess={(newAccess: Access) =>
					handleInputChange('access', newAccess)
				}
			/>
			<UpgradeabilitySection
				upgradeable={opts.upgradeable}
				setUpgradeable={(upgradeable: Upgradeable) =>
					handleInputChange('upgradeable', upgradeable)
				}
			/>
			<InfoSection
				info={opts.info}
				setInfo={(value: Info) => handleInputChange('info', value)}
			/>
		</div>
	);
}
