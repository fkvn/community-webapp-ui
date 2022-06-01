import React, { useCallback, useEffect, useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import * as util from "../../../Util/util";

function NewPhoneFormControl({
	id = "",
	className = "",
	withLabel = true,
	label = "Phone",
	labelClassName = "",
	placeholder = "(___) ___-____",
	required = true,
	autoFocus = false,
	displayWaningMessage = true,
	getWarningMessage = () => {},
	size = "14",
	minLength = "14",
	maxLength = "14",
	sessionStorageObjName = "",
	sessionStoragePropName = "phone",
	disabled = false,
	landlineWarning = false,
}) {
	const [warningMessage, setWarningMessage] = useState("");

	const [loading, setLoading] = useState(true);

	const [cursor, setCursor] = useState(0);

	const ref = React.createRef("");

	const onPhoneChangeHandler = useCallback(
		(cursor = -1, phone = "") => {
			if (cursor >= 0) {
				setCursor(cursor);
			}

			const [formattedPhone, numOfDigits] = util.formatPhoneNumber(phone);

			const isValidPhone = numOfDigits === 10 || numOfDigits === 0;

			util.saveToSessionStore(
				sessionStorageObjName,
				"isValidPhone",
				isValidPhone
			);
			util.saveToSessionStore(
				sessionStorageObjName,
				sessionStoragePropName,
				formattedPhone
			);

			if (ref.current) {
				ref.current.value = formattedPhone;
			}

			if (isValidPhone) {
				setWarningMessage("");
			} else {
				setWarningMessage("Sorry, Invalid Phone Number.");
			}
		},
		[ref, sessionStorageObjName, sessionStoragePropName]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			const defaultValue =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${sessionStoragePropName}`
				] || "";

			if (ref.current) {
				ref.current.value = defaultValue;
				onPhoneChangeHandler(-1, ref.current.value);
			}

			setLoading(false);
		}

		// update cursor
		util.updatePhoneCursorPostion(ref, cursor);

		// send warning message if needed
		getWarningMessage(warningMessage);
	}, [
		loading,
		setLoading,
		ref,
		cursor,
		getWarningMessage,
		warningMessage,
		sessionStorageObjName,
		sessionStoragePropName,
		onPhoneChangeHandler,
	]);

	const app = (
		<>
			{withLabel && (
				<Form.Label
					{...(id && { htmlFor: id })}
					className={`formLabel ${labelClassName} ${
						required && "tedkvn-required"
					} }`}
				>
					{label}
				</Form.Label>
			)}
			<FormControl
				{...(id && { id: id })}
				type="tel"
				placeholder={placeholder}
				className={`formControl ${className}`}
				ref={ref}
				onChange={(p) =>
					onPhoneChangeHandler(p.currentTarget.selectionStart, p.target.value)
				}
				size={size}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
				autoFocus={autoFocus}
				disabled={disabled}
			/>
			{displayWaningMessage && warningMessage.length > 0 && (
				<Form.Text className="text-muted">
					<span className="text-danger">{warningMessage}</span>
				</Form.Text>
			)}
			{landlineWarning && (
				<Form.Group>
					<Form.Text className="text-mute">
						This phone is for login credential and OTP verification (if any){" "}
						<br />
						<small className="text-danger">
							Please don't use any landline phone number!
						</small>
					</Form.Text>
				</Form.Group>
			)}
		</>
	);
	return app;
}

export default NewPhoneFormControl;
