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
	storageObjName = "",
}) {
	const formattedOtp = useSelector(
		(state) =>
			state.thainowReducer[`${storageObjName}`][`${constVar.OTP_PROP}`] || ""
	);

	const updateReduxStoreOtp = (formattedOtp = "", isValidOtp = false) => {
		dispatchPromise.patchSignupUserInfo({
			[`${constVar.OTP_PROP}`]: formattedOtp,
			[`${constVar.OTP_VALIDATION}`]: isValidOtp,
		});
	};

	const onMergeStorageHandler = (formattedOtp = "", isValidOtp = false) => {
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
			onMergeStorage={onMergeStorageHandler}
		/>
	);
	return app;
}

export default OtpFormControlContainer;
