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
	onPhoneValidation = () => {},
	onMergeStorageSession = () => {},
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
			onMergeStorageSession(formattedPhone, isValidPhone);

			// update phone display
			if (ref.current) {
				ref.current.value = formattedPhone;
			}

			// notify and return that phone has validated
			onPhoneValidation(isValidPhone);
		},
		[ref, onPhoneValidation, onMergeStorageSession]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			// load default Value
			const defaultValue = onLoadDefaultValue() || "";

			// update phone display
			if (ref.current) {
				ref.current.value = defaultValue;
				onPhoneChangeHandler(-1, ref.current.value);
			}

			setLoading(false);
		}

		// update cursor
		util.updatePhoneCursorPostion(ref, cursor);
	}, [
		loading,
		setLoading,
		ref,
		cursor,
		onPhoneChangeHandler,
		onLoadDefaultValue,
	]);

	const app = (
		<FormControl
			{...(id && { id: id })}
			type={type}
			placeholder={placeholder}
			className={`tedkvn-formControl ${className}`}
			ref={ref}
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
