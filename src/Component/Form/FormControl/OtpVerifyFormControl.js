import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
import * as constVar from "../../../Util/ConstVar";
import * as util from "../../../Util/Util";

function OtpVerifyFormControl(props) {
	const {
		id = "",
		className = "",
		required = false,
		placeholder = "_ _ _ _",
		type = "text",
		size = "7",
		minLength = "7",
		maxLength = "7",
		disabled = false,
		onOtpValidation = () => {},
		sessionStorageObjName = "",
	} = props;

	const [loading, setLoading] = useState(true);

	const [cursor, setCursor] = useState(0);

	const ref = React.createRef("");

	const onOtpValidationHanlder = useCallback(
		(cursor = -1, otp = "") => {
			// update cursor
			if (cursor >= 0) {
				setCursor(cursor);
			}

			//  validate otp
			const [formattedOtp, numOfDigits] = util.formatOtpNumber(otp);

			const isValidOtp = numOfDigits === 4;

			// update storage
			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_OTP_VALIDATION,
				isValidOtp
			);
			util.saveToSessionStore(
				sessionStorageObjName,
				constVar.STORAGE_OTP_PROP,
				formattedOtp
			);

			// update phone display
			if (ref.current) {
				ref.current.value = formattedOtp;
			}

			// notify and return that phone has validated
			onOtpValidation(isValidOtp);
		},
		[ref, sessionStorageObjName, onOtpValidation]
	);

	useEffect(() => {
		// first time load
		if (loading) {
			const defaultValue =
				util.getSessionStorageObj(sessionStorageObjName)[
					`${constVar.STORAGE_OTP_PROP}`
				] || "";

			// reset otp
			if (ref.current) {
				ref.current.value = defaultValue;
				onOtpValidationHanlder(-1, ref.current.value);
			}
			setLoading(false);
		}
	}, [
		loading,
		setLoading,
		ref,
		cursor,
		sessionStorageObjName,
		onOtpValidationHanlder,
	]);

	const app = (
		<>
			<FormControl
				{...(id && { id: id })}
				type={type}
				placeholder={placeholder}
				className={`tedkvn-formControl ${className}`}
				ref={ref}
				onChange={(p) =>
					onOtpValidationHanlder(p.currentTarget.selectionStart, p.target.value)
				}
				size={size}
				minLength={minLength}
				maxLength={maxLength}
				required={required}
				disabled={disabled}
			/>
		</>
	);

	return app;
}

export default OtpVerifyFormControl;
