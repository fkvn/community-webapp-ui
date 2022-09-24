import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Space, Spin } from "antd";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
	AGREEMENT_PROP,
	EMAIL_PROP,
	OTP_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	SMS_PROP,
	USERNAME_PROP,
} from "../../Util/ConstVar";
import useAuth from "../Hook/useAuth";
import useFormControl from "../Hook/useFormControl";
import useSendVerifyCode from "../Hook/useTwilio";

function UserSignup({ stepHandlers = [], onSelectVerifyMethod = () => {} }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [form] = Form.useForm();
	const [verifyInfo, setVerifyInfo] = useState({
		channel: "",
		field: "",
		sendingCode: false,
		sentCode: false,
		verifyingCode: false,
		verifyAndRegister: false,
	});
	const { sendVerifyCode, verifyCode } = useSendVerifyCode();

	const {
		accessByFacebook,
		accessByGoogle,
		accessByApple,
		username,
		password,
		agreement,
		email,
		phone,
		otp,
	} = useFormControl();

	const { thainowRegister, thainowSignin } = useAuth();

	const [step, setStep] = useState(1);

	const title = (
		<div className="w-100 text-center">
			<div className="fs-3">
				{" "}
				Create a <span style={{ color: "#E94833" }}>ThaiNow</span> Account
			</div>
		</div>
	);

	const loginPrompt = (
		<>
			<div className="text-center tedkvn-center">
				Already have an account?{" "}
				<Button
					type="link"
					onClick={() =>
						navigate("/signin", {
							state: {
								continue: location.state?.continue || "",
							},
						})
					}
				>
					Sign In
				</Button>
			</div>
		</>
	);

	const onFinish = () => {
		console.log("submitting");
	};

	const renderStep1 = (
		<>
			{loginPrompt}
			<Divider orientation="left">Register with</Divider>
			<Space
				direction="horizontal"
				className="mx-4"
				size={40}
				wrap
				align="center"
			>
				{accessByFacebook()}
				{accessByGoogle()}
				{accessByApple()}
			</Space>
			<Divider>OR ThaiNow Account </Divider>

			{username()}
			{password()}
			{agreement()}

			<Form.Item className="my-2">
				<Button
					type="primary"
					onClick={() =>
						form
							.validateFields([USERNAME_PROP, PASSWORD_PROP, AGREEMENT_PROP])
							.then(() => setStep(2))
							.catch(() => {})
					}
					block
				>
					Register
				</Button>
			</Form.Item>
		</>
	);

	const verifyOptions = verifyInfo.channel === "" && (
		<>
			<div className="text-center">
				Congratulations, <strong>{form.getFieldValue("preferred name")}</strong>
				. You're almost done
			</div>
			<p className=" my-4 text-center">
				Let's verify your identity to protect a healthy community
			</p>
			<Form.Item className="my-2">
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
				>
					Email Verification
				</Button>
			</Form.Item>
			<Form.Item className="my-2">
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
				>
					SMS Verification
				</Button>
			</Form.Item>
			<Form.Item className="my-2">
				<Button
					shape="round"
					className="bg-secondary text-white"
					block
					onClick={() => setStep(1)}
				>
					Go Back
				</Button>
			</Form.Item>
		</>
	);

	const onSendVerifyCode = () => {
		if (verifyInfo.field === "")
			return Promise.reject(
				"There was an error in sending the OTP code. Please try again!"
			);

		form
			.validateFields([verifyInfo.field])
			.then(() => {
				setVerifyInfo({ ...verifyInfo, sendingCode: true });
				sendVerifyCode(verifyInfo.channel, form.getFieldValue(verifyInfo.field))
					.then(() => {
						setVerifyInfo({
							...verifyInfo,
							sentCode: true,
							sendingCode: false,
						});
					})
					.catch(() => setVerifyInfo({ ...verifyInfo, sendingCode: false }));
			})
			.catch(() => {});
	};

	const emailVerifySelection = verifyInfo.channel === EMAIL_PROP && (
		<>
			<p className=" my-4 text-center">
				Great, now please enter a valid <strong>email address</strong>
			</p>
			{email()}
		</>
	);

	const smsVerifySelection = verifyInfo.channel === SMS_PROP && (
		<>
			<p className=" my-4 text-center">
				Great, now please enter a valid <strong>US (+1) phone number</strong>
			</p>
			{phone()}
		</>
	);

	const sendingOTPCode = (verifyInfo.channel === EMAIL_PROP ||
		verifyInfo.channel === SMS_PROP) &&
		!verifyInfo.sentCode && (
			<>
				{emailVerifySelection}
				{smsVerifySelection}
				<Button
					type="link"
					className="p-0 m-0"
					onClick={() => {
						setVerifyInfo({
							...verifyInfo,
							channel: "",
							sendingCode: false,
						});
					}}
				>
					Verify by {verifyInfo.channel === EMAIL_PROP ? "SMS" : "Email"}{" "}
					instead
				</Button>
				<Form.Item className="my-2">
					<Button
						type="primary"
						shape="round"
						disabled={verifyInfo.sendingCode}
						block
						onClick={onSendVerifyCode}
					>
						Send Verifycation Code
					</Button>
				</Form.Item>
			</>
		);

	const otpVerifySelection = verifyInfo.sentCode && otp();

	const fetchRegisterInfo = () => {
		const email = form.getFieldValue(EMAIL_PROP);
		const phone = form.getFieldValue(PHONE_PROP);
		const credentials = {
			...(verifyInfo.channel === EMAIL_PROP &&
				email.length > 0 && { email: email, isEmailVerified: true }),
			...(verifyInfo.channel === SMS_PROP &&
				phone.length > 0 && { phone: phone, isPhoneVerified: true }),
			password: form.getFieldValue(PASSWORD_PROP),
		};

		const registerInfo = {
			verified: false,
			username: form.getFieldValue(USERNAME_PROP),
			...credentials,
		};

		return registerInfo;
	};

	const fetchSigninInfo = () => {
		return {
			...(verifyInfo.channel === EMAIL_PROP &&
				email.length > 0 && { email: email, channel: "email" }),
			...(verifyInfo.channel === SMS_PROP &&
				phone.length > 0 && { phone: phone, channel: "phone" }),
			password: form.getFieldValue(PASSWORD_PROP),
		};
	};

	const onVerifyCode = () => {
		form
			.validateFields([OTP_PROP, verifyInfo.field])
			.then(() => {
				setVerifyInfo({ ...verifyInfo, verifyingCode: true });
				verifyCode(
					verifyInfo.channel,
					form.getFieldValue(verifyInfo.field),
					form.getFieldValue(OTP_PROP).replace(/[^\d]/g, "")
				).then(() => {
					thainowRegister(fetchRegisterInfo()).then(() =>
						thainowSignin(fetchSigninInfo()).then(() =>
							setVerifyInfo({ ...verifyInfo, verifyAndRegister: true })
						)
					);
				});
			})
			.finally(() => {
				form.setFieldValue(OTP_PROP, "");
				setVerifyInfo({ ...verifyInfo, verifyingCode: false });
			});
	};

	const verifyingOTPCode = verifyInfo.sentCode &&
		!verifyInfo.verifyAndRegister && (
			<>
				<p className="text-center my-4">
					Next, please enter a <strong>4-digits</strong> verification code that
					we send to <strong>{form.getFieldValue(verifyInfo.field)}</strong>
				</p>
				{otpVerifySelection}
				<Button
					type="link"
					className="p-0 m-0"
					onClick={() => {
						setVerifyInfo({
							...verifyInfo,
							sentCode: false,
							verifyingCode: false,
						});
						form.setFieldValue(OTP_PROP, "");
					}}
				>
					Resend Code
				</Button>
				<Form.Item className="my-2 ">
					<Button
						type="primary"
						shape="round"
						disabled={verifyInfo.verifyingCode}
						block
						onClick={onVerifyCode}
					>
						Verify OTP Code
					</Button>
				</Form.Item>
			</>
		);

	// 	const registedSuccess = verifyInfo.verifyAndRegister && <>						<Image
	// 	src={picture}
	// 	width={100}
	// 	className="rounded-circle my-3"
	// /></>

	const renderStep2 = (
		<>
			<Space direction="vertical" className="my-2  w-100">
				{verifyOptions}
				{sendingOTPCode}
				{verifyingOTPCode}
			</Space>
		</>
	);

	const app = (
		<Stack className="py-5  tedkvn-center mx-4">
			<Form
				form={form}
				layout="vertical"
				className="mx-2 mx-xl-5"
				onFinish={onFinish}
				autoComplete="off"
			>
				<Space direction="vertical" size={20}>
					{!verifyInfo.verifyAndRegister && (
						<>
							{title}
							{step === 1 ? (
								renderStep1
							) : step === 2 ? (
								renderStep2
							) : (
								<Spin size="large">
									<Alert
										message="Register process is loading"
										description="If the process is taking too long, please try it again later or contact ThaiNow customer service."
										type="info"
									/>{" "}
								</Spin>
							)}
						</>
					)}
				</Space>
			</Form>
		</Stack>
	);

	return app;
}

export default UserSignup;
