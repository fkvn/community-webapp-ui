import { Button, Divider, Form, Segmented, Space, Tabs } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EMAIL_PROP, PASSWORD_PROP, PHONE_PROP } from "../../Util/ConstVar";
import useAppleAccess from "../Hook/FormHook/useAppleAccess";
import useEmail from "../Hook/FormHook/useEmail";
import useFacebookAccess from "../Hook/FormHook/useFacebookAccess";
import useGoogleAccess from "../Hook/FormHook/useGoogleAccess";
import usePassword from "../Hook/FormHook/usePassword";
import usePhone from "../Hook/FormHook/usePhone";
import useSignin from "../Hook/useSignin";

function UserSignin() {
	const navigate = useNavigate();

	const [signing, setSigning] = useState(false);

	const [form] = useForm();

	const { thainowSignin } = useSignin();

	const [signinChannel, setSigninChannel] = useState(EMAIL_PROP);

	const title = (
		<div className="w-100 text-center">
			<div className="fs-2">
				{" "}
				Sign in to your <span style={{ color: "#E94833" }}>ThaiNow</span>{" "}
				Accounst
			</div>
		</div>
	);

	const loginPrompt = (
		<>
			<div className="text-center tedkvn-center">
				Don't have an account?{" "}
				<Button type="link" onClick={() => navigate("/register/user")}>
					Register Now
				</Button>
			</div>
		</>
	);

	const thirdPartySigninOptions = (
		<Space
			direction="horizontal"
			className="mx-4"
			size={40}
			wrap
			align="center"
		>
			{useFacebookAccess()}
			{useGoogleAccess()}
			{useAppleAccess()}
		</Space>
	);

	const email = useEmail({}, { autoFocus: true });
	const phone = usePhone({}, { autoFocus: true });
	const password = usePassword({
		extra: (
			<Button
				type="link"
				className="px-0 mt-1"
				onClick={() => alert("Coming soon")}
			>
				Forgot password
			</Button>
		),
	});

	const signInTabChildren = (
		<>
			{signinChannel === EMAIL_PROP && email}
			{signinChannel === PHONE_PROP && phone}
			{password}
			<Form.Item>
				<Button type="primary" htmlType="submit" block disabled={signing}>
					Sign In
				</Button>
			</Form.Item>
		</>
	);

	const signInTabs = (
		// <Space className="w-100">
		<Tabs
			className=" px-2 px-md-5"
			centered
			defaultActiveKey={signinChannel}
			onTabClick={(key) => setSigninChannel(key)}
			items={[
				{
					label: (
						<div
							className={`${
								signinChannel === EMAIL_PROP && "bg-white"
							} text-center p-2 px-3 px-lg-5`}
						>
							Email Address
						</div>
					),
					// style: { padding: "20rem !important" },
					key: EMAIL_PROP,
					children: signInTabChildren,
				},
				{
					label: (
						<div
							className={`${
								signinChannel === PHONE_PROP && "bg-white"
							} text-center p-2 px-3 px-lg-5`}
						>
							Phone Number
						</div>
					),
					key: PHONE_PROP,
					children: signInTabChildren,
				},
			]}
		/>
		// </Space>
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
			/>
			{signInTabChildren}
		</>
	);

	const app = (
		<Stack className="py-5 tedkvn-center mx-4 overflow-auto">
			<Form
				form={form}
				onFinish={onFinish}
				layout="vertical"
				className="mx-2 mx-xl-5"
				autoComplete="off"
			>
				<Space direction="vertical" size={20} style={{ whiteSpace: "normal" }}>
					{title}
					{loginPrompt}
					<Divider orientation="left">Continue with</Divider>
					{thirdPartySigninOptions}
					<Divider>OR</Divider>
					{/* {signInTabs} */}
					{signinSection}
				</Space>
			</Form>
		</Stack>
	);

	return app;
}

export default UserSignin;
