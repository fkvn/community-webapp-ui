import OtpVerifyFormGroupControl from "../../../../../Component/Form/FormGroupControl/OtpVerifyFormGroupControl";
import PrevstepFormGroupControl from "../../../../../Component/Form/FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../../../../../Component/Form/FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../../../../../Component/Form/FormGroupControl/SubmitButtonFormGroupControl";
import * as dispatchPromise from "../../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../../Util/ConstVar";

function VerifyCodeContainer({
	storageObjName = "",
	onSubmitLoading = false,
	onBack = () => {},
}) {
	const getCallerName = (storageObjName = "") => {
		const callerInfo = dispatchPromise.getState()[`${storageObjName}`];

		const {
			[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.STORAGE_EMAIL_PROP}`]: email = "",
			[`${constVar.STORAGE_PHONE_PROP}`]: phone = "",
		} = callerInfo;

		const callerName =
			verifyOption === constVar.STORAGE_EMAIL_PROP
				? email
				: verifyOption === constVar.STORAGE_PHONE_PROP
				? " +1 " + phone
				: "";

		return callerName;
	};

	const onBackCallBack = () => {
		switch (storageObjName) {
			case constVar.THAINOW_USER_SIGN_UP_STORAGE_OBJ:
				dispatchPromise.patchSignupUserInfo({
					[`${constVar.STORAGE_OTP_PROP}`]: "",
					[`${constVar.STORAGE_OTP_VALIDATION}`]: false,
				});
				break;
			default:
				break;
		}
	};

	const headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p className="text-center">Great job! You're almost done.</p>
					<p className="text-center">
						To activate your account, please enter the OTP verification code
						that we sent to {getCallerName(storageObjName)}
					</p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const otpVerificationFormControl = (
		<>
			<OtpVerifyFormGroupControl
				id="classic-signup-otpFormControl"
				required={true}
				storageObjName={storageObjName}
			/>
			<PrevstepFormGroupControl
				variant="link"
				title="Resend Code"
				className="p-0 m-0"
				onClick={() => onBack(onBackCallBack)}
			/>
		</>
	);

	const app = (
		<>
			{" "}
			{headline}
			{otpVerificationFormControl}
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					className="px-5"
					title="Verify Code"
					show={onSubmitLoading}
				/>
			</div>
			<div className="text-center">
				<PrevstepFormGroupControl
					variant="link"
					title="Go Back"
					className="p-0 m-0"
					onClick={() => onBack(onBackCallBack)}
				/>
			</div>
		</>
	);
	return app;
}

export default VerifyCodeContainer;
