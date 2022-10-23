import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Space, Spin } from "antd";
import { useState } from "react";
import { Stack } from "react-bootstrap";
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
import useEmail from "../Hook/FormHook/useEmail";
import useEULA from "../Hook/FormHook/useEULA";
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
		<div className="w-100 text-center">
			<div className="fs-2">
				{" "}
				Register a <span style={{ color: "#E94833" }}>ThaiNow</span> Account
			</div>
		</div>
	);

	const loginPrompt = (
		<>
			<div className="text-center tedkvn-center">
				Already have an account?{" "}
				<Button
					type="link"
					onClick={() => forwardUrl(FORWARD_CONTINUE, "", "/signin")}
				>
					Sign In
				</Button>
			</div>
		</>
	);

	const renderStep1 = (
		<>
			{loginPrompt}
			<Divider orientation="left">Continue with</Divider>
			<Space
				direction="horizontal"
				className="mx-2 tedkvn-center"
				size={40}
				wrap
				align="center"
			>
				{/* {useFacebookAccess()} */}
				{useAppleAccess()}
				{useGoogleAccess()}
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
				>
					Register
				</Button>
			</Form.Item>
		</>
	);

	const emailVerifySelection = (
		<>
			<p className=" my-4 text-center">
				Great, now please enter a valid <strong>email address</strong>
			</p>
			{useEmail({
				inputProps: { autoFocus: true },
			})}
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
			<p className=" my-4 text-center">
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

	const registedSuccess = verifyInfo.verifyAndRegister && (
		<Space direction="vertical" className="my-2 text-center w-100">
			{image({
				src: imageSuccess,
				width: 200,
				className: "rounded-circle my-3",
			})}

			<p className="fs-4 fw-bold">Congratulations</p>
			<p className="fs-4 fw-bold">Your account has been succesfully created.</p>
			<p>
				Now, you can login with your{" "}
				{verifyInfo.channel === EMAIL_PROP ? `email address ` : `phone number `}{" "}
				<strong>{form.getFieldValue(verifyInfo.field)} </strong>
			</p>
			<div className="text-center tedkvn-center">
				Business Owner?{" "}
				<Button
					type="link"
					className="border-0"
					onClick={() =>
						thainowSignin(
							verifyInfo.channel === SMS_PROP ? PHONE_PROP : verifyInfo.channel,
							form.getFieldValue(verifyInfo.field),
							form.getFieldValue(PASSWORD_PROP),
							true,
							FORWARD_CONTINUE,
							"/register/business"
						)
					}
				>
					Activate your business profile
				</Button>
			</div>
			<Button
				type="primary"
				block
				className="p-4 my-4"
				onClick={() =>
					thainowSignin(
						verifyInfo.channel === SMS_PROP ? PHONE_PROP : verifyInfo.channel,
						form.getFieldValue(verifyInfo.field),
						form.getFieldValue(PASSWORD_PROP)
					)
				}
			>
				Sign in to {form.getFieldValue(verifyInfo.field)}
			</Button>
			<Button
				type="link"
				block
				className="border-0"
				onClick={() => forwardUrl()}
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
		<Stack className="py-5  tedkvn-center mx-4">
			<Form
				form={form}
				layout="vertical"
				className="mx-2 mx-xl-5"
				autoComplete="off"
			>
				<Space direction="vertical" size={20}>
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
			</Form>
		</Stack>
	);

	return app;
}

export default UserSignup;
