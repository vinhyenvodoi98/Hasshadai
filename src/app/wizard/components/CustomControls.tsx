import type {
	Access,
	Info,
	Kind,
	KindedOptions,
	Upgradeable,
} from '@openzeppelin/wizard';
import { custom, premintPattern, infoDefaults } from '@openzeppelin/wizard';

import AccessControlSection from './AccessControlSection';
import HelpTooltip from './HelpTooltip';
import { Dispatch, SetStateAction } from 'react';
import ToggleRadio from './ToggleRadio';
import UpgradeabilitySection from './UpgradeabilitySection';
import InfoSection from './InfoSection';

export default function CustomControls({
	opts,
	setAllOpts,
}: {
	opts: Required<KindedOptions['Custom']>;
	setAllOpts: Dispatch<
		SetStateAction<{ [k in Kind]: Required<KindedOptions[k]> }>
	>;
}) {
	const requireAccessControl = custom.isAccessControlRequired(opts);

	const handleInputChange = (
		key: keyof Required<KindedOptions['Custom']>,
		value: any
	) => {
		setAllOpts((prevOpts) => {
			let t = {
				...prevOpts,
				Custom: {
					...prevOpts.Custom,
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
			</section>

			{/* Features Section */}
			<section className="p-2 shadow-lg rounded-lg bg-base-100">
				<h1 className="text-2xl font-bold mb-1">Features</h1>
				<div className="form-control space-y-4">
					{[
						{
							key: 'pausable',
							label: 'Pausable',
							helpText:
								'Privileged accounts will be able to pause functionality marked as whenNotPaused. Useful for emergency response.',
							link: 'https://docs.openzeppelin.com/contracts/api/utils#Pausable',
						},
					].map(({ key, label, helpText, link }) => (
						<label
							key={key}
							className="flex items-center space-x-2 cursor-pointer"
						>
							<input
								type="checkbox"
								checked={!!opts[key as keyof KindedOptions['Custom']]}
								onChange={(e) =>
									handleInputChange(
										key as keyof KindedOptions['Custom'],
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
