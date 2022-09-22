import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { Alert, Button, Divider, Form, Input, Space, Spin } from "antd";
import { useState } from "react";
import { Stack } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { EMAIL_PROP, PHONE_PROP } from "../../Util/ConstVar";
import AgreementFormControl from "../Form/FormControl/AgreementFormControl";
import useSendVerifyCode from "../Hook/useTwilio";

function UserSignup({ stepHandlers = [], onSelectVerifyMethod = () => {} }) {
	const navigate = useNavigate();
	const location = useLocation();
	const [form] = Form.useForm();
	const [verifyInfo, setVerifyInfo] = useState({
		channel: "",
		sendingCode: false,
		sentCode: true,
		verifyAndRegister: false,
	});

	const { sendVerifyCode } = useSendVerifyCode();

	// const id = "userSignup";

	// const FormBody = {
	// 	id: id,
	// 	FormComponent: UserSignupFormBody,
	// 	onSelectVerifyMethod: onSelectVerifyMethod,
	// };

	// const app = FormContainer({
	// 	id: id,
	// 	body: FormBody,
	// 	stepHandlers: stepHandlers,
	// });

	const [step, setStep] = useState(1);

	const title = (
		<div className="w-100 text-center">
			<div className="fs-3">
				{" "}
				Create a <span style={{ color: "#E94833" }}>ThaiNow</span> Account
			</div>
		</div>
	);

	const loginPrompt = (
		<>
			<div className="text-center tedkvn-center">
				Already have an account?{" "}
				<Button
					type="link"
					onClick={() =>
						navigate("/signin", {
							state: {
								continue: location.state?.continue || "",
							},
						})
					}
				>
					Sign In
				</Button>
			</div>
		</>
	);

	const thirdpartyRegisterOptions = [
		{
			title: "Facebook",
			icon: (
				<svg
					width="1.5rem"
					viewBox="0 0 32 33"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="16" cy="16.5" r="14" fill="#0C82EE" />
					<path
						d="M21.2137 20.7816L21.8356 16.8301H17.9452V14.267C17.9452 13.1857 18.4877 12.1311 20.2302 12.1311H22V8.76699C22 8.76699 20.3945 8.5 18.8603 8.5C15.6548 8.5 13.5617 10.3929 13.5617 13.8184V16.8301H10V20.7816H13.5617V30.3345C14.2767 30.444 15.0082 30.5 15.7534 30.5C16.4986 30.5 17.2302 30.444 17.9452 30.3345V20.7816H21.2137Z"
						fill="white"
					/>
				</svg>
			),
		},
		{
			title: "Google",
			icon: (
				<svg
					width="1.5rem"
					viewBox="0 0 24 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M22.5045 12.7326C22.5045 11.8693 22.433 11.2393 22.2783 10.5859H12.2188V14.4826H18.1235C18.0045 15.4509 17.3616 16.9093 15.933 17.8892L15.913 18.0197L19.0936 20.4344L19.314 20.4559C21.3377 18.6242 22.5045 15.9292 22.5045 12.7326Z"
						fill="#4285F4"
					/>
					<path
						d="M12.212 23.0015C15.1048 23.0015 17.5334 22.0682 19.3072 20.4582L15.9263 17.8914C15.0215 18.5098 13.8072 18.9414 12.212 18.9414C9.37874 18.9414 6.974 17.1098 6.11678 14.5781L5.99113 14.5886L2.68388 17.0969L2.64062 17.2148C4.4025 20.6448 8.02155 23.0015 12.212 23.0015Z"
						fill="#34A853"
					/>
					<path
						d="M6.119 14.5755C5.89281 13.9222 5.76191 13.2221 5.76191 12.4988C5.76191 11.7754 5.89281 11.0755 6.1071 10.4221L6.10111 10.283L2.75239 7.73438L2.64283 7.78545C1.91667 9.2088 1.5 10.8072 1.5 12.4988C1.5 14.1905 1.91667 15.7888 2.64283 17.2121L6.119 14.5755Z"
						fill="#FBBC05"
					/>
					<path
						d="M12.2121 6.05997C14.224 6.05997 15.5811 6.91163 16.3549 7.62335L19.3787 4.73C17.5216 3.03834 15.1049 2 12.2121 2C8.02158 2 4.40251 4.35665 2.64062 7.78662L6.1049 10.4233C6.97403 7.89166 9.37878 6.05997 12.2121 6.05997Z"
						fill="#EB4335"
					/>
				</svg>
			),
		},
		{
			title: "Apple",
			icon: (
				<svg
					width="1.5rem"
					viewBox="0 0 28 29"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M28 14.5C28 22.228 21.735 28.5 14 28.5C6.265 28.5 0 22.228 0 14.5C0 6.765 6.265 0.5 14 0.5C21.735 0.5 28 6.765 28 14.5Z"
						fill="#333333"
					/>
					<path
						d="M20.5621 10.9574C20.4857 11.002 18.6671 11.9425 18.6671 14.0279C18.7528 16.4061 20.9621 17.2401 21 17.2401C20.9621 17.2847 20.6665 18.3763 19.7907 19.5205C19.0956 20.5062 18.3242 21.5 17.1528 21.5C16.0385 21.5 15.6385 20.8431 14.3528 20.8431C12.972 20.8431 12.5813 21.5 11.5242 21.5C10.3528 21.5 9.52419 20.453 8.79127 19.4766C7.8391 18.1986 7.02978 16.1931 7.00121 14.2675C6.98195 13.2471 7.19189 12.244 7.72481 11.3921C8.47699 10.2026 9.81985 9.39524 11.2863 9.36862C12.4099 9.33331 13.4099 10.0875 14.0956 10.0875C14.7528 10.0875 15.9814 9.36862 17.3714 9.36862C17.9714 9.36919 19.5714 9.53762 20.5621 10.9574ZM14.0006 9.16488C13.8006 8.23303 14.3528 7.30119 14.8671 6.70677C15.5242 5.98792 16.5621 5.5 17.4571 5.5C17.5143 6.43185 17.1522 7.34575 16.505 8.01136C15.9242 8.73021 14.9242 9.27138 14.0006 9.16488Z"
						fill="white"
					/>
				</svg>
			),
		},
	];

	const onFinish = () => {
		console.log("submitting");
	};

	const renderStep1 = (
		<>
			{loginPrompt}
			<Divider orientation="left">Register with</Divider>
			<Space
				direction="horizontal"
				className="mx-4"
				size={40}
				wrap
				align="center"
			>
				{thirdpartyRegisterOptions.map((icon, idx) => (
					<Button
						type="ghost"
						className=" tedkvn-center text-center bg-white p-3"
						shape="round"
						icon={icon.icon}
						key={idx}
						size="large"
						style={{ lineHeight: "5rem" }}
					>
						<div className="d-none d-md-block mx-2">{icon.title}</div>
					</Button>
				))}
			</Space>
			<Divider>OR ThaiNow Account </Divider>

			<Form.Item
				name="preferred name"
				label="What should we call you?"
				rules={[{ required: true, message: "Preferred Name is required" }]}
			>
				<Input placeholder="Preferred Name" />
			</Form.Item>
			<Form.Item
				label="Password"
				name="password"
				rules={[
					{ required: true, message: "Please input your password!" },
					{
						pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,20}$/,
						message:
							"Use 8 to 20 characters with 1 uppercase, 1 lowercase, and 1 number ",
					},
				]}
				hasFeedback={true}
				shouldUpdate
			>
				<Input.Password />
			</Form.Item>

			<AgreementFormControl />

			<Form.Item className="my-2">
				<Button
					type="primary"
					onClick={() =>
						form
							.validateFields(["preferred name", "password", "agreement"])
							.then(() => setStep(2))
							.catch(() => new AbortController())
					}
					block
				>
					Register
				</Button>
			</Form.Item>
		</>
	);

	const step2Prompt = (
		<div className="text-center">
			Congratulations, <strong>{form.getFieldValue("preferred name")}</strong>.
			You're almost done
		</div>
	);

	const verifyOptions = (
		<>
			<p className="fw-bold my-4">
				Let's verify your identity to protect a healthy community
			</p>
			<Form.Item className="my-2">
				<Button
					shape="round"
					icon={<MailOutlined />}
					block
					onClick={() => setVerifyInfo({ ...verifyInfo, channel: EMAIL_PROP })}
				>
					Email Verification
				</Button>
			</Form.Item>
			<Form.Item className="my-2">
				<Button
					shape="round"
					icon={<MessageOutlined />}
					className=""
					block
					onClick={() => setVerifyInfo({ ...verifyInfo, channel: PHONE_PROP })}
				>
					SMS Verification
				</Button>
			</Form.Item>
			<Form.Item className="my-2">
				<Button
					shape="round"
					className="bg-secondary text-white"
					block
					onClick={() => setStep(1)}
				>
					Go Back
				</Button>
			</Form.Item>
		</>
	);

	const sendingOTPCode = (
		<>
			{verifyInfo.channel === EMAIL_PROP && (
				<>
					<Form.Item
						name="email"
						label="Email Address"
						className="m-0"
						rules={[
							{
								type: "email",
								message: "The input is not valid E-mail!",
							},
							{
								required: true,
								message: "Please input your E-mail!",
							},
						]}
					>
						<Input />
					</Form.Item>
					<Button
						type="link"
						className="p-0 m-0"
						onClick={() => {
							setVerifyInfo({ ...verifyInfo, channel: "", sendingCode: false });
						}}
					>
						Verify by SMS instead
					</Button>
					<Form.Item className="my-2">
						<Button
							type="primary"
							shape="round"
							disabled={verifyInfo.sendingCode}
							block
							onClick={() => {
								setVerifyInfo({ ...verifyInfo, sendingCode: true });

								form.validateFields().then(() => {
									console.log(
										sendVerifyCode(EMAIL_PROP, form.getFieldValue("email"))
											.then(() => {
												setVerifyInfo({
													...verifyInfo,
													sentCode: true,
													sendingCode: false,
												});
											})
											.catch(() =>
												setVerifyInfo({ ...verifyInfo, sendingCode: false })
											)
									);
								});

								// sendVerifyCode(EMAIL_PROP, form.getFieldValue("email"))
								// 	.then(() => {
								// 		console.log("code was sent!");
								// 	})
								// 	.catch(() => {
								// 		console.log("errossr");
								// 		setVerifyInfo({ ...verifyInfo, sendingCode: false });
								// 	});
							}}
						>
							Send Verifycation Code
						</Button>
					</Form.Item>
				</>
			)}
		</>
	);

	const renderStep2 = (
		<>
			{step2Prompt}
			<Space direction="vertical" className="my-2 px-3 w-100">
				{verifyInfo.channel === "" && verifyOptions}
				{(verifyInfo.channel === EMAIL_PROP ||
					verifyInfo.channel === PHONE_PROP) &&
					!verifyInfo.sentCode &&
					sendingOTPCode}
			</Space>
		</>
	);

	const app = (
		<Stack className="py-5  tedkvn-center mx-4">
			<Form
				form={form}
				layout="vertical"
				className="mx-2 mx-xl-5"
				onFinish={onFinish}
				autoComplete="off"
			>
				<Space direction="vertical" size={20}>
					{title}
					{step === 1 ? (
						renderStep1
					) : step === 2 ? (
						renderStep2
					) : (
						<Spin size="large">
							<Alert
								message="Register process is loading"
								description="If the process is taking too long, please try it again later or contact ThaiNow customer service."
								type="info"
							/>{" "}
						</Spin>
					)}
				</Space>
			</Form>
		</Stack>
	);

	return app;
}

export default UserSignup;
