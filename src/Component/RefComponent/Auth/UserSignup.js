import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import {
	Alert,
	Button,
	Col,
	Divider,
	Form,
	Row,
	Space,
	Spin,
	Typography,
} from "antd";
import { useState } from "react";
import { imageSuccess } from "../../Assest/Asset";
import {
	AGREEMENT_PROP,
	EMAIL_PROP,
	FORWARD_CONTINUE,
	OTP_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	SMS_PROP,
	USERNAME_PROP,
} from "../../Util/ConstVar";
import useEULA from "../Hook/FormHook/useEULA";
import useEmail from "../Hook/FormHook/useEmail";
import useOtp from "../Hook/FormHook/useOtp";
import usePassword from "../Hook/FormHook/usePassword";
import usePhone from "../Hook/FormHook/usePhone";
import useUsername from "../Hook/FormHook/useUsername";
import useAppleAccess from "../Hook/ThirdPartyHook/useAppleAccess";
import useGoogleAccess from "../Hook/ThirdPartyHook/useGoogleAccess";
import useImage from "../Hook/useImage";
import useRegister from "../Hook/useRegister";
import useSignin from "../Hook/useSignin";
import useSendVerifyCode from "../Hook/useTwilio";
import useUrls from "../Hook/useUrls";

function UserSignup() {
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
	const { image } = useImage();
	const { thainowSignin } = useSignin();
	const { thainowRegister } = useRegister();

	const [step, setStep] = useState(1);

	const { forwardUrl } = useUrls();

	const title = (
		<Typography.Title level={3} className="text-center">
			Register a <span style={{ color: "#E94833" }}>ThaiNow</span> Account
		</Typography.Title>
	);

	const loginPrompt = (
		<Row justify="center">
			<Col>
				<Space size={10} style={{ fontSize: "1rem" }}>
					<div>Already have an account?</div>
					<Typography.Link
						underline
						onClick={() => forwardUrl(FORWARD_CONTINUE, "", "/signin")}
					>
						Sign In
					</Typography.Link>
				</Space>
			</Col>
		</Row>
	);

	const renderStep1 = (
		<>
			{loginPrompt}
			<Divider orientation="left">Continue with</Divider>
			<Space
				direction="horizontal"
				className="mx-2 custom-center"
				size={40}
				wrap
				align="center"
			>
				{/* {useFacebookAccess()} */}
				{useGoogleAccess()}
				{useAppleAccess()}
			</Space>
			<Divider>OR Create ThaiNow Account </Divider>

			{useUsername()}
			{usePassword()}
			{useEULA()}

			<Form.Item className="my-2">
				<Button
					type="primary"
					onClick={() =>
						form
							.validateFields([USERNAME_PROP, PASSWORD_PROP, AGREEMENT_PROP])
							.then(() => setStep(2))
					}
					block
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
				>
					Register
				</Button>
			</Form.Item>
		</>
	);

	const emailVerifySelection = (
		<>
			<p
				className="text-center"
				style={{
					fontSize: "1rem",
				}}
			>
				Great, now please enter a valid <strong>email address</strong>
			</p>
			{useEmail({
				inputProps: { autoFocus: true },
			})}
		</>
	);

	const verifyOptions = verifyInfo.channel === "" && (
		<>
			<div
				className="text-center"
				style={{
					fontSize: "1rem",
				}}
			>
				Congratulations, <strong>{form.getFieldValue("preferred name")}</strong>
				. You're almost done
			</div>
			<p
				className=" my-4 text-center"
				style={{
					fontSize: "1rem",
				}}
			>
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
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
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
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
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
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
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

		form.validateFields([verifyInfo.field]).then(() => {
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
		});
	};

	const smsVerifySelection = (
		<>
			<p
				className="text-center"
				style={{
					fontSize: "1rem",
				}}
			>
				Great, now please enter a valid <strong>US (+1) phone number</strong>
			</p>
			{usePhone({
				inputProps: { autoFocus: true },
			})}
		</>
	);

	const sendingOTPCode = (verifyInfo.channel === EMAIL_PROP ||
		verifyInfo.channel === SMS_PROP) &&
		!verifyInfo.sentCode && (
			<>
				{verifyInfo.channel === EMAIL_PROP && emailVerifySelection}
				{verifyInfo.channel === SMS_PROP && smsVerifySelection}
				<Button
					type="link"
					className="px-0"
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
			</>
		);

	const otpVerifySelection = useOtp({}, { autoFocus: true });

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
			isVerified: true,
			username: form.getFieldValue(USERNAME_PROP),
			...credentials,
		};

		return registerInfo;
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
				).then(() =>
					thainowRegister(fetchRegisterInfo()).then(() =>
						setVerifyInfo({ ...verifyInfo, verifyAndRegister: true })
					)
				);
			})
			.finally(() => {
				form.setFieldValue(OTP_PROP, "");
				setVerifyInfo({ ...verifyInfo, verifyingCode: false });
			});
	};

	const verifyingOTPCode = verifyInfo.sentCode &&
		!verifyInfo.verifyAndRegister && (
			<>
				<p
					className="text-center"
					style={{ fontSize: "1rem", paddingBottom: ".5rem" }}
				>
					Next, please enter a <strong>4-digits</strong> verification code that
					we send to <strong>{form.getFieldValue(verifyInfo.field)}</strong>
				</p>
				{otpVerifySelection}
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
				<Form.Item className="my-3">
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
			</>
		);

	const registedSuccess = verifyInfo.verifyAndRegister && (
		<Space direction="vertical" className=" text-center w-100">
			{image({
				src: imageSuccess,
				width: 200,
				className: "rounded-circle ",
			})}

			<p className="fs-4 fw-bold">Congratulations</p>
			<p className="fs-4 fw-bold">Your account was created succesfully</p>
			<p>
				Now, you can login with your{" "}
				{verifyInfo.channel === EMAIL_PROP ? `email address ` : `phone number `}{" "}
				<strong>{form.getFieldValue(verifyInfo.field)} </strong>
			</p>
			<Row justify="center">
				<Col>
					<Space size={10} style={{ fontSize: "1rem" }}>
						<div>Business Owner?</div>
						<Typography.Link
							underline
							onClick={() =>
								thainowSignin(
									verifyInfo.channel === SMS_PROP
										? PHONE_PROP
										: verifyInfo.channel,
									form.getFieldValue(verifyInfo.field),
									form.getFieldValue(PASSWORD_PROP),
									true,
									FORWARD_CONTINUE,
									"/register/business"
								)
							}
						>
							Activate your business profile
						</Typography.Link>
					</Space>
				</Col>
			</Row>

			<Button
				type="primary"
				block
				className="mt-5"
				onClick={() =>
					thainowSignin(
						verifyInfo.channel === SMS_PROP ? PHONE_PROP : verifyInfo.channel,
						form.getFieldValue(verifyInfo.field),
						form.getFieldValue(PASSWORD_PROP),
						true
					)
				}
				style={{
					fontSize: "1rem",
					padding: "1.2rem",
					borderRadius: "1rem",
				}}
			>
				Sign in to {form.getFieldValue(verifyInfo.field)}
			</Button>
			<Button
				type="link"
				block
				className="border-0"
				onClick={() => forwardUrl()}
				style={{
					fontSize: "1rem",
					padding: "1rem",
					borderRadius: "1rem",
				}}
			>
				Back to home
			</Button>
		</Space>
	);

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
		<Row id="user-signup" justify="center" className="py-5">
			<Col>
				<Form
					form={form}
					layout="vertical"
					className="mx-2 mx-xl-5"
					autoComplete="off"
				>
					<Row justify="center">
						<Col>
							<Space direction="vertical" size={20} className="px-2">
								{!verifyInfo.verifyAndRegister ? (
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
								) : (
									registedSuccess
								)}
							</Space>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);

	return app;
}

export default UserSignup;
