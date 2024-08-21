import type {
	Info,
	Kind,
	KindedOptions,
	OptionsErrorMessages,
	Upgradeable,
} from '@openzeppelin/wizard';
import { governor, premintPattern, infoDefaults } from '@openzeppelin/wizard';

import HelpTooltip from './HelpTooltip';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import UpgradeabilitySection from './UpgradeabilitySection';
import InfoSection from './InfoSection';

export default function GovernorControls({
	opts,
	setAllOpts,
	errors,
}: {
	opts: Required<KindedOptions['Governor']>;
	setAllOpts: Dispatch<
		SetStateAction<{ [k in Kind]: Required<KindedOptions[k]> }>
	>;
	errors?: OptionsErrorMessages;
}) {
	const [wasERC721Votes, setWasERC721Votes] = useState(
		opts.votes === 'erc721votes'
	);
	const [previousDecimals, setPreviousDecimals] = useState(opts.decimals);
	const [disabledDecimals, setDisabledDecimals] = useState(false);
	const quorumAbsoluteInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (wasERC721Votes && opts.votes !== 'erc721votes') {
			handleInputChange('decimals', previousDecimals);
			setDisabledDecimals(false);
		} else if (!wasERC721Votes && opts.votes === 'erc721votes') {
			setPreviousDecimals(opts.decimals);
			handleInputChange('decimals', 0);
			setDisabledDecimals(true);
		}

		setWasERC721Votes(opts.votes === 'erc721votes');
	}, [opts.votes, wasERC721Votes, previousDecimals]);

	const focusQuorumAbsolute = () => {
		if (errors) {
			const prevErrors = errors;
			const prevQuorumError = errors.quorumAbsolute;
			errors.quorumAbsolute = undefined;
			quorumAbsoluteInput.current?.focus();
			setTimeout(() => {
				if (errors === prevErrors) {
					errors.quorumAbsolute = prevQuorumError;
				}
			}, 1000);
		}
	};

	const handleInputChange = (
		key: keyof Required<KindedOptions['Governor']>,
		value: any
	) => {
		setAllOpts((prevOpts) => ({
			...prevOpts,
			Governor: {
				...prevOpts.Governor,
				[key]: value,
			},
		}));
	};

	return (
		<div className="space-y-2 w-80">
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

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="form-control">
						<label className="label px-0 flex justify-between">
							<span>Voting Delay</span>
							<HelpTooltip>
								Delay since proposal is created until voting starts.
							</HelpTooltip>
						</label>
						<input
							value={opts.delay}
							onChange={(e) => handleInputChange('delay', e.target.value)}
							className={`input input-bordered ${
								errors?.delay ? 'input-error' : ''
							}`}
						/>
					</div>

					<div className="form-control">
						<label className="label px-0 flex justify-between">
							<span>Voting Period</span>
							<HelpTooltip>
								Length of period during which people can cast their vote.
							</HelpTooltip>
						</label>
						<input
							className={`input input-bordered ${
								errors?.period ? 'input-error' : ''
							}`}
							value={opts.period}
							onChange={(e) => handleInputChange('period', e.target.value)}
						/>
					</div>
				</div>

				<div className="form-control mt-1">
					<label className="px-0 label flex">
						<span className="label-text">Proposal Threshold</span>
						<HelpTooltip>
							Minimum number of votes an account must have to create a proposal.
						</HelpTooltip>
					</label>
					<input
						type="text"
						value={opts.proposalThreshold}
						onChange={(e) =>
							handleInputChange('proposalThreshold', e.target.value)
						}
						placeholder="0"
						className={`input input-bordered ${
							errors?.proposalThreshold ? 'input-error' : ''
						}`}
					/>
				</div>

				<div className="form-control">
					<div className="flex justify-between items-center">
						<span className="label flex space-x-2 items-center">
							<span>Quorum % </span>
							<input
								className="radio"
								type="radio"
								checked={opts.quorumMode === 'percent'}
								onChange={() => handleInputChange('quorumMode', 'percent')}
							/>
							<span> # </span>
							<input
								className="radio"
								type="radio"
								checked={opts.quorumMode === 'absolute'}
								onChange={() => handleInputChange('quorumMode', 'absolute')}
								onClick={focusQuorumAbsolute}
							/>
						</span>
						<HelpTooltip>Quorum required for a proposal to pass.</HelpTooltip>
					</div>
					{opts.quorumMode === 'percent' ? (
						<input
							className={`input input-bordered ${
								errors?.quorumPercent ? 'input-error' : ''
							}`}
							id="quorum-input"
							type="number"
							value={opts.quorumPercent}
							placeholder={governor.defaults.quorumPercent.toString()}
							onChange={(e) =>
								handleInputChange('quorumPercent', e.target.value)
							}
						/>
					) : (
						<input
							className={`input input-bordered ${
								errors?.quorumAbsolute ? 'input-error' : ''
							}`}
							id="quorum-input"
							value={opts.quorumAbsolute}
							onChange={(e) =>
								handleInputChange('quorumAbsolute', e.target.value)
							}
							ref={quorumAbsoluteInput}
						/>
					)}
				</div>
				<div className="flex justify-between items-center py-2">
					<label className="label">Token decimals:</label>
					<input
						disabled={disabledDecimals}
						type="number"
						value={opts.decimals}
						placeholder={governor.defaults.decimals.toString()}
						onChange={(e) => handleInputChange('decimals', e.target.value)}
						className={`w-20 input input-bordered input-inline ${
							errors?.decimals ? 'input-error' : ''
						}`}
					/>
					<HelpTooltip>
						Token amounts above will be extended with this number of zeroes.
						Does not apply to ERC721Votes.
					</HelpTooltip>
				</div>

				<div className="form-control space-y-4">
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="checkbox"
							checked={opts.settings}
							onChange={(e) => handleInputChange('settings', e.target.checked)}
							className="checkbox"
						/>
						<span className="label-text flex-grow">Updatable Settings</span>
						<HelpTooltip>
							Allow governance to update voting settings (delay, period,
							proposal threshold).
						</HelpTooltip>
					</label>

					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="checkbox"
							checked={opts.storage}
							onChange={(e) => handleInputChange('storage', e.target.checked)}
							className="checkbox"
						/>
						<span className="label-text flex-grow">Storage</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/api/governance#GovernorStorage">
							Enable storage of proposal details and enumerability of proposals.
						</HelpTooltip>
					</label>
				</div>
			</section>

			<section className="p-2 shadow-lg rounded-lg bg-base-100">
				<label className="flex items-center mb-1">
					<span className="text-2xl font-bold">Votes</span>
				</label>
				<div className="form-control space-y-2">
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="votes"
							checked={opts.votes === 'erc20votes'}
							onChange={() => handleInputChange('votes', 'erc20votes')}
							className="radio"
						/>
						<span className="label-text flex-grow">ERC20Votes</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/api/token/erc20#ERC20Votes">
							Represent voting power with a votes-enabled ERC20 token. Voters
							can entrust their voting power to a delegate.
						</HelpTooltip>
					</label>
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="votes"
							checked={opts.votes === 'erc721votes'}
							onChange={() => handleInputChange('votes', 'erc721votes')}
							className="radio"
						/>
						<span className="label-text flex-grow">ERC721Votes</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/api/token/erc721#ERC721Votes">
							Represent voting power with a votes-enabled ERC721 token. Voters
							can entrust their voting power to a delegate.
						</HelpTooltip>
					</label>
				</div>
			</section>

			<section className="p-2 shadow-lg rounded-lg bg-base-100">
				<label className="flex items-center mb-1">
					<span className="text-2xl font-bold flex-grow">Token Clock Mode</span>
					<HelpTooltip>
						The clock mode used by the voting token.
						<br />
						<b>NOTE:</b> This setting must be the same as what the token uses.
					</HelpTooltip>
				</label>
				<div className="form-control space-y-2">
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="clockMode"
							checked={opts.clockMode === 'blocknumber'}
							onChange={() => handleInputChange('clockMode', 'blocknumber')}
							className="radio"
						/>
						<span className="label-text flex-grow">Block Number</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#governor">
							The token uses voting durations expressed as block numbers.
						</HelpTooltip>
					</label>

					<p className="flex justify-between items-center">
						<label className="text-sm">
							1 block =
							<input
								type="number"
								step="0.01"
								placeholder={governor.defaults.blockTime.toString()}
								value={opts.blockTime}
								onChange={(e) => handleInputChange('blockTime', e.target.value)}
								className="input-inline w-20 input input-bordered mx-2"
								disabled={opts.clockMode === 'timestamp'}
							/>
							seconds
						</label>
						<HelpTooltip>
							Assumed block time for converting voting time periods into block
							numbers. Block time may drift and impact these periods in the
							future.
						</HelpTooltip>
					</p>

					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="clockMode"
							checked={opts.clockMode === 'timestamp'}
							onChange={() => handleInputChange('clockMode', 'timestamp')}
							className="radio"
						/>
						<span className="label-text flex-grow">Timestamp</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#timestamp_based_governance">
							The token uses voting durations expressed as timestamps.
						</HelpTooltip>
					</label>
				</div>
			</section>

			<section className="p-2 shadow-lg rounded-lg bg-base-100">
				<label className="flex items-center mb-1">
					<span className="text-2xl font-bold flex-grow">Timelock</span>
					<HelpTooltip>
						Add a delay to actions taken by the Governor. Gives users time to
						exit the system if they disagree with governance decisions.
					</HelpTooltip>
				</label>
				<div className="form-control space-y-2">
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="timelock"
							checked={opts.timelock === 'openzeppelin'}
							onChange={() => handleInputChange('timelock', 'openzeppelin')}
							className="radio"
						/>
						<span className="label-text flex-grow">TimelockController</span>
						<HelpTooltip link="https://docs.openzeppelin.com/contracts/api/governance#GovernorTimelockControl">
							Module compatible with OpenZeppelin's{' '}
							<code>TimelockController</code>. Allows multiple proposers and
							executors, in addition to the Governor itself.
						</HelpTooltip>
					</label>
					<label className="flex items-center space-x-2 cursor-pointer">
						<input
							type="radio"
							name="timelock"
							checked={opts.timelock === 'compound'}
							onChange={() => handleInputChange('timelock', 'compound')}
							className="radio"
						/>
						<span className="label-text flex-grow">Compound</span>
						<HelpTooltip link="https://github.com/compound-finance/compound-protocol/blob/master/contracts/Timelock.sol">
							Module compatible with Compound's <code>Timelock</code> contract.
							Useful if assets and roles are already held in this contract.
						</HelpTooltip>
					</label>
				</div>
			</section>

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
