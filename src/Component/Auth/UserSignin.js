import {
	Button,
	Col,
	Divider,
	Form,
	Row,
	Segmented,
	Space,
	Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { svgLoginPic } from "../../Assest/env";
import {
	EMAIL_PROP,
	PASSWORD_PROP,
	PHONE_PROP,
	SIGNIN_CHANNEL_THAINOW,
} from "../../Util/ConstVar";
import { formatString } from "../../Util/Util";
import useEmail from "../Hook/FormHook/useEmail";
import usePassword from "../Hook/FormHook/usePassword";
import usePhone from "../Hook/FormHook/usePhone";
import useSignin from "../Hook/useSignin";
import AppleSignin from "./AppleSignin";
import FacebookSignin from "./FacebookSignin";
import GoogleSignin from "./GoogleSignin";
import LineSignin from "./LineSignin";

function UserSignin() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [signing, setSigning] = useState(false);

	const [form] = useForm();

	const { onSigninHandle } = useSignin();

	const [signinChannel, setSigninChannel] = useState(EMAIL_PROP);

	const title = (
		<Typography.Title level={3} className="text-center">
			{formatString(t("signin_msg"), "capitalize")}
			<span className="px-2" style={{ color: "#E94833" }}>
				ThaiNow
			</span>
			{formatString(t("account_msg"), "capitalize")}
			{/* Sign in to your <span style={{ color: "#E94833" }}>ThaiNow</span> Account */}
		</Typography.Title>
	);

	const loginPrompt = (
		<Row justify="center">
			<Col>
				<Space size={10} style={{ fontSize: "1rem" }}>
					<div>
						{formatString(t("q_do_not_have_account_msg"), "sentencecase")}
					</div>
					<Typography.Link
						underline
						onClick={() => navigate("/register/user")}
						style={{ fontSize: "1rem" }}
					>
						{formatString(t("register_now_msg"), "capitalize")}
					</Typography.Link>
				</Space>
			</Col>
		</Row>
	);

	const thirdPartySigninOptions = (
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
				{/* {useFacebookAccess()} */}
				<FacebookSignin />
				<GoogleSignin />
				<AppleSignin />
				<LineSignin />
			</Space>
		</>
	);

	const email = useEmail();
	const phone = usePhone();
	const password = usePassword({
		className: "mb-2",
		extra: (
			<Button type="link" className="px-0 mt-3" href="/forgot-password">
				<span style={{ textTransform: "capitalize" }}>
					{t("forgot_password_msg")}{" "}
				</span>
			</Button>
		),
	});

	const signInTabChildren = (
		<>
			{signinChannel === EMAIL_PROP && email}
			{signinChannel === PHONE_PROP && phone}
			{password}
			<Form.Item className="m-0">
				<Button
					htmlType="submit"
					block
					disabled={signing}
					style={{
						fontSize: "1rem",
						padding: "1.5rem",
						background: "#E94833",
						color: "white",
						borderRadius: ".5rem",
					}}
				>
					<span style={{ textTransform: "capitalize" }}>
						{t("signin_msg")}{" "}
					</span>
				</Button>
			</Form.Item>
		</>
	);

	const onFinish = () => {
		setSigning(true);
		form
			.validateFields()
			.then(
				() =>
					onSigninHandle(
						SIGNIN_CHANNEL_THAINOW,
						{
							channel: signinChannel,
							value: form.getFieldValue(signinChannel),
							password: form.getFieldValue(PASSWORD_PROP),
						},
						true
					)
				// thainowSignin(
				// 	signinChannel,
				// 	form.getFieldValue(signinChannel),
				// 	form.getFieldValue(PASSWORD_PROP),
				// 	true
				// )
			)
			.finally(() => setSigning(false));
	};

	const signinSection = (
		<>
			<Segmented
				block
				options={[
					{
						label: formatString(t("email_address_msg"), "capitalize"),
						value: EMAIL_PROP,
					},
					{
						label: formatString(t("phone_number_msg"), "capitalize"),
						value: PHONE_PROP,
					},
				]}
				onChange={(value) => setSigninChannel(value)}
				size="large"
			/>
			{signInTabChildren}
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
			></Col>
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
								{title}
								{loginPrompt}
								{thirdPartySigninOptions}
								<Divider>
									<span style={{ textTransform: "uppercase" }}>
										{" "}
										{t("or_msg")}
									</span>
								</Divider>

								{signinSection}
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
