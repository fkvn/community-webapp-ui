import { Flex, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
	EMAIL_PROP,
	FORGOT_PASSWORD_PATH,
	PASSWORD_PROP,
	PHONE_PROP,
	REDIRECT_URI,
	SIGNIN_CHANNEL_THAINOW,
} from "../../../Util/constVar";
import EmailFormControl from "../../Form/EmailFormControl";
import PasswordFormControl from "../../Form/PasswordFormControl";
import PhoneFormControl from "../../Form/PhoneFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import useSignin from "../../Hook/useSignin";

function ThaiNowSignin() {
	const [form] = useForm();
	const { t } = useTranslation(["Default", "Password", "Email", "Phone"]);
	const { onSigninHandle } = useSignin();

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
			<PasswordFormControl withConfirmPassword={false} />
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
		form
			.validateFields()
			.then(() =>
				onSigninHandle(
					SIGNIN_CHANNEL_THAINOW,
					{
						channel: signinChannel,
						value: form.getFieldValue(signinChannel),
						[`${PASSWORD_PROP}`]: form.getFieldValue(PASSWORD_PROP),
					},
					true
				)
			)
			.finally(() => setSigning(false));
	};

	const app = (
		<Form
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
