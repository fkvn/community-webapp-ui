import { Col, Flex, Form, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { svgLoginPic } from "../../../Assest/Asset";
import { EMAIL_PROP, PASSWORD_PROP, PHONE_PROP } from "../../../Util/ConstVar";
import { formatString } from "../../../Util/Util";
import PasswordFormControl from "../../Form/PasswordFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import TopPageHeader from "../../Layout/TopPageHeader";
import Otp from "../Otp/Otp";

function ForgotPassword({
	onBeforeSendCode = (_channel = "", _field = "", _value = "") =>
		Promise.resolve(),
	onSubmitPassword = (_credentials = {}) => Promise.resolve(),
	onAfterSubmitPassword = (_channel = "", _credentials = {}) =>
		Promise.resolve(),
}) {
	const [form] = useForm();
	const { t } = useTranslation(["Password"]);

	const [changingPassword, setChangingPassword] = useState(false);
	const [isPasswordAllowedChange, setIsPasswordAllowedChange] = useState(false);

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
			password: password,
		};

		form
			.validateFields()
			.then(() => {
				setChangingPassword(true);
				onSubmitPassword(credentials)
					.then(() =>
						onAfterSubmitPassword(channel, credentials).then(() => {
							setChangingPassword(false);
						})
					)
					.catch(() => setChangingPassword(false));
			})
			.finally(() => setChangingPassword(false));
	};

	const onAfterVerifyCodeHandle = (isCodeVerified = false) =>
		setIsPasswordAllowedChange(isCodeVerified);

	// this to trigger the translation of the input message
	useEffect(() => {
		form.validateFields();
	}, [t, form]);

	const app = (
		<Row id="forgot-password">
			<Col
				lg={12}
				style={{
					backgroundImage: `url(${svgLoginPic})`,
					backgroundRepeat: "cover",
					// 61px is the height of the header, minus footer if needed
					minHeight: "calc(100vh - 61px)",
				}}
			></Col>
			<Col xs={24} lg={12} className="bg-white py-5">
				<Row justify="center">
					<Col xs={24} className="mt-3" style={{ maxWidth: "30rem" }}>
						<Form
							id="forgot-password-form"
							form={form}
							layout="vertical"
							className="info-description mx-2 mx-xl-5"
							autoComplete="off"
						>
							{title}
							{!isPasswordAllowedChange ? (
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
					</Col>
				</Row>
			</Col>
		</Row>
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
