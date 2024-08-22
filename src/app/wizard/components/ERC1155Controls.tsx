// import HelpTooltip from './HelpTooltip.svelte';

import type {
	Access,
	Info,
	Kind,
	KindedOptions,
	Upgradeable,
} from '@openzeppelin/wizard';
import { erc1155, premintPattern, infoDefaults } from '@openzeppelin/wizard';

import AccessControlSection from './AccessControlSection';
import HelpTooltip from './HelpTooltip';
import { Dispatch, SetStateAction } from 'react';
import ToggleRadio from './ToggleRadio';
import UpgradeabilitySection from './UpgradeabilitySection';
import InfoSection from './InfoSection';

export default function ERC1155Controls({
	opts,
	setAllOpts,
}: {
	opts: Required<KindedOptions['ERC1155']>;
	setAllOpts: Dispatch<
		SetStateAction<{ [k in Kind]: Required<KindedOptions[k]> }>
	>;
}) {
	const requireAccessControl = erc1155.isAccessControlRequired(opts);

	const handleInputChange = (
		key: keyof Required<KindedOptions['ERC1155']>,
		value: any
	) => {
		setAllOpts((prevOpts) => {
			let t = {
				...prevOpts,
				ERC1155: {
					...prevOpts.ERC1155,
					[key]: value,
				},
			};
			return t;
		});
	};

	return (
		<div className="space-y-2 w-80">
			<section className="p-2 shadow-lg rounded-lg bg-base-100 min-width">
				<h1 className="text-2xl font-bold">Settings</h1>
				<div className="grid grid-cols-1">
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
				</div>

				<div className="form-control mt-1">
					<label className="px-0 label flex">
						<span className="label-text">URI</span>
						<HelpTooltip>
							Location of the metadata. Clients will replace any instance of {'{id}'} in this string with the tokenId.
						</HelpTooltip>
					</label>
					<input
						type="text"
						value={opts.uri}
						onChange={(e) => handleInputChange('uri', e.target.value)}
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
							key: 'burnable',
							label: 'Burnable',
							helpText: 'Token holders will be able to destroy their tokens.',
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc1155#ERC1155Burnable',
						},
						{
							key: 'pausable',
							label: 'Pausable',
							helpText:
								'Privileged accounts will be able to pause functionality marked as whenNotPaused. Useful for emergency response.',
							link: 'https://docs.openzeppelin.com/contracts/api/utils#Pausable',
						},
						{
							key: 'supply',
							label: 'Supply Tracking',
							helpText: 'Keeps track of total supply of tokens.',
						},
						{
							key: 'updatableUri',
							label: 'Updatable URI',
							helpText: `Privileged accounts will be able to set a new URI for all token types. Clients will replace any instance of {id} in the URI with the tokenId.`,
							link: 'https://docs.openzeppelin.com/contracts/api/token/erc1155#ERC1155-_setURI-string-',
						},
					].map(({ key, label, helpText, link }) => (
						<label
							key={key}
							className="flex items-center space-x-2 cursor-pointer"
						>
							<input
								type="checkbox"
								checked={!!opts[key as keyof KindedOptions['ERC1155']]}
								onChange={(e) =>
									handleInputChange(
										key as keyof KindedOptions['ERC1155'],
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
