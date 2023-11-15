import React, { useCallback, useEffect, useState } from "react";
import { FormControl } from "react-bootstrap";
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
		otp = "",
		onMergeStorage = () => {},
	} = props;

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

			// update
			onMergeStorage(formattedOtp, isValidOtp);
		},
		[onMergeStorage]
	);

	useEffect(() => {
		// update cursor
		util.updateOtpCursorPostion(ref, cursor);
	});

	const app = (
		<>
			<FormControl
				{...(id && { id: id })}
				type={type}
				placeholder={placeholder}
				ref={ref}
				className={`custom-formControl ${className}`}
				value={otp}
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
