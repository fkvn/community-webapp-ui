import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { Flex, Grid, Typography } from "antd";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
	EMAIL_PROP,
	OTP_PROP,
	PHONE_PROP,
	REGION_PROP,
	SMS_PROP,
} from "../../../Util/ConstVar";
import { formatPhoneNumber } from "../../../Util/Util";
import EmailFormControl from "../../Form/EmailFormControl";
import OtpFormControl from "../../Form/OtpFormControl";
import PhoneFormControl from "../../Form/PhoneFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import useTwilio from "../../Hook/AuthHook/useTwilio";
import useMessage from "../../Hook/MessageHook/useMessage";

function Otp({
	form = {
		validateFields: () => Promise.resolve(),
		getFieldsValue: () => {},
		getFieldValue: () => {},
		setFieldValue: () => {},
	},
	btnSelectEmailVerificationProps = {},
	onAfterSelectEmailVerification = () => {},
	btnSelectSMSVerificationProps = {},
	onAfterSelectSMSVerification = () => {},
	btnSwitchVerifyOption: btnSwitchVerifyOptionProps = {},
	onAfterSwitchVerifyOption = () => {},
	onBeforeSendCode = (_channel = "", _field = "", _value = "") =>
		Promise.resolve(),
	btnSendCodeProps = {},
	btnResendCodeOption: btnResendCodeOptionProps = {},
	btnVerifyCodeProps = {},
	onAfterVerifyCode = (_isCodeVerified = false) => {},
}) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const { t } = useTranslation(["Otp", "Email", "Phone"]);
	const { sendCode, verifyCode } = useTwilio();
	const { errorMessage } = useMessage();

	const [otpInfo, setOtpInfo] = useState({
		channel: "",
		isCodeSending: false,
		isCodeSent: false,
		isCodeVerifying: false,
		isCodeVerified: false,
	});

	// this to trigger the translation of the input message
	useEffect(() => {
		form.validateFields();
	}, [t, form]);

	const onSelectEmailVerificationHandle = () => {
		setOtpInfo({
			...otpInfo,
			channel: EMAIL_PROP,
		});
		onAfterSelectEmailVerification();
	};

	const onSelectSMSVerificationHandle = () => {
		setOtpInfo({
			...otpInfo,
			channel: SMS_PROP,
		});
		onAfterSelectSMSVerification();
	};

	const VerifyOption = () =>
		otpInfo?.channel === "" && (
			<>
				<SubmitBtnFormControl
					title={t("email_verify_msg", { ns: "Email" })}
					onClick={onSelectEmailVerificationHandle}
					btnProps={{
						icon: <MailOutlined />,
						...btnSelectEmailVerificationProps,
					}}
				/>
				<SubmitBtnFormControl
					title={t("phone_sms_verify_msg", { ns: "Phone" })}
					onClick={onSelectSMSVerificationHandle}
					btnProps={{
						icon: <MessageOutlined />,
						...btnSelectSMSVerificationProps,
					}}
				/>
			</>
		);

	const SendMethod = () => {
		return {
			[`${EMAIL_PROP}`]: <EmailFormControl inputProps={{ autoFocus: true }} />,
			[`${SMS_PROP}`]: (
				<PhoneFormControl
					itemProps={{
						style: {
							minWidth: screens.md ? "25rem" : "10rem",
							maxWidth: "100%",
							marginRight: 20,
						},
					}}
					inputProps={{
						autoFocus: true,
					}}
				/>
			),
		}[otpInfo?.channel];
	};

	const onSwitchVerifyOptionHandle = () => {
		setOtpInfo({
			...otpInfo,
			channel: "",
			isCodeSending: false,
		});
		onAfterSwitchVerifyOption();
	};

	const onSendCodeHandle = () => {
		form
			.validateFields()
			.then(() => {
				// loadingMessage();
				setOtpInfo({ ...otpInfo, isCodeSending: true });

				const payload = {
					[`${EMAIL_PROP}`]: {
						[`${EMAIL_PROP}`]: form.getFieldValue(EMAIL_PROP),
					},
					[`${SMS_PROP}`]: {
						[`${PHONE_PROP}`]: form.getFieldValue(PHONE_PROP),
						[`${REGION_PROP}`]: form.getFieldValue(REGION_PROP),
					},
				}[`${otpInfo.channel}`];

				// send code
				onBeforeSendCode(otpInfo.channel, payload)
					.then(() =>
						sendCode(otpInfo.channel, payload).then(() =>
							setOtpInfo({
								...otpInfo,
								isCodeSending: false,
								isCodeSent: true,
							})
						)
					)
					.catch((e) =>
						errorMessage(e).then(() =>
							setOtpInfo({
								...otpInfo,
								isCodeSending: false,
							})
						)
					);
			})
			.catch(() => {});
	};

	const SendCode = () =>
		(otpInfo?.channel === EMAIL_PROP || otpInfo?.channel === SMS_PROP) &&
		!otpInfo?.isCodeSent && (
			<>
				<SendMethod />
				<SubmitBtnFormControl
					title={
						otpInfo?.channel === EMAIL_PROP
							? t("phone_sms_verify_msg", { ns: "Phone" })
							: t("email_verify_msg", { ns: "Email" })
					}
					onClick={onSwitchVerifyOptionHandle}
					btnProps={{
						type: "link",
						className: "custom-center-left",
						style: { fontSize: "1rem", width: "fit-content" },
						...btnSwitchVerifyOptionProps,
					}}
				/>
				<SubmitBtnFormControl
					title={t("otp_code_send_msg")}
					disabled={otpInfo?.isCodeSending}
					onClick={onSendCodeHandle}
					loading={otpInfo?.isCodeSending}
					btnProps={{
						...btnSendCodeProps,
					}}
				/>
			</>
		);

	const onResendCodeHandle = () => {
		setOtpInfo({
			...otpInfo,
			isCodeSent: false,
			isCodeVerifying: false,
		});
		form?.setFieldValue(OTP_PROP, "");
	};

	const onVerifyCodeHandle = () => {
		form
			.validateFields()
			.then(() => {
				setOtpInfo({ ...otpInfo, isCodeVerifying: true });

				const payload = {
					[`${EMAIL_PROP}`]: {
						[`${EMAIL_PROP}`]: form.getFieldValue(EMAIL_PROP),
						[`${OTP_PROP}`]: form.getFieldValue(OTP_PROP),
					},
					[`${SMS_PROP}`]: {
						[`${PHONE_PROP}`]: form.getFieldValue(PHONE_PROP),
						[`${REGION_PROP}`]: form.getFieldValue(REGION_PROP),
						[`${OTP_PROP}`]: form.getFieldValue(OTP_PROP),
					},
				}[`${otpInfo.channel}`];

				// verify code
				verifyCode(otpInfo.channel, payload)
					.then(() => {
						setOtpInfo({
							...otpInfo,
							isCodeVerifying: false,
							isCodeVerified: true,
						});
						form.setFieldValue(OTP_PROP, "");
						onAfterVerifyCode(true);
					})
					.catch(() => {
						setOtpInfo({
							...otpInfo,
							isCodeVerifying: false,
						});
					});
			})
			.catch(() => {});
	};

	const VerifyCode = () =>
		otpInfo?.isCodeSent &&
		!otpInfo?.isCodeVerified && (
			<>
				<Typography.Text
					style={{
						fontSize: "1rem",
					}}
				>
					<Trans i18nKey={"otp_code_verify_guide_msg"} ns="Otp">
						Next, please enter a verification code that we sent to
						<strong>
							{{
								value:
									otpInfo?.channel === EMAIL_PROP
										? form.getFieldValue(EMAIL_PROP)
										: formatPhoneNumber(
												form.getFieldValue(PHONE_PROP),
												form.getFieldValue(REGION_PROP)
											),
							}}
						</strong>
					</Trans>
				</Typography.Text>
				<OtpFormControl />
				<SubmitBtnFormControl
					title={t("otp_code_resend_msg")}
					onClick={onResendCodeHandle}
					btnProps={{
						type: "link",
						className: "custom-center-left",
						style: { fontSize: "1rem", width: "fit-content" },
						...btnResendCodeOptionProps,
					}}
				/>

				<SubmitBtnFormControl
					title={t("otp_code_verify_msg")}
					disabled={otpInfo?.isCodeVerifying}
					onClick={onVerifyCodeHandle}
					loading={otpInfo?.isCodeVerifying}
					btnProps={{
						...btnVerifyCodeProps,
					}}
				/>
			</>
		);

	const App = () => (
		<>
			<Flex vertical gap="large">
				<VerifyOption />
				<SendCode />
				<VerifyCode />
			</Flex>
		</>
	);
	return <App />;
}

export default Otp;
