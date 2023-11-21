import { Flex, Form, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { svgLoginPic } from "../../../Assest/Asset";
import { formatString } from "../../../Util/RefUtil";
import { EMAIL_PROP, PASSWORD_PROP, PHONE_PROP } from "../../../Util/constVar";
import PasswordFormControl from "../../Form/PasswordFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import TopPageHeader from "../../Layout/Header/TopPageHeader";
import Otp from "../Otp/Otp";

function ForgotPassword({
	onBeforeSendCode = (_channel = "", _field = "", _value = "") =>
		Promise.resolve(),
	onSubmitPassword = (_credentials = {}) => Promise.resolve(),
	onAfterSubmitPassword = (_channel = "", _credentials = {}) =>
		Promise.resolve(),
	defaultNeedVerifyBeforeChangePassword = true,
}) {
	const [form] = useForm();
	const { t } = useTranslation(["Password"]);

	const [changingPassword, setChangingPassword] = useState(false);
	const [needVerifyBeforeChangePassword, setNeedVerifyBeforeChangePassword] =
		useState(defaultNeedVerifyBeforeChangePassword);

	const title = (
		<>
			<Typography.Title
				level={2}
				style={{ textTransform: "capitalize" }}
				className="mb-5 text-center "
			>
				{t("password_forgot_msg")}
			</Typography.Title>
		</>
	);

	const onSubmitPasswordHandle = () => {
		const email = form.getFieldValue(EMAIL_PROP) || "";
		const phone = form.getFieldValue(PHONE_PROP) || "";
		const password = form.getFieldValue(PASSWORD_PROP) || "";

		const channel = email ? EMAIL_PROP : phone ? PHONE_PROP : "";

		const credentials = {
			channel: channel,
			...(channel === EMAIL_PROP && { [`${EMAIL_PROP}`]: email }),
			...(channel === PHONE_PROP && { [`${PHONE_PROP}`]: phone }),
			[`${PASSWORD_PROP}`]: password,
		};

		form
			.validateFields()
			.then(() => {
				setChangingPassword(true);
				onSubmitPassword(credentials)
					.then(() =>
						onAfterSubmitPassword(credentials).then(() => {
							setChangingPassword(false);
						})
					)
					.catch(() => setChangingPassword(false));
			})
			.finally(() => setChangingPassword(false));
	};

	// don't need to verify if the otp code is verifed
	const onAfterVerifyCodeHandle = (isCodeVerified = false) =>
		setNeedVerifyBeforeChangePassword(!isCodeVerified);

	// this to trigger the translation of the input message
	useEffect(() => {
		form.validateFields();
	}, [t, form]);

	const app = (
		<Flex id="forgot-password" justify="space-between">
			<img
				alt="avatar"
				src={svgLoginPic}
				style={{
					minHeight: "100vh",
				}}
			/>
			<Flex justify="center" className="w-100">
				<Flex
					vertical
					gap="large"
					style={{
						padding: "0 5rem",
						paddingTop: "3rem",
					}}
				>
					<Form
						id="forgot-password-form"
						form={form}
						layout="vertical"
						className="info-description mx-2 mx-xl-5"
						autoComplete="off"
						style={{
							minWidth: "30rem",
						}}
					>
						{title}
						{needVerifyBeforeChangePassword ? (
							<Otp
								form={form}
								onBeforeSendCode={onBeforeSendCode}
								onAfterVerifyCode={onAfterVerifyCodeHandle}
							/>
						) : (
							<Flex vertical gap="large">
								<PasswordFormControl newPasswordForm={true} />
								<SubmitBtnFormControl
									disabled={changingPassword}
									loading={changingPassword}
									title={t("password_reset_msg")}
									onClick={onSubmitPasswordHandle}
								/>
							</Flex>
						)}
					</Form>
				</Flex>
			</Flex>
		</Flex>
	);

	return (
		<>
			<TopPageHeader
				title={formatString(t("password_forgot_msg"), "capitalize")}
			/>
			{app}
		</>
	);
}

export default ForgotPassword;
