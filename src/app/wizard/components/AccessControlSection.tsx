import type { Access } from '@openzeppelin/wizard';
import { useEffect, useState } from 'react';
import ToggleRadio from './ToggleRadio';
import HelpTooltip from './HelpTooltip';

export default function AccessControlSection({
	access,
	required,
	setAccess,
}: {
	access: Access;
	required: boolean;
	setAccess: any;
}) {
	const [defaultValueWhenEnabled, setDefaultValueWhenEnabled] = useState<
		'ownable' | 'roles' | 'managed'
	>('ownable');
	const [wasRequired, setWasRequired] = useState(required);
	const [wasAccess, setWasAccess] = useState(access);

	useEffect(() => {
		if (wasRequired && !required) {
			setAccess(wasAccess);
		} else {
			setWasAccess(access);
			if (access === false && required) {
				setAccess(defaultValueWhenEnabled);
			}
		}

		setWasRequired(required);
		if (access !== false) {
			setDefaultValueWhenEnabled(access);
		}
	}, [access, required]);

	return (
		<div className="controls-section p-2 rounded-lg bg-base-100">
			<h1 className="text-2xl font-bold mb-1">
				<label className="flex items-center">
					<span>Access Control</span>
					<span className="ml-2 flex-grow">
						<ToggleRadio
							value={access}
							defaultValue="ownable"
							disabled={required}
							setValue={(access: Access) => setAccess(access)}
						/>
					</span>
					<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#governor">
						Restrict who can access the functions of a contract or when they can
						do it.
					</HelpTooltip>
				</label>
			</h1>

			<div className="form-control space-y-2">
				<label
					className="flex cursor-pointer space-x-2 items-center"
				>
					<input
						type="radio"
						name="access"
						className="radio"
						value="ownable"
						checked={access === 'ownable'}
						onChange={() => setAccess('ownable')}
					/>
					<span className="label-text flex-grow">Ownable</span>

					<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#governor">
						Simple mechanism with a single account authorized for all privileged
						actions.
					</HelpTooltip>
				</label>
				<label
					className="flex cursor-pointer space-x-2 items-center"
				>
					<input
						type="radio"
						name="access"
						className="radio"
						value="roles"
						checked={access === 'roles'}
						onChange={() => setAccess('roles')}
					/>
					<span className="label-text flex-grow">Roles</span>

					<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#governor">
						Flexible mechanism with a separate role for each privileged action.
						A role can have many authorized accounts.
					</HelpTooltip>
				</label>
				<label
					className="flex cursor-pointer space-x-2 items-center"
				>
					<input
						type="radio"
						name="access"
						className="radio"
						value="managed"
						checked={access === 'managed'}
						onChange={() => setAccess('managed')}
					/>
					<span className="label-text flex-grow">Managed</span>

					<HelpTooltip link="https://docs.openzeppelin.com/contracts/governance#governor">
						Enables a central contract to define a policy that allows certain
						callers to access certain functions.
					</HelpTooltip>
				</label>
			</div>
		</div>
	);
}
