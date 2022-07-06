import { Stack } from "react-bootstrap";
import OtpVerifyFormGroupControl from "../../../../../Component/Form/FormGroupControl/OtpVerifyFormGroupControl";
import PrevstepFormGroupControl from "../../../../../Component/Form/FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../../../../../Component/Form/FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../../../../../Component/Form/FormGroupControl/SubmitButtonFormGroupControl";
import * as dispatchPromise from "../../../../../redux-store/dispatchPromise";
import * as constVar from "../../../../../Util/ConstVar";

function VerifyCodeContainer({
	title = "",
	headlineGap = 3,
	storageObjName = "",
	onSubmitLoading = false,
	onBack = () => {},
}) {
	const getCallerName = (storageObjName = "") => {
		const callerInfo = dispatchPromise.getState()[`${storageObjName}`] || {};

		const {
			[`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`]: verifyOption = "",
			[`${constVar.STORAGE_USERNAME_PROP}`]: username = "",
			[`${constVar.STORAGE_EMAIL_PROP}`]: email = "",
			[`${constVar.STORAGE_PHONE_PROP}`]: phone = "",
		} = callerInfo;

		const value =
			verifyOption === constVar.STORAGE_EMAIL_PROP
				? email
				: verifyOption === constVar.STORAGE_PHONE_PROP
				? " +1 " + phone
				: "";

		return [username, value];
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
				<Stack gap={headlineGap}>
					<div className="fs-3 text-center">
						{title ? (
							title
						) : (
							<>
								{" "}
								Hi, <span className="fw-bold">there</span>
								Thanks for signing up.{" "}
							</>
						)}
					</div>

					<div className="w-100 text-center">
						Congratulations,{" "}
						<span className="fw-bold">{getCallerName(storageObjName)[0]} </span>
						. You're almost done.
					</div>

					<div className="w-100 text-center">
						To activate your account, please enter a the 4-digits verification
						code that we sent to{" "}
						<span className="fw-bold">{getCallerName(storageObjName)[1]} </span>
					</div>
				</Stack>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const otpVerificationFormControl = (
		<div className="w-75 mx-auto">
			<OtpVerifyFormGroupControl
				id="classic-signup-otpFormControl"
				required={true}
				storageObjName={storageObjName}
			/>
			<div className="mt-4">
				<PrevstepFormGroupControl
					className="px-0"
					variant="link"
					title="Resend Code"
					onClick={() => onBack(onBackCallBack)}
				/>
			</div>
		</div>
	);

	const app = (
		<Stack className="w-100" gap={4}>
			{headline}
			{otpVerificationFormControl}
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					className="px-5"
					title="Verify Code"
					isLoading={onSubmitLoading}
				/>
			</div>
		</Stack>
	);
	return app;
}

export default VerifyCodeContainer;
