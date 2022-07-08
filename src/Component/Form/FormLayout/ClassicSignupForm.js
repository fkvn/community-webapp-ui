import { Button, Container, Form } from "react-bootstrap";
import UserEmailFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserEmailFormControlContainer";
import UserPasswordFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserPasswordFormControlContainer";
import UserPhoneFormControlContainer from "../../../Container/FormContainer/FormControlContainer/UserFormControlContainer/UserPhoneFormControlContainer";
import UserContactFormGroupContainer from "../../../Container/FormContainer/FormGroupContainer/UserFormGroupContainer/UserContactFormGroupContainer";
import * as dispatchPromise from "../../../redux-store/dispatchPromise";
import * as constVar from "../../../Util/ConstVar";
import * as util from "../../../Util/Util";
import AgreementFormGroupControl from "../FormGroupControl/AgreementFormGroupControl";
import EmailFromGroupControl from "../FormGroupControl/EmailFormGroupControl";
import OtpVerifyFormGroupControl from "../FormGroupControl/OtpVerifyFormGroupControl";
import PasswordFromGroupControl from "../FormGroupControl/PasswordFormGroupControl";
import PhoneFromGroupControl from "../FormGroupControl/PhoneFormGroupControl";
import PrevstepFormGroupControl from "../FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../FormGroupControl/SubmitButtonFormGroupControl";

function ClassicSignupForm({
	storageObjName = "",
	step = -1,
	onBack = () => {},
	onSubmitLoading = false,
	onSelectVerifyMethod = () => {},
	onResetOtp = () => {},
}) {
	const step_1_headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p>Sign up to Connect with great Thai resources</p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const passwordFormGroupControl = (
		<PasswordFromGroupControl
			id="classic-signup-passwordFormControl"
			required={true}
			storageObjName={storageObjName}
			RenderFormControl={UserPasswordFormControlContainer}
		/>
	);

	const agreementFormGroupControl = <AgreementFormGroupControl />;

	const loginFormIntro = (
		<Form.Group className="mb-4 text-center">
			<Container className="tedkvn-center p-0 " fluid>
				<Button
					variant="link"
					href="/signup"
					className="px-1 px-sm-0 mx-md-2 d-inline-block"
				>
					Sign in instead
				</Button>
			</Container>
		</Form.Group>
	);

	const RenderStep1 = () => (
		<>
			{step_1_headline}
			<UserContactFormGroupContainer storageObjName={storageObjName} />
			{passwordFormGroupControl}
			{agreementFormGroupControl}
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl className="px-5" show={onSubmitLoading} />
			</div>
			{loginFormIntro}
		</>
	);

	const step_2_headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p className="text-center">
						Thanks for signing up,{" "}
						<span className="fw-bold">
							{
								util.getSessionStorageObj(storageObjName)[
									`${constVar.USERNAME_PROP}`
								]
							}
						</span>
					</p>
					<p className="text-center">
						To build a healthy community, please choose your preferred method
						below to verify your identity.
					</p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const emailVerificationBtn = (
		<SubmitButtonFormGroupControl
			show={onSubmitLoading}
			formGroupClassName="text-center pt-3"
			className="px-5"
			id="email-verification-btn"
			title="Email Verification"
			customSubmit={true}
			onClick={(e) => {
				onSelectVerifyMethod("email");

				// dispatch submit event
				const form = e.target.form;
				form.dispatchEvent(new Event("submit"));
			}}
		/>
	);

	const smsVerificationBtn = (
		<SubmitButtonFormGroupControl
			show={onSubmitLoading}
			formGroupClassName="text-center pt-3"
			className="px-5"
			id="sms-verification-btn"
			title="SMS Verification"
			variant="success"
			customSubmit={true}
			onClick={(e) => {
				onSelectVerifyMethod("phone");

				// dispatch submit event
				const form = e.target.form;
				form.dispatchEvent(new Event("submit"));
			}}
		/>
	);

	const RenderStep2 = () => (
		<>
			{step_2_headline}
			{emailVerificationBtn}
			{smsVerificationBtn}
			<div className="text-center pt-3">
				<PrevstepFormGroupControl
					className="px-5"
					variant="link"
					title="Go Back"
					onClick={() => onBack()}
				/>
			</div>
		</>
	);

	const verifyMethod =
		dispatchPromise.getState()[`${constVar.THAINOW_USER_SIGN_UP_OBJ}`][
			`${constVar.VERIFICATION_METHOD_PROP}`
		] || "";

	const step_3_headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p className="text-center">
						Now we have to verify your
						{verifyMethod === constVar.EMAIL_PROP
							? " email address "
							: verifyMethod === constVar.PHONE_PROP
							? " phone number "
							: ""}
					</p>
					<p className="text-center">
						To continue, please enter a valid{" "}
						{verifyMethod === constVar.EMAIL_PROP
							? " email address "
							: verifyMethod === constVar.PHONE_PROP
							? " phone number "
							: ""}
					</p>
				</>
			}
			style={{ fontSize: "1.2rem" }}
		/>
	);

	const emailFormGroupControl = (
		<EmailFromGroupControl
			id="classic-signup-emailFormControl"
			required={true}
			storageObjName={storageObjName}
			RenderFormControl={UserEmailFormControlContainer}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			id="classic-signup-phoneFormControl"
			required={true}
			storageObjName={storageObjName}
			RenderFormControl={UserPhoneFormControlContainer}
		/>
	);

	const RenderStep3 = () => (
		<>
			{step_3_headline}
			{verifyMethod === constVar.EMAIL_PROP
				? emailFormGroupControl
				: verifyMethod === constVar.PHONE_PROP
				? phoneFormGroupControl
				: ""}
			<div className="text-center pt-3">
				<SubmitButtonFormGroupControl
					className="px-5"
					title="Send verification code"
					show={onSubmitLoading}
				/>
			</div>
			<div className="text-center">
				<PrevstepFormGroupControl
					className="px-5"
					variant="link"
					title="Go Back and verify by another way"
					onClick={() => onBack()}
				/>
			</div>
		</>
	);

	const step_4_headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p className="text-center">Great job! You're almost done.</p>
					<p className="text-center">
						To activate your account, please enter the OTP verification code
						that we sent to{" "}
						{verifyMethod === constVar.EMAIL_PROP
							? util.getSessionStorageObj(storageObjName)[
									`${constVar.EMAIL_PROP}`
							  ]
							: verifyMethod === constVar.PHONE_PROP
							? " +1 " +
							  util.getSessionStorageObj(storageObjName)[
									`${constVar.PHONE_PROP}`
							  ]
							: ""}
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
				onClick={() => onBack(onResetOtp)}
			/>
		</>
	);

	const RenderStep4 = () => (
		<>
			{step_4_headline}
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
					onClick={() => onBack(onResetOtp)}
				/>
			</div>
		</>
	);

	const app = step > 0 && (
		<>
			{step === 1 && <RenderStep1 />}
			{step === 2 && <RenderStep2 />}
			{step === 3 && <RenderStep3 />}
			{step === 4 && <RenderStep4 />}
		</>
	);
	return app;
}

export default ClassicSignupForm;
