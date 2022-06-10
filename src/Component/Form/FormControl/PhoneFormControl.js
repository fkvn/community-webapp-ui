import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as util from "../../../Util/Util";

function PhoneFormControl({
	id = "",
	className = "",
	placeholder = "(___) ___-____",
	type = "tel",
	required = false,
	disabled = false,
	size = "14",
	minLength = "14",
	maxLength = "14",
	formattedPhone = "",
	onMergeStorage = () => {},
	onLoadDefaultValue = () => {},
}) {
	const [loading, setLoading] = useState(true);

	const [cursor, setCursor] = useState(0);

	const ref = React.createRef("");

	const onPhoneChangeHandler = useCallback(
		(cursor = -1, phone = "") => {
			// update cursor
			if (cursor >= 0) {
				setCursor(cursor);
			}

			//  validate phone
			const [formattedPhone, numOfDigits] = util.formatPhoneNumber(phone);

			const isValidPhone = numOfDigits === 10 || numOfDigits === 0;

			// merge to storage session
			onMergeStorage(formattedPhone, isValidPhone);
		},
		[onMergeStorage]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			// load default value
			onLoadDefaultValue();

			setLoading(false);
		}

		// update cursor
		util.updatePhoneCursorPostion(ref, cursor);
	}, [loading, setLoading, ref, cursor, onLoadDefaultValue]);

	const app = (
		<FormControl
			{...(id && { id: id })}
			type={type}
			placeholder={placeholder}
			ref={ref}
			className={`tedkvn-formControl ${className}`}
			value={formattedPhone}
			onChange={(p) =>
				onPhoneChangeHandler(p.currentTarget.selectionStart, p.target.value)
			}
			size={size}
			minLength={minLength}
			maxLength={maxLength}
			required={required}
			disabled={disabled}
		/>
	);
	return app;
}

export default PhoneFormControl;
