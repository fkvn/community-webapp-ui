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
import { EMAIL_PROP, PASSWORD_PROP, PHONE_PROP } from "../../Util/ConstVar";
import { formatString } from "../../Util/Util";
import useEmail from "../Hook/FormHook/useEmail";
import usePassword from "../Hook/FormHook/usePassword";
import usePhone from "../Hook/FormHook/usePhone";
import useSignin from "../Hook/useSignin";
import AppleSignin from "./AppleSignin";
import GoogleSignin from "./GoogleSignin";

function UserSignin() {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [signing, setSigning] = useState(false);

	const [form] = useForm();

	const { thainowSignin } = useSignin();

	const [signinChannel, setSigninChannel] = useState(EMAIL_PROP);

	const title = (
		<Typography.Title level={3} className="text-center">
			{formatString(t("signin_msg"), "titleCase")}
			<span className="px-2" style={{ color: "#E94833" }}>
				ThaiNow
			</span>
			{formatString(t("account_msg"), "titleCase")}
			{/* Sign in to your <span style={{ color: "#E94833" }}>ThaiNow</span> Account */}
		</Typography.Title>
	);

	const loginPrompt = (
		<Row justify="center">
			<Col>
				<Space size={10} style={{ fontSize: "1rem" }}>
					<div>
						{formatString(t("q_do_not_have_account_msg"), "sentenceCase")}
					</div>
					<Typography.Link
						underline
						onClick={() => navigate("/register/user")}
						style={{ fontSize: "1rem" }}
					>
						{formatString(t("register_now_msg"), "titleCase")}
					</Typography.Link>
				</Space>
			</Col>
		</Row>
	);

	const thirdPartySigninOptions = (
		<>
			<Divider orientation="left">
				{formatString(t("continue_with_msg"), "sentenceCase")}{" "}
			</Divider>
			<Space
				direction="horizontal"
				className="mx-2 custom-center"
				size={40}
				wrap
				align="center"
			>
				{/* {useFacebookAccess()} */}
				<GoogleSignin />
				<AppleSignin />
			</Space>
		</>
	);

	const email = useEmail();
	const phone = usePhone();
	const password = usePassword({
		className: "mb-4",
		extra: (
			<Button type="link" className="px-0 mt-1" href="/forgot-password">
				Forgot password
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
					type="primary"
					htmlType="submit"
					block
					disabled={signing}
					style={{
						fontSize: "1rem",
						padding: "1.2rem",
						borderRadius: "1rem",
					}}
				>
					Sign In
				</Button>
			</Form.Item>
		</>
	);

	const onFinish = () => {
		setSigning(true);
		form
			.validateFields()
			.then(() =>
				thainowSignin(
					signinChannel,
					form.getFieldValue(signinChannel),
					form.getFieldValue(PASSWORD_PROP),
					true
				)
			)
			.finally(() => setSigning(false));
	};

	const signinSection = (
		<>
			<Segmented
				block
				options={[
					{
						label: "Email Address",
						value: EMAIL_PROP,
					},
					{
						label: "Phone Number",
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
		<Row justify="center" className="py-5" id="user-signin">
			<Col>
				<Form
					form={form}
					onFinish={onFinish}
					layout="vertical"
					className="info-description mx-2 mx-xl-5"
					autoComplete="off"
				>
					<Row justify="center">
						<Col>
							<Space
								direction="vertical"
								size={25}
								className="px-2"
								style={{ whiteSpace: "normal" }}
							>
								{title}
								{loginPrompt}
								{thirdPartySigninOptions}
								<Divider>OR</Divider>

								{signinSection}
							</Space>
						</Col>
					</Row>
				</Form>
			</Col>
		</Row>
	);

	return app;
}

export default UserSignin;
