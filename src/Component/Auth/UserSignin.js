import { Button, Divider, Form, Segmented, Space } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EMAIL_PROP, PASSWORD_PROP, PHONE_PROP } from "../../Util/ConstVar";
import useEmail from "../Hook/FormHook/useEmail";
import usePassword from "../Hook/FormHook/usePassword";
import usePhone from "../Hook/FormHook/usePhone";
import useAppleAccess from "../Hook/ThirdPartyHook/useAppleAccess";
import useGoogleAccess from "../Hook/ThirdPartyHook/useGoogleAccess";
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
		<>
			<Divider orientation="left">Continue with </Divider>
			<Space
				direction="horizontal"
				className="mx-2 tedkvn-center"
				size={20}
				wrap
				align="center"
			>
				{/* {useFacebookAccess()} */}
				{useAppleAccess()}
				{useGoogleAccess()}
			</Space>
		</>
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
				<Space
					direction="vertical"
					size={20}
					className="px-2"
					style={{ whiteSpace: "normal" }}
				>
					{title}
					{loginPrompt}

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
