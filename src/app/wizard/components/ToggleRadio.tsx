import React, { useState, useEffect } from 'react';

type T = any; // Replace `any` with the actual type if known

interface ToggleRadioProps {
	value?: false | T;
	defaultValue: T;
	disabled?: boolean;
	setValue: any;
}

const ToggleRadio: React.FC<ToggleRadioProps> = ({
	value = false,
	defaultValue,
	disabled,
	setValue,
}) => {
	// const [value, setValue] = useState<false | T>(initialValue);
	const [checked, setChecked] = useState<boolean>(value !== false);
	const [wasChecked, setWasChecked] = useState<boolean>(value !== false);
	const [wasValue, setWasValue] = useState<T>(value || defaultValue);

	useEffect(() => {
		if (!wasChecked) {
			if (checked) {
				setValue(wasValue);
			} else if (value !== false) {
				setChecked(true);
			}
		} else if (!checked) {
			setValue(false);
		} else if (value === false) {
			setChecked(false);
		}

		setWasChecked(checked);
		setWasValue(value || wasValue);
	}, [checked, value, wasChecked, wasValue]);

	return (
		<input
			type="checkbox"
			checked={checked}
			onChange={(e) => setChecked(e.target.checked)}
			disabled={disabled}
            className="checkbox"
		/>
	);
};

export default ToggleRadio;
