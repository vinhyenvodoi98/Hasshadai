import React, { useState } from 'react';
import HelpTooltip from './HelpTooltip';
import { infoDefaults, Info } from '@openzeppelin/wizard';

const InfoSection = ({ info, setInfo }: { info: Info; setInfo: any }) => {
	return (
		<section className="controls-section p-2 rounded-lg bg-base-100">
			<h1>
				<label className="text-2xl font-bold mb-2">
					<span>Info</span>
				</label>
			</h1>
			<div className="form-control">
				<label className="label px-0">
					<span className="label-text flex justify-between">
						Security Contact
					</span>
					<HelpTooltip link="https://github.com/ethereum-lists/contracts/blob/main/README.md#tracking-new-deployments">
						Where people can contact you to report security issues. Will only be
						visible if contract metadata is verified.
					</HelpTooltip>
				</label>
				<input
					type="text"
					value={info.securityContact}
					placeholder="security@example.com"
					onChange={(e) =>
						setInfo({ ...info, securityContact: e.target.value })
					}
					className="input input-bordered"
				/>

				<label className="label label-text flex">License</label>
				<input
					type="text"
					value={info.license}
					placeholder={infoDefaults.license}
					onChange={(e) => setInfo({ ...info, license: e.target.value })}
					className="input input-bordered"
				/>
			</div>
		</section>
	);
};

export default InfoSection;
