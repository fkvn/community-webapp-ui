import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import {
	EMAIL_PROP,
	OTP_PROP,
	PHONE_PROP,
	SMS_PROP,
} from "../../../Util/ConstVar";
import EmailFormControl from "../../Form/EmailFormControl";
import PhoneFormControl from "../../Form/PhoneFormControl";

import OtpFormControl from "../../Form/OtpFormControl";

import { formatUSPhoneNumber } from "../../../Util/Util";
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
	const { t } = useTranslation(["Otp", "Email", "Phone"]);
	const { sendCode, verifyCode } = useTwilio();
	const { errorMessage, loadingMessage } = useMessage();

	const [otpInfo, setOtpInfo] = useState({
		channel: "",
		field: "",
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
			field: EMAIL_PROP,
		});
		onAfterSelectEmailVerification();
	};

	const onSelectSMSVerificationHandle = () => {
		setOtpInfo({
			...otpInfo,
			channel: SMS_PROP,
			field: PHONE_PROP,
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
			[`${SMS_PROP}`]: <PhoneFormControl inputProps={{ autoFocus: true }} />,
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
		form.validateFields().then(() => {
			loadingMessage();
			setOtpInfo({ ...otpInfo, isCodeSending: true });

			const [channel, field, value] = [
				otpInfo?.channel,
				otpInfo?.field,
				form.getFieldValue(otpInfo?.field),
			];

			// send code
			onBeforeSendCode(channel, field, value)
				.then(() =>
					sendCode(channel, value).then(() =>
						setOtpInfo({
							...otpInfo,
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
		});
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
		form.validateFields().then(() => {
			loadingMessage("otp_code_verifying_msg");
			setOtpInfo({ ...otpInfo, isCodeVerifying: true });

			const [channel, value, token] = [
				otpInfo?.channel,
				form.getFieldValue(otpInfo?.field),
				form.getFieldValue(OTP_PROP),
			];

			// verify code
			verifyCode(channel, value, token)
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
		});
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
										? form.getFieldValue(otpInfo?.field)
										: formatUSPhoneNumber(form.getFieldValue(otpInfo?.field)) ||
										  "",
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

	const app = (
		<>
			<Flex vertical gap="large">
				<VerifyOption />
				<SendCode />
				<VerifyCode />
			</Flex>
		</>
	);
	return app;
}

export default Otp;
