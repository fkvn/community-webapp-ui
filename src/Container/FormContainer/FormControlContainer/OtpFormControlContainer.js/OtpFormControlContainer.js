import React from "react";
import { useSelector } from "react-redux";
import OtpVerifyFormControl from "../../../../Component/Form/FormControl/OtpVerifyFormControl";
import * as dispatchPromise from "../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../Util/ConstVar";

function OtpFormControlContainer({
	id = "",
	className = "",
	required = false,
	disabled = false,
	onOtpValidation = () => {},
	sessionStorageObjName = "",
}) {
	const formattedOtp = useSelector(
		(state) =>
			state.thainowReducer[`${sessionStorageObjName}`][
				`${constVar.STORAGE_OTP_PROP}`
			] || ""
	);

	const updateReduxStoreOtp = (formattedOtp = "", isValidOtp = false) => {
		dispatchPromise.patchSignupClassicInfo({
			[`${constVar.STORAGE_OTP_PROP}`]: formattedOtp,
			[`${constVar.STORAGE_OTP_VALIDATION}`]: isValidOtp,
		});
	};

	const onMergeStorageSessionHandler = (
		formattedOtp = "",
		isValidOtp = false
	) => {
		// update store
		updateReduxStoreOtp(formattedOtp, isValidOtp);

		// validate password
		onOtpValidation(isValidOtp);
	};

	const app = (
		<OtpVerifyFormControl
			{...(id && { id: id })}
			otp={formattedOtp}
			className={className}
			required={required}
			disabled={disabled}
			onMergeStorageSession={onMergeStorageSessionHandler}
		/>
	);
	return app;
}

export default OtpFormControlContainer;
