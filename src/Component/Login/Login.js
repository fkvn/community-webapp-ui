import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container, Col, Row, Form } from "react-bootstrap";
import ReactLoading from "react-loading";

import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import EmailFormControl from "../Form/FormControl/EmailFormControl";
import PhoneFormControl from "../Form/FormControl/PhoneFormControl";
import PasswordFormControl from "../Form/FormControl/PasswordFormControl";
import { useNavigate } from "react-router-dom";
import NavBrand from "../Navbar/NavBrand";
import AgreementFormControl from "../Form/FormControl/AgreementFormControl";

function Login({ formatFrames = false, signInHandler = () => {} }) {
	// ==================== config =====================

	const navigate = useNavigate();

	const [loginOption, setLoginOption] = useState("email");

	const [isLoading, setLoading] = useState(false);

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

	const emailRef = React.createRef(null);

	const [emailWarningMessage, setEmailWarningMessage] = useState("");

	const phoneRef = React.createRef(null);

	const [phoneWarningMessage, setPhoneWarningMessage] = useState("");

	const passwordRef = React.createRef(null);

	// ==================== function =====================

	const getEmailWarningMessage = (warningMessage) => {
		setEmailWarningMessage(warningMessage);
	};

	const getPhoneWarningMessage = (warningMessage) => {
		setPhoneWarningMessage(warningMessage);
	};

	const submitHandler = (event) => {
		setLoading(true);

		const signIn = {
			channel: loginOption,
			email: loginOption === "email" ? emailRef?.current?.value : "",
			phone: loginOption === "phone" ? phoneRef?.current?.value : "",
			password: passwordRef?.current?.value,
		};

		signInHandler(signIn).then((success) => {
			if (success) navigate(-1);
			else setLoading(false);
		});

		event.preventDefault();
	};

	// ==================== component =====================

	const loginFormIntro = (
		<Form.Group className="mb-4 text-center">
			<Form.Label htmlFor="emailFormControl" className="fs-1 m-0 fw-bold">
				Login
			</Form.Label>
			<Container className="tedkvn-center p-0 " fluid>
				New To ThaiNow?{" "}
				<Button
					variant="link"
					href="/signup"
					className="px-1 px-sm-0 mx-md-2 d-inline-block"
				>
					Sign Up
				</Button>
			</Container>
		</Form.Group>
	);

	const emailFormControl = (
		<EmailFormControl
			id="login-emailFormControl"
			ref={emailRef}
			withLabel={false}
			autoFocus={loginOption === "email" ? true : false}
			displayWaningMessage={false}
			getWarningMessage={getEmailWarningMessage}
		/>
	);

	const phoneFormControl = (
		<PhoneFormControl
			id="login-phoneFormControl"
			ref={phoneRef}
			withLabel={false}
			autoFocus={loginOption === "phone" ? true : false}
			displayWaningMessage={false}
			getWarningMessage={getPhoneWarningMessage}
		/>
	);

	const loginFormInfoOption = (
		<Dropdown as={ButtonGroup} className="d-inline mx-2">
			<Dropdown.Toggle
				id="loginOption"
				variant={`${formatFrames ? "primary" : "secondary"} `}
				className="px-md-4"
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
			<Form.Label
				{...(loginOption === "email"
					? { htmlFor: "login-emailFormControl" }
					: { htmlFor: "login-phoneFormControl" })}
				className="fs-5 tedkvn-required"
			>
				Email or Phone
			</Form.Label>

			<InputGroup className="mb-3 mx-0">
				{loginOption === "email" ? emailFormControl : ""}
				{loginOption === "phone" ? phoneFormControl : ""}
				{loginFormInfoOption}
			</InputGroup>

			{loginOption === "email" && emailWarningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">{emailWarningMessage}</span>
				</Form.Text>
			)}

			{loginOption === "phone" && phoneWarningMessage && (
				<Form.Text className="text-muted">
					<span className="text-danger">{phoneWarningMessage}</span>
				</Form.Text>
			)}
		</Form.Group>
	);

	const passwordFormControl = (
		<Form.Group className="mb-3">
			<PasswordFormControl
				id="login-passwordFormControl"
				ref={passwordRef}
				autoComplete={false}
				displayWaningMessage={false}
			/>
		</Form.Group>
	);

	const agreeCheckBox = <AgreementFormControl />;

	const submitButton = (
		<Form.Group className="tedkvn-center">
			<Button
				size="md"
				className="w-50 mt-4 mx-5 p-2 rounded-pill"
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
				className="w-100 mt-2 fs-5 text-dark rounded-pill"
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
		<Form onSubmit={submitHandler} id="loginFormControl">
			{loginFormIntro}

			{loginFormInfoControl}

			{passwordFormControl}

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
			<Row
				className={`${
					formatFrames ? "bg-primary" : ""
				} mt-md-5 tedkvn-center mx-2 mx-md-0`}
			>
				<Col
					xs={12}
					className={`${
						formatFrames ? "bg-danger " : ""
					}  overflow-auto border`}
					id="loginFormCol"
				>
					{backButton}
					<div className="text-center mb-4">
						<NavBrand src={thainowLogo} width="100" />
					</div>
					<div className="tedkvn-center">{loginForm}</div>
				</Col>
			</Row>
		</Container>
	);

	// ==================== render =====================

	return app;
}

export default Login;
