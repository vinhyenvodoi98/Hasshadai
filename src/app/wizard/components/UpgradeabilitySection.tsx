import { Upgradeable } from '@openzeppelin/wizard';
import HelpTooltip from './HelpTooltip';
import ToggleRadio from './ToggleRadio';

const UpgradeabilitySection = ({
	upgradeable,
	setUpgradeable,
}: {
	upgradeable: Upgradeable;
	setUpgradeable: any;
}) => {
	return (
		<section className="p-2 shadow-lg rounded-lg bg-base-100">
			<label className="flex items-center mb-4">
				<span className="text-2xl font-bold">Upgradeability</span>
				<span className="ml-2 flex-grow">
					<ToggleRadio
						value={upgradeable}
						defaultValue="transparent"
						setValue={(value: Upgradeable) => setUpgradeable(value)}
					/>
				</span>
				<HelpTooltip link="https://docs.openzeppelin.com/openzeppelin/upgrades">
					Smart contracts are immutable by default unless deployed behind an
					upgradeable proxy.
				</HelpTooltip>
			</label>
			<div className="form-control space-y-2">
				<label className="flex items-center space-x-2 cursor-pointer">
					<input
						type="radio"
						name="upgradeable"
						value="transparent"
						checked={upgradeable === 'transparent'}
						onChange={() => setUpgradeable('transparent')}
						className="radio"
					/>
					<span className="label-text flex-grow">Transparent</span>
					<HelpTooltip link="https://docs.openzeppelin.com/contracts/api/proxy#TransparentUpgradeableProxy">
						Uses more complex proxy with higher overhead, requires less changes
						in your contract. Can also be used with beacons.
					</HelpTooltip>
				</label>
				<label className="flex items-center space-x-2 cursor-pointer">
					<input
						type="radio"
						name="upgradeable"
						value="timestamp"
						checked={upgradeable === 'uups'}
						onChange={() => setUpgradeable('uups')}
						className="radio"
					/>
					<span className="label-text flex-grow">UUPS</span>
					<HelpTooltip link="https://docs.openzeppelin.com/contracts/api/proxy#UUPSUpgradeable">
						Uses simpler proxy with less overhead, requires including extra code
						in your contract. Allows flexibility for authorizing upgrades.
					</HelpTooltip>
				</label>
			</div>
		</section>
	);
};

export default UpgradeabilitySection;
