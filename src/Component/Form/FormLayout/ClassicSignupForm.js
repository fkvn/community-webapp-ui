import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import * as constVar from "../../../Util/ConstVar";
import * as util from "../../../Util/Util";
import UserEmailFormControl from "../FormControl/UserInfoFormControl/UserEmailFormControl";
import UserPhoneFormControl from "../FormControl/UserInfoFormControl/UserPhoneFormControl";
import AgreementFormGroupControl from "../FormGroupControl/AgreementFormGroupControl";
import EmailFromGroupControl from "../FormGroupControl/EmailFormGroupControl";
import OtpVerifyFormGroupControl from "../FormGroupControl/OtpVerifyFormGroupControl";
import PhoneFromGroupControl from "../FormGroupControl/PhoneFormGroupControl";
import PrevstepFormGroupControl from "../FormGroupControl/PrevstepFormGroupControl";
import ReadOnlyFormGroupControl from "../FormGroupControl/ReadOnlyFormGroupControl";
import SubmitButtonFormGroupControl from "../FormGroupControl/SubmitButtonFormGroupControl";
import PasswordFromGroupControl from "../FormGroupControl/UserInfoFormGroupControl/PasswordFormGroupControl";
import UserContactFormGroupControl from "../FormGroupControl/UserInfoFormGroupControl/UserContactFormGroupControl";

function ClassicSignupForm({
	sessionStorageObjName = "",
	step = -1,
	onBack = () => {},
	onSubmitLoading = false,
}) {
	const passwordFormGroupControl = (
		<PasswordFromGroupControl
			id="classic-signup-passwordFormControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
		/>
	);

	const agreementFormGroupControl = <AgreementFormGroupControl />;

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
			<UserContactFormGroupControl
				sessionStorageObjName={sessionStorageObjName}
			/>
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
								util.getSessionStorageObj(sessionStorageObjName)[
									`${constVar.STORAGE_USERNAME_PROP}`
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
				util.saveToSessionStore(
					sessionStorageObjName,
					constVar.STORAGE_VERIFICATION_METHOD_PROP,
					constVar.STORAGE_EMAIL_PROP
				);
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
				util.saveToSessionStore(
					sessionStorageObjName,
					constVar.STORAGE_VERIFICATION_METHOD_PROP,
					constVar.STORAGE_PHONE_PROP
				);
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
		util.getSessionStorageObj(sessionStorageObjName)[
			`${constVar.STORAGE_VERIFICATION_METHOD_PROP}`
		] || "";

	const step_3_headline = (
		<ReadOnlyFormGroupControl
			title={
				<>
					<p className="text-center">
						Now we have to verify your
						{verifyMethod === constVar.STORAGE_EMAIL_PROP
							? " email address "
							: verifyMethod === constVar.STORAGE_PHONE_PROP
							? " phone number "
							: ""}
					</p>
					<p className="text-center">
						To continue, please enter a valid{" "}
						{verifyMethod === constVar.STORAGE_EMAIL_PROP
							? " email address "
							: verifyMethod === constVar.STORAGE_PHONE_PROP
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
			sessionStorageObjName={sessionStorageObjName}
			RenderFormControl={UserEmailFormControl}
		/>
	);

	const phoneFormGroupControl = (
		<PhoneFromGroupControl
			id="classic-signup-phoneFormControl"
			required={true}
			sessionStorageObjName={sessionStorageObjName}
			RenderFormControl={UserPhoneFormControl}
		/>
	);

	const RenderStep3 = () => (
		<>
			{step_3_headline}
			{verifyMethod === constVar.STORAGE_EMAIL_PROP
				? emailFormGroupControl
				: verifyMethod === constVar.STORAGE_PHONE_PROP
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
					onClick={() =>
						onBack(() => {
							// reset email
							util.saveToSessionStore(
								sessionStorageObjName,
								constVar.STORAGE_EMAIL_PROP,
								""
							);

							// reset phone
							util.saveToSessionStore(
								sessionStorageObjName,
								constVar.STORAGE_PHONE_PROP,
								""
							);
						})
					}
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
						{verifyMethod === constVar.STORAGE_EMAIL_PROP
							? util.getSessionStorageObj(sessionStorageObjName)[
									`${constVar.STORAGE_EMAIL_PROP}`
							  ]
							: verifyMethod === constVar.STORAGE_PHONE_PROP
							? " +1 " +
							  util.getSessionStorageObj(sessionStorageObjName)[
									`${constVar.STORAGE_PHONE_PROP}`
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
				sessionStorageObjName={sessionStorageObjName}
			/>
			<PrevstepFormGroupControl
				variant="link"
				title="Resend Code"
				className="p-0 m-0"
				onClick={() =>
					onBack(() => {
						// reset otp
						util.saveToSessionStore(
							sessionStorageObjName,
							constVar.STORAGE_OTP_PROP,
							""
						);
					})
				}
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
					onClick={() =>
						onBack(() => {
							// reset otp
							util.saveToSessionStore(
								sessionStorageObjName,
								constVar.STORAGE_OTP_PROP,
								""
							);
						})
					}
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
