import type {
	Access,
	Info,
	Kind,
	KindedOptions,
	Upgradeable,
} from '@openzeppelin/wizard';
import { erc721, premintPattern, infoDefaults } from '@openzeppelin/wizard';

import AccessControlSection from './AccessControlSection';
import HelpTooltip from './HelpTooltip';
import { Dispatch, SetStateAction, use, useEffect, useState } from 'react';
import ToggleRadio from './ToggleRadio';
import UpgradeabilitySection from './UpgradeabilitySection';
import InfoSection from './InfoSection';

export default function ERC721Controls({
	opts,
	setAllOpts,
}: {
	opts: Required<KindedOptions['ERC721']>;
	setAllOpts: Dispatch<
		SetStateAction<{ [k in Kind]: Required<KindedOptions[k]> }>
	>;
}) {
	const requireAccessControl = erc721.isAccessControlRequired(opts);
	const [wasMintable, setWasMintable] = useState(opts.mintable);
	const [wasIncremental, setWasIncremental] = useState(opts.incremental);

	useEffect(() => {
		if (wasMintable && !opts.mintable) {
			handleInputChange('incremental', false);
		}

		if (opts.incremental && !wasIncremental) {
			handleInputChange('mintable', true);
		}

		setWasMintable(opts.mintable);
		setWasIncremental(opts.incremental);
	}, [opts.mintable, opts.incremental]);

	const handleInputChange = (
		key: keyof Required<KindedOptions['ERC721']>,
		value: any
	) => {
		setAllOpts((prevOpts) => {
			let t = {
				...prevOpts,
				ERC721: {
					...prevOpts.ERC721,
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
						<span className="label-text">Base URI</span>
						<HelpTooltip children="Create an initial amount of tokens for the deployer." />
					</label>
					<input
						type="text"
						value={opts.baseUri}
						onChange={(e) => handleInputChange('baseUri', e.target.value)}
						placeholder="https://..."
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
							key: 'incremental',
							label: 'Auto Increment Ids',
							helpText:
								'New tokens will be automatically assigned an incremental id.',
						},
						{
							key: 'burnable',
							label: 'Burnable',
							helpText: 'Token holders will be able to destroy their tokens.',
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc721#ERC721Burnable',
						},
						{
							key: 'pausable',
							label: 'Pausable',
							helpText:
								'Privileged accounts will be able to pause functionality marked as whenNotPaused. Useful for emergency response.',
							link: 'https://docs.openzeppelin.com/contracts/api/utils#Pausable',
						},
						{
							key: 'enumerable',
							label: 'Enumerable',
							helpText:
								'Allows on-chain enumeration of all tokens or those owned by an account. Increases gas cost of transfers.',
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc721#ERC721Enumerable',
						},
						{
							key: 'uriStorage',
							label: 'URI Storage',
							helpText: 'Allows updating token URIs for individual token IDs.',
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc721#ERC721URIStorage',
						},
					].map(({ key, label, helpText, link }) => (
						<label
							key={key}
							className={`flex items-center space-x-2 cursor-pointer ${
								key === 'incremental' ? 'subcontrol' : ''
							}`}
						>
							<input
								type="checkbox"
								checked={!!opts[key as keyof KindedOptions['ERC721']]}
								onChange={(e) =>
									handleInputChange(
										key as keyof KindedOptions['ERC721'],
										e.target.checked
									)
								}
								className="checkbox"
							/>
							<span className="label-text flex-grow">{label}</span>
							<HelpTooltip children={helpText} link={link} />
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
