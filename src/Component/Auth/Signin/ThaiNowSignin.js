import { Flex, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	CHANNEL_PROP,
	EMAIL_PROP,
	FORGOT_PASSWORD_PATH,
	PASSWORD_PROP,
	PHONE_PROP,
	REDIRECT_URI,
	REGION_PROP,
	SIGNIN_CHANNEL_THAINOW,
} from "../../../Util/ConstVar";
import EmailFormControl from "../../Form/EmailFormControl";
import PasswordFormControl from "../../Form/PasswordFormControl";
import PhoneFormControl from "../../Form/PhoneFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import useAuth from "../../Hook/AuthHook/useAuth";

function ThaiNowSignin() {
	const [form] = useForm();
	const { t } = useTranslation(["Default", "Password", "Email", "Phone"]);
	const { signin } = useAuth();

	const navigate = useNavigate();
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";

	const [signinChannel] = useState(EMAIL_PROP);
	const [signing, setSigning] = useState(false);

	const SigninChannel = () => {
		return {
			[`${EMAIL_PROP}`]: <EmailFormControl />,
			[`${PHONE_PROP}`]: <PhoneFormControl />,
		}[signinChannel];
	};

	const SignInTabChildren = () => (
		<Flex vertical gap="large">
			<SigninChannel />
			<PasswordFormControl withConfirmPassword={false} autoComplete={true} />
			<SubmitBtnFormControl
				title={t("password_forgot_msg", { ns: "Password" })}
				btnProps={{
					type: "link",
					className: "custom-center-left",
					style: { fontSize: "1rem", width: "fit-content" },
				}}
				onClick={() => navigate(`${FORGOT_PASSWORD_PATH}/${redirectUri}`)}
			/>
			<SubmitBtnFormControl
				disabled={signing}
				loading={signing}
				title={
					<span style={{ textTransform: "capitalize" }}>
						{t("signin_msg")}{" "}
					</span>
				}
				btnProps={{
					htmlType: "submit",
				}}
			/>
		</Flex>
	);

	const SigninTabOptions = () => (
		<>
			{/* <Segmented
				block
				options={[
					{
						label: t("email_address_msg", { ns: "Email" }),
						value: EMAIL_PROP,
					},
					{
						label: t("phone_number_msg", { ns: "Phone" }),
						value: PHONE_PROP,
					},
				]}
				onChange={(value) => setSigninChannel(value)}
				size="large"
			/> */}
			<SignInTabChildren />
		</>
	);

	useEffect(() => {
		form.validateFields();
	}, [t, form]);

	const onFinish = () => {
		setSigning(true);

		let credentials = {
			[`${EMAIL_PROP}`]: {
				[`${EMAIL_PROP}`]: form.getFieldValue(EMAIL_PROP),
				[`${PASSWORD_PROP}`]: form.getFieldValue(PASSWORD_PROP),
			},
			[`${PHONE_PROP}`]: {
				[`${PHONE_PROP}`]: form.getFieldValue(PHONE_PROP),
				[`${REGION_PROP}`]: form.getFieldValue(REGION_PROP),
				[`${PASSWORD_PROP}`]: form.getFieldValue(PASSWORD_PROP),
			},
		}[`${signinChannel}`];

		credentials = {
			[`${CHANNEL_PROP}`]: signinChannel,
			...credentials,
		};

		form
			.validateFields()
			.then(() => {
				signin(SIGNIN_CHANNEL_THAINOW, credentials, true)
					.then(() => {
						setSigning(false);
					})
					.catch(() => {
						setSigning(false);
					});
			})
			.catch(() => {});
	};

	const app = (
		<Form
			id="user-signin-form"
			form={form}
			onFinish={onFinish}
			layout="vertical"
			className="info-description bg-white"
			autoComplete="off"
		>
			<SigninTabOptions />
		</Form>
	);
	return app;
}

export default ThaiNowSignin;
