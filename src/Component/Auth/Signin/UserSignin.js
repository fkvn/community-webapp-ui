import { Col, Divider, Flex, Form, Row, Space, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { svgLoginPic } from "../../../Assest/Asset";
import {
	EMAIL_PROP,
	FORGOT_PASSWORD_PATH,
	PASSWORD_PROP,
	PHONE_PROP,
	REDIRECT_URI,
	SIGNIN_CHANNEL_THAINOW,
} from "../../../Util/ConstVar";
import { formatString } from "../../../Util/Util";
import EmailFormControl from "../../Form/EmailFormControl";
import PasswordFormControl from "../../Form/PasswordFormControl";
import PhoneFormControl from "../../Form/PhoneFormControl";
import SubmitBtnFormControl from "../../Form/SubmitBtnFormControl";
import useSignin from "../../Hook/useSignin";
import AppleSignin from "./AppleSignin";
import FacebookSignin from "./FacebookSignin";
import GoogleSignin from "./GoogleSignin";
import LineSignin from "./LineSignin";

function UserSignin() {
	const navigate = useNavigate();
	const { t } = useTranslation(["Default", "Password", "Email", "Phone"]);
	const [params] = useSearchParams();
	const redirectUri = params.get(REDIRECT_URI) || "";

	const [signing, setSigning] = useState(false);

	const [form] = useForm();

	const { onSigninHandle } = useSignin();

	const [signinChannel] = useState(EMAIL_PROP);

	useEffect(() => {
		form.validateFields();
	}, [t, form]);

	const Title = () => (
		<Typography.Title
			level={3}
			className="text-center"
			style={{ textTransform: "capitalize" }}
		>
			{t("signin_msg")}
			<span className="px-2" style={{ color: "#E94833" }}>
				ThaiNow
			</span>
			{t("account_msg")}
		</Typography.Title>
	);

	const NoAccountMessage = () => (
		<Row justify="center">
			<Col>
				<Space size={10} style={{ fontSize: "1rem" }}>
					<div style={{ textTransform: "capitalize" }}>
						{t("q_do_not_have_account_msg")}
					</div>
					<Typography.Link
						underline
						onClick={() => navigate("/register/user")}
						style={{ fontSize: "1rem", textTransform: "capitalize" }}
					>
						{t("register_now_msg")}
					</Typography.Link>
				</Space>
			</Col>
		</Row>
	);

	const ThirdPartySigninOptions = () => (
		<>
			<Divider orientation="left">
				{formatString(t("continue_with_msg"), "sentencecase")}{" "}
			</Divider>
			<Space
				direction="horizontal"
				className="mx-2 custom-center"
				size={40}
				wrap
				align="center"
			>
				<FacebookSignin />
				<GoogleSignin />
				<AppleSignin />
				<LineSignin />
			</Space>
		</>
	);

	const ThainowSignin = () => {
		return {
			[`${EMAIL_PROP}`]: <EmailFormControl />,
			[`${PHONE_PROP}`]: <PhoneFormControl />,
		}[signinChannel];
	};

	const SignInTabChildren = () => (
		<Flex vertical gap="large">
			<ThainowSignin />
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

	const app = (
		<Row id="user-signin">
			<Col
				lg={12}
				style={{
					backgroundImage: `url(${svgLoginPic})`,
					backgroundRepeat: "cover",
					// 61px is the height of the header, minus footer if needed
					minHeight: "calc(100vh - 61px)",
				}}
			/>
			<Col xs={24} lg={12} className="bg-white py-5">
				<Row justify="center">
					<Col>
						<Form
							form={form}
							onFinish={onFinish}
							layout="vertical"
							className="info-description bg-white mx-2 mx-xl-5"
							autoComplete="off"
						>
							<Space
								direction="vertical"
								size={25}
								className="px-2"
								style={{ whiteSpace: "normal", minWidth: "500px" }}
							>
								<Title />
								<NoAccountMessage />
								<ThirdPartySigninOptions />
								<Divider>
									<span style={{ textTransform: "uppercase" }}>
										{t("or_msg")}
									</span>
								</Divider>
								<SigninTabOptions />
							</Space>
						</Form>
					</Col>
				</Row>
			</Col>
		</Row>
	);

	return app;
}

export default UserSignin;
