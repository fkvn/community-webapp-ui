import { Col, Flex, Form, Row, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { svgLoginPic } from "../../../Assest/Asset";
import { EMAIL_PROP, PASSWORD_PROP, PHONE_PROP } from "../../../Util/constVar";
import PasswordFormControl from "../../Form/PasswordFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import FormPageHeader from "../../SPALayout/Header/FormPageHeader";
import Otp from "../Otp/Otp";

function ForgotPassword({
	onBeforeSendCode = (_channel = "", _field = "", _value = "") =>
		Promise.resolve(),
	onSubmitPassword = (_credentials = {}) => Promise.resolve(),
	onAfterSubmitPassword = (_channel = "", _credentials = {}) =>
		Promise.resolve(),
	defaultMustVerify = true,
}) {
	const [form] = useForm();
	const { t } = useTranslation(["Password"]);

	const [changingPassword, setChangingPassword] = useState(false);
	const [mustVerify, setMustVerify] = useState(defaultMustVerify);

	const Title = () => (
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
		setMustVerify(!isCodeVerified);

	// this to trigger the translation of the input message
	useEffect(() => {
		form.validateFields();
	}, [t, form]);

	const App = () => (
		<Row>
			<Col
				xs={0}
				lg={12}
				style={{
					backgroundImage: `url(${svgLoginPic})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					height: "100vh",
				}}
			/>
			<Col xs={24} lg={12}>
				<Flex justify="center" className="w-100">
					<Flex
						vertical
						gap="large"
						style={{
							padding: "0 5rem",
							paddingTop: "3rem",
						}}
					>
						<Title />
						<Form
							id="forgot-password-form"
							form={form}
							layout="vertical"
							autoComplete="off"
							style={{
								minWidth: "25rem",
							}}
						>
							{mustVerify ? (
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
			</Col>
		</Row>
	);

	return (
		<>
			<FormPageHeader />
			<App />
		</>
	);
}

export default ForgotPassword;
