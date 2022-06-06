import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as constVar from "../../../Util/ConstVar";
import * as util from "../../../Util/Util";

function NewPhoneFormControl({
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
	sessionStorageObjName = "",
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

			// update storage
			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_PHONE_VALIDATION,
				isValidPhone
			);
			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_PHONE_PROP,
				formattedPhone
			);

			// update phone display
			if (ref.current) {
				ref.current.value = formattedPhone;
			}

			// notify and return that phone has validated
			onPhoneValidation(isValidPhone);
		},
		[ref, sessionStorageObjName, onPhoneValidation]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			const defaultValue =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_PHONE_PROP}`
				] || "";

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
		sessionStorageObjName,
		onPhoneChangeHandler,
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

export default NewPhoneFormControl;
