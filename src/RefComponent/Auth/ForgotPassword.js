import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import {
	validateEmailUniqueAxios,
	validatePhoneUniqueAxios,
} from "../../Axios/axiosPromise";
import {
	EMAIL_PROP,
	OTP_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	SMS_PROP,
} from "../../Util/ConstVar";
import useEmail from "../Hook/FormHook/useEmail";
import useOtp from "../Hook/FormHook/useOtp";
import usePageHeader from "../Hook/FormHook/usePageheader";
import usePassword from "../Hook/FormHook/usePassword";
import usePhone from "../Hook/FormHook/usePhone";
import { errorMessage } from "../Hook/useMessage";
import useProfile from "../Hook/useProfile";
import useSignin from "../Hook/useSignin";
import useTwilio from "../Hook/useTwilio";

function RefForgotPassword() {
	const [form] = useForm();
	const { sendVerifyCode, verifyCode } = useTwilio();
	const { changePassword } = useProfile();
	const { thainowSignin } = useSignin();

	const [verifyInfo, setVerifyInfo] = useState({
		channel: "",
		field: "",
		sendingCode: false,
		sentCode: false,
		verifyingCode: false,
		verifyAndRegister: false,
	});

	const [changingPassword, setChangingPassword] = useState(false);

	const title = (
		<>
			<Typography.Title level={2} type="danger">
				Forgot Password Request
			</Typography.Title>
			{!verifyInfo.verifyAndRegister && (
				<Typography.Text style={{ fontSize: "1rem" }}>
					Hi, please verify your identity first
				</Typography.Text>
			)}
		</>
	);

	const verifyOptions = verifyInfo.channel === "" && (
		<>
			<Form.Item className="my-4">
				<Button
					shape="round"
					icon={<MailOutlined />}
					block
					onClick={() =>
						setVerifyInfo({
							...verifyInfo,
							channel: EMAIL_PROP,
							field: EMAIL_PROP,
						})
					}
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
				>
					Email Verification
				</Button>
			</Form.Item>
			<Form.Item className="my-4">
				<Button
					shape="round"
					icon={<MessageOutlined />}
					className=""
					block
					onClick={() =>
						setVerifyInfo({
							...verifyInfo,
							channel: SMS_PROP,
							field: PHONE_PROP,
						})
					}
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
				>
					SMS Verification
				</Button>
			</Form.Item>
			{/* <Form.Item className="my-2">
				<Button
					shape="round"
					className="bg-secondary text-white"
					block
					onClick={() => setStep(1)}
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
				>
					Go Back
				</Button>
			</Form.Item> */}
		</>
	);

	const emailVerifySelection = useEmail({
		inputProps: { autoFocus: true },
	});

	const smsVerifySelection = usePhone({
		inputProps: { autoFocus: true },
	});

	const existUser = async () => {
		const fieldValue = form.getFieldValue(verifyInfo.field);
		let uniqueFieldValue = false;

		switch (verifyInfo.channel) {
			case EMAIL_PROP:
				uniqueFieldValue = await validateEmailUniqueAxios(fieldValue).catch(
					(e) => errorMessage(e)
				);
				break;
			case SMS_PROP:
				uniqueFieldValue = await validatePhoneUniqueAxios(fieldValue).catch(
					(e) => errorMessage(e)
				);
				break;
			default:
				break;
		}

		return uniqueFieldValue
			? errorMessage(
					"Not Found User matched with your phone number or email address "
			  )
			: Promise.resolve();
	};

	const onSendVerifyCode = () => {
		if (verifyInfo.field === "")
			return Promise.reject(
				"There was an error in sending the OTP code. Please try again!"
			);

		form
			.validateFields([verifyInfo.field])
			.then(() => {
				setVerifyInfo({ ...verifyInfo, sendingCode: true });
				existUser().then(() =>
					sendVerifyCode(
						verifyInfo.channel,
						form.getFieldValue(verifyInfo.field)
					).then(() => {
						setVerifyInfo({
							...verifyInfo,
							sentCode: true,
						});
					})
				);
			})
			.finally(() => setVerifyInfo({ ...verifyInfo, sendingCode: false }));
	};

	const sendingOTPCode = (verifyInfo.channel === EMAIL_PROP ||
		verifyInfo.channel === SMS_PROP) &&
		!verifyInfo.sentCode && (
			<div className="my-5">
				{verifyInfo.channel === EMAIL_PROP && emailVerifySelection}
				{verifyInfo.channel === SMS_PROP && smsVerifySelection}
				<Button
					type="link"
					className="px-0 my-3"
					onClick={() => {
						setVerifyInfo({
							...verifyInfo,
							channel: "",
							sendingCode: false,
						});
					}}
					style={{ fontSize: "1rem" }}
				>
					Verify by {verifyInfo.channel === EMAIL_PROP ? "SMS" : "Email"}{" "}
					instead
				</Button>
				<Form.Item className="my-3">
					<Button
						type="primary"
						shape="round"
						disabled={verifyInfo.sendingCode}
						block
						onClick={onSendVerifyCode}
						style={{
							fontSize: "1rem",
							padding: "1.2rem",
							borderRadius: "1rem",
						}}
					>
						Send Verification Code
					</Button>
				</Form.Item>
			</div>
		);

	const otpVerifySelection = useOtp({}, { autoFocus: true });

	const onVerifyCode = () => {
		form
			.validateFields([OTP_PROP, verifyInfo.field])
			.then(() => {
				setVerifyInfo({ ...verifyInfo, verifyingCode: true });
				verifyCode(
					verifyInfo.channel,
					form.getFieldValue(verifyInfo.field),
					form.getFieldValue(OTP_PROP).replace(/[^\d]/g, "")
				).then(() => setVerifyInfo({ ...verifyInfo, verifyAndRegister: true }));
			})
			.finally(() => {
				form.setFieldValue(OTP_PROP, "");
				setVerifyInfo({ ...verifyInfo, verifyingCode: false });
			});
	};

	const verifyingOTPCode = verifyInfo.sentCode &&
		!verifyInfo.verifyAndRegister && (
			<div className="my-4">
				<Typography.Text>
					Next, please enter a <strong>4-digits</strong> verification code that
					we send to <strong>{form.getFieldValue(verifyInfo.field)}</strong>
				</Typography.Text>
				<div className="my-4">{otpVerifySelection}</div>
				<Button
					type="link"
					className="px-0"
					onClick={() => {
						setVerifyInfo({
							...verifyInfo,
							sentCode: false,
							verifyingCode: false,
						});
						form.setFieldValue(OTP_PROP, "");
					}}
					style={{
						fontSize: "1rem",
					}}
				>
					Resend Code
				</Button>
				<Form.Item className="my-4">
					<Button
						type="primary"
						shape="round"
						disabled={verifyInfo.verifyingCode}
						block
						onClick={onVerifyCode}
						style={{
							fontSize: "1rem",
							padding: "1.2rem",
							borderRadius: "1rem",
						}}
					>
						Verify OTP Code
					</Button>
				</Form.Item>
			</div>
		);

	const password = usePassword();

	const confirmPassword = (
		<Form.Item
			name="confirm"
			label="Confirm Password"
			className="my-4"
			dependencies={[PASSWORD_PROP]}
			hasFeedback
			rules={[
				{
					required: true,
					message: "Please confirm your password!",
				},
				({ getFieldValue }) => ({
					validator(_, value) {
						if (!value || getFieldValue("password") === value) {
							return Promise.resolve();
						}
						return Promise.reject(
							new Error("The two passwords that you entered do not match!")
						);
					},
				}),
			]}
		>
			<Input.Password placeholder="Please re-enter your password" />
		</Form.Item>
	);

	const onChangePassword = () => {
		const email = form.getFieldValue(EMAIL_PROP) || "";
		const phone = form.getFieldValue(PHONE_PROP) || "";
		const password = form.getFieldValue(PASSWORD_PROP) || "";

		const channel =
			verifyInfo.channel === EMAIL_PROP
				? EMAIL_PROP
				: verifyInfo.channel === SMS_PROP
				? PHONE_PROP
				: "";

		const credentials = {
			channel: channel,
			...(channel === EMAIL_PROP && { email: email }),
			...(channel === PHONE_PROP && { phone: phone }),
			password: password,
		};

		form
			.validateFields()
			.then(() => {
				setChangingPassword(true);
				changePassword(credentials).then(() =>
					thainowSignin(
						channel,
						form.getFieldValue(verifyInfo.field),
						password,
						true
					)
				);
			})
			.finally(() => setChangingPassword(false));
	};

	const verifiedSuccess = verifyInfo.verifyAndRegister && (
		<div className="my-4">
			<Typography.Text style={{ fontSize: "1rem" }}>
				Next, please enter a new <strong>password</strong>
			</Typography.Text>
			<div className="my-4">
				{password} {confirmPassword}
			</div>
			<Form.Item className="my-5">
				<Button
					type="primary"
					shape="round"
					disabled={changingPassword}
					block
					onClick={onChangePassword}
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
				>
					Update Password and Sign In
				</Button>
				<Button
					shape="round"
					block
					onClick={() => {
						setVerifyInfo({
							...verifyInfo,
							sentCode: false,
							verifyingCode: false,
							verifyAndRegister: false,
						});
						form.setFieldValue(OTP_PROP, "");
					}}
					className="my-4"
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
				>
					Back
				</Button>
			</Form.Item>
		</div>
	);

	const app = (
		<Row justify="center" className="py-5 text-center" id="forgot-password">
			<Col>
				<Form
					id="forgot-password-form"
					form={form}
					layout="vertical"
					className="info-description mx-2 mx-xl-5"
					autoComplete="off"
				>
					<Row justify="center">
						<Col xs={24} className="mt-3" style={{ maxWidth: "30rem" }}>
							{title}
							{verifyOptions}
							{sendingOTPCode}
							{verifyingOTPCode}
							{verifiedSuccess}
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);

	return (
		<>
			{usePageHeader({
				title: "ThaiNow Forgot Password",
			})}{" "}
			{app}
		</>
	);
}

export default RefForgotPassword;
