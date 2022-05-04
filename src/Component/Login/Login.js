import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container, Col, Row, Form } from "react-bootstrap";
import { Image } from "react-bootstrap";
import ReactLoading from "react-loading";

import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import EmailFormControl from "../Form/EmailFormControl";
import PhoneFormControl from "../Form/PhoneFormControl";
import PasswordFormControl from "../Form/PasswordFormControl";
import { useNavigate } from "react-router-dom";

function Login({ formatFrames = false, signInHandler = () => {} }) {
	const navigate = useNavigate();

	const [loginOption, setLoginOption] = useState("email");

	const [isLoading, setLoading] = useState(false);

	const submitHandler = (event) => {
		setLoading(true);

		const signIn = {
			channel: loginOption,
			email: loginOption === "email" ? email.address : "",
			phone: loginOption === "phone" ? phone.number : "",
			password: password.value,
		};

		signInHandler(signIn).then(([success, prevRoute]) => {
			if (success) navigate(prevRoute, { replace: true });
			else setLoading(false);
		});

		event.preventDefault();
	};

	const loginFormIntro = (
		<Form.Group className="mb-5 text-center">
			<Form.Label htmlFor="emailFormControl" className="fs-1 m-0 fw-bold">
				Login
			</Form.Label>
			<Container className="tedkvn-center my-3">
				New To ThaiNow?{" "}
				<Button
					variant="link"
					href="/signup"
					className="p-0 mx-2 d-inline-block"
				>
					Sign Up
				</Button>
			</Container>
		</Form.Group>
	);

	const loginOptions = [
		{
			title: "Email",
			onClickHanlder: () => setLoginOption("email"),
		},
		{
			title: "Phone",
			onClickHanlder: () => setLoginOption("phone"),
		},
	];

	const [email, setEmail] = useState({
		address: "",
		isValid: true,
		message: "",
	});

	const validateEmail = ([address, validFormat]) => {
		if (validFormat) {
			setEmail({ address: address, isValid: true, message: "" });
		} else
			setEmail({
				address: address,
				isValid: false,
				message: "Sorry, your email address is invalid.",
			});
	};

	const emailFormControl = (
		<EmailFormControl
			address={email.address}
			clName="p-3"
			validateEmail={validateEmail}
		/>
	);

	const [phone, setPhone] = useState({
		number: "",
		isValid: true,
		message: "",
	});

	const validatePhone = ([formattedPhoneNumber, numOfDigits]) => {
		if (numOfDigits === 0 || numOfDigits === 10) {
			setPhone({
				number: formattedPhoneNumber,
				isValid: true,
				message: "",
			});
		} else if (numOfDigits < 10) {
			setPhone({
				number: formattedPhoneNumber,
				isValid: false,
				message: "Sorry, Invalid Phone Number.",
			});
		}
	};

	const phoneFormControl = (
		<PhoneFormControl
			number={phone.number}
			validatePhone={validatePhone}
			clName="p-3"
		/>
	);

	const loginFormInfoOption = (
		<Dropdown as={ButtonGroup} className="d-inline mx-2">
			<Dropdown.Toggle
				id="loginOption"
				variant={`${formatFrames ? "primary" : "secondary"} `}
				className="px-4"
			>
				{loginOption.toUpperCase()}
			</Dropdown.Toggle>

			{loginOptions.length > 0 && (
				<Dropdown.Menu
					id="login-option-dropdown-button-menu"
					align="end"
					className="rounded-3 text-center"
					flip={true}
				>
					{loginOptions.map((opt, idx) => (
						<Dropdown.Item key={idx} onClick={opt.onClickHanlder} className="">
							{opt.title}
						</Dropdown.Item>
					))}
				</Dropdown.Menu>
			)}
		</Dropdown>
	);

	const loginFormInfoControl = (
		<Form.Group className="mb-3">
			{loginOption === "email" && (
				<Form.Label htmlFor="emailFormIntro" className="fs-5 tedkvn-required">
					Email or Phone
				</Form.Label>
			)}

			{loginOption === "phone" && (
				<Form.Label htmlFor="phoneFormIntro" className="fs-5 tedkvn-required">
					Email or Phone
				</Form.Label>
			)}

			<InputGroup className="mb-3 mx-0">
				{loginOption === "email" ? emailFormControl : ""}
				{loginOption === "phone" ? phoneFormControl : ""}
				{loginFormInfoOption}
			</InputGroup>

			<Form.Text className="text-muted">
				{loginOption === "email" && !email.isValid && (
					<span className="text-danger">{email.message}</span>
				)}
			</Form.Text>

			<Form.Text className="text-muted">
				{loginOption === "phone" && !phone.isValid && (
					<span className="text-danger">{phone.message}</span>
				)}
			</Form.Text>
		</Form.Group>
	);

	const [password, setPassword] = useState({
		value: "",
		isValid: true,
		message: "",
		visibility: false,
	});

	const validatePassword = ([password, isValid]) => {
		setPassword({
			value: password,
			isValid: isValid,
			message: isValid
				? ""
				: "Your password must be between 8 and 20 characters (at least 1 upper, 1 lower, 1 number, and no white space).",
		});
	};

	const passwordFormControl = (
		<PasswordFormControl
			value={password.value}
			clName="p-3"
			validatePassword={validatePassword}
		/>
	);

	const passwordFormInfoControl = (
		<Form.Group className="mb-3">
			<Form.Label
				htmlFor="passwordFormControl"
				className="fs-5 tedkvn-required"
			>
				Password
			</Form.Label>

			{passwordFormControl}

			<Form.Text className="text-muted">
				{!password.isValid && (
					<span className="text-danger">{password.message}</span>
				)}
			</Form.Text>
		</Form.Group>
	);

	const agreeCheckBox = (
		<Form.Check
			type="checkbox"
			label={
				<>
					By continuing, you agree to ThaiNow's{" "}
					<a
						href="https://terms.thainowapp.com/"
						target="_blank"
						className="text-decoration-none"
					>
						Terms of Service
					</a>{" "}
					and{" "}
					<a
						href="https://policy.thainowapp.com/"
						target="_blank"
						className="text-decoration-none"
					>
						Privacy Policy
					</a>
				</>
			}
			defaultChecked="true"
			required
			className="pt-3"
		/>
	);

	const submitButton = (
		<Form.Group className="tedkvn-center">
			<Button
				size="md"
				className="w-100 mt-5 mx-5 p-3 rounded-pill"
				type="submit"
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						Login{" "}
						<ReactLoading
							type="spin"
							color="#ffffff"
							height={"5%"}
							width={"5%"}
							className="d-inline-block"
						/>{" "}
					</>
				) : (
					"Login"
				)}
			</Button>
		</Form.Group>
	);

	const forgetPasswordButton = (
		<Form.Group className="tedkvn-center">
			<Button
				size="md"
				className="w-100 mt-4 fs-5 text-dark rounded-pill"
				variant="link"
			>
				Forget Password
			</Button>
		</Form.Group>
	);

	const backButton = (
		<Button
			size="md"
			variant="link"
			style={{ position: "relative", top: "5px", left: "0" }}
			className="fs-5 text-decoration-none p-0"
			href="/"
		>
			Back
		</Button>
	);

	const loginForm = (
		<Form onSubmit={submitHandler}>
			{loginFormIntro}

			{loginFormInfoControl}

			{passwordFormInfoControl}

			<Form.Text className="text-muted tedkvn-required">
				This is required field
			</Form.Text>

			{agreeCheckBox}

			{submitButton}

			{forgetPasswordButton}
		</Form>
	);

	const app = (
		<Container
			fluid
			className={`${formatFrames ? "bg-success " : ""} vh-100 tedkvn-center `}
		>
			<Row className={`${formatFrames ? "bg-primary" : ""} tedkvn-center `}>
				<Col
					xs={12}
					className={`${
						formatFrames ? "bg-danger " : ""
					}  overflow-hidden border`}
					id="loginFormCol"
				>
					{backButton}
					<div className="text-center mb-4">
						<Image src={thainowLogo} width="100" />
					</div>
					{loginForm}
				</Col>
			</Row>
		</Container>
	);

	return app;
}

export default Login;
