import React from "react";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { ButtonGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container, Col, Row, Form } from "react-bootstrap";

function Login({ formatFrames = false }) {
	const [loginRequest, setLoginRequest] = useState({
		loginOption: "email",
	});

	const [emailError, setEmailError] = useState({
		isValid: false,
		message: "You have enetered an invalid emaill address. Please try again.",
	});

	const emailRef = React.createRef();

	const loginFormIntro = (
		<Form.Group className="mb-5 text-center">
			<Form.Label htmlFor="emailFormIntro" className="fs-1 m-0">
				Login
			</Form.Label>
			<Container className="tedkvn-center">
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
			onClickHanlder: () => {
				setLoginRequest({ ...loginRequest, loginOption: "email" });
				console.log(emailRef.current.value);
			},
		},
		{
			title: "Phone",
			onClickHanlder: () =>
				setLoginRequest({ ...loginRequest, loginOption: "phone" }),
		},
	];

	const emailFormControl = (
		<FormControl
			id="emailFormIntro"
			type="email"
			placeholder="Enter email"
			className="p-3"
			ref={emailRef}
		/>
	);

	const loginFormInfoOption = (
		<Dropdown as={ButtonGroup} className="d-inline mx-2">
			<Dropdown.Toggle
				id="loginOption"
				variant={`${formatFrames ? "primary" : "secondary"} `}
				className="px-4"
			>
				{loginRequest.loginOption.toUpperCase()}
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
			{loginRequest.loginOption === "email" && (
				<Form.Label htmlFor="emailFormIntro" className="fs-5">
					Email or Phone
				</Form.Label>
			)}

			{loginRequest.loginOption === "phone" && (
				<Form.Label htmlFor="phoneFormIntro" className="fs-5">
					Email or Phone
				</Form.Label>
			)}

			<InputGroup className="mb-3 mx-0">
				{loginRequest.loginOption === "email" ? emailFormControl : ""}

				{loginFormInfoOption}
			</InputGroup>

			<Form.Text className="text-muted">
				{emailError.isValid &&
					emailRef.current &&
					emailRef.current.value.length > 0 && (
						<span className="text-success">{emailError.message}</span>
					)}

				{emailError.isValid &&
					emailRef.current &&
					emailRef.current.value.length > 0 && (
						<span className="text-danger">{emailError.message}</span>
					)}
			</Form.Text>
		</Form.Group>
	);

	const loginForm = (
		<Form>
			{loginFormIntro} {loginFormInfoControl}
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
					{loginForm}
				</Col>
			</Row>
		</Container>
	);

	return app;
}

export default Login;
