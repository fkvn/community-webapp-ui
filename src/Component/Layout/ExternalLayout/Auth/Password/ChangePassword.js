import { Flex, Form, Grid, Image, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { svgLoginPic } from "../../../../../Asset/Asset";
import {
	CHANNEL_PROP,
	EMAIL_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	REGION_PROP,
} from "../../../../../Util/ConstVar";
import Otp from "../../../../Auth/Otp/Otp";
import PasswordFormControl from "../../../../Form/PasswordFormControl";
import SubmitBtnFormControl from "../../../../Form/SubmitBtnFormControl";
import FormPageHeader from "../../../MainLayout/Header/FormPageHeader";

/**
 *
 * @param {*} credentials {CHANNEL_PROP: "", EMAIL_PROP: "", PHONE_PROP: "", REGION_PROP: "", PASSWORD_PROP: ""}
 * @returns
 */
function ChangePassword({
	onBeforeSendCode = (_channel = "", _field = "", _value = "") =>
		Promise.resolve(),
	onSubmitPassword = (_credentials = {}) => Promise.resolve(),
	onAfterSubmitPassword = (_credentials = {}) => Promise.resolve(),
	defaultMustVerify = true,
}) {
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

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
		const channel = form.getFieldValue(EMAIL_PROP)
			? EMAIL_PROP
			: form.getFieldValue(PHONE_PROP)
				? PHONE_PROP
				: "";

		let credentials = {
			[`${EMAIL_PROP}`]: {
				[`${EMAIL_PROP}`]: form.getFieldValue(EMAIL_PROP),
			},
			[`${PHONE_PROP}`]: {
				[`${PHONE_PROP}`]: form.getFieldValue(PHONE_PROP),
				[`${REGION_PROP}`]: form.getFieldValue(REGION_PROP),
			},
		}[`${channel}`];

		credentials = {
			[`${CHANNEL_PROP}`]: channel,
			[`${PASSWORD_PROP}`]: form.getFieldValue(PASSWORD_PROP),
			...credentials,
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
					.catch(() => {
						setChangingPassword(false);
					});
			})
			.catch(() => {
				setChangingPassword(false);
			});
	};

	// don't need to verify if the otp code is verifed
	const onAfterVerifyCodeHandle = (isCodeVerified = false) =>
		setMustVerify(!isCodeVerified);

	// this to trigger the translation of the input message
	useEffect(() => {
		form.validateFields();
	}, [t, form]);

	const App = () => (
		<>
			<FormPageHeader />
			<Flex
				gap={screens.xxl ? 100 : 0}
				justify={screens.lg ? "flex-start" : "center"}
			>
				{screens.lg && (
					<Image
						src={svgLoginPic}
						style={{
							maxWidth: "45vw",
							overflow: "hidden",
							height: "100vh",
							objectFit: "cover",
						}}
					/>
				)}
				<Flex
					vertical
					className=" w-100"
					align="center"
					style={{
						minWidth: "20rem",
						maxWidth: "40rem",
						padding: screens.md ? "0 5rem" : "2rem",
						paddingTop: "3rem",
						margin: screens.xxl ? "5rem" : "1rem",
					}}
					gap={20}
				>
					<Title />
					<Form
						id="forgot-password-form"
						form={form}
						layout="vertical"
						autoComplete="off"
						className="w-100"
						style={{
							minWidth: screens.md ? "25rem" : "10rem",
						}}
						initialValues={{
							[`${REGION_PROP}`]: "US",
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
		</>
	);

	return <App />;
}

export default ChangePassword;
