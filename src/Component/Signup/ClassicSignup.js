import React from "react";
import { useState } from "react";
import { Row } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import thainowLogo from "../../Assest/Image/Brand/thainowLogo.png";
import GoogleAutoComplete from "../AutoComplete/GoogleAutoComplete";
import EmailFormControl from "../Form/EmailFormControl";
import PhoneFormControl from "../Form/PhoneFormControl";

function ClassicSignup({ formatFrames = false }) {
	const navigate = useNavigate();

	const backButton = (
		<Button
			size="md"
			variant="link"
			style={{ position: "relative", top: "5px", left: "0" }}
			className="fs-5 text-decoration-none p-0"
			onClick={() => navigate("/signup")}
		>
			Back
		</Button>
	);

	const businessRegisterButton = (
		<Button
			size="md"
			variant="link"
			style={{ position: "relative", top: "5px" }}
			className="fs-5 text-decoration-none p-0 text-success float-end"
			onClick={() => navigate("/signup/business")}
		>
			Business Register
		</Button>
	);

	const firstNameRef = React.createRef();
	const firstNameControl = (
		<Form.Group className="mb-3 fs-5 fw-bolder">
			<Form.Label className="tedkvn-required" htmlFor="signup-firstNameControl">
				First Name
			</Form.Label>
			<Form.Control
				id="signup-firstNameControl"
				type="text"
				placeholder="Enter your first name"
				ref={firstNameRef}
			/>
		</Form.Group>
	);

	const lastNameRef = React.createRef();
	const lastNameControl = (
		<Form.Group className="mb-3 fs-5 fw-bolder  ">
			<Form.Label className="tedkvn-required" htmlFor="signup-lastNameControl">
				Last Name
			</Form.Label>
			<Form.Control
				id="signup-lastNameControl"
				type="text"
				placeholder="Enter your last name"
				ref={lastNameRef}
			/>
		</Form.Group>
	);

	const namesControl = (
		<Row>
			<Col xs={12} md={6}>
				{firstNameControl}
			</Col>
			<Col xs={12} md={6}>
				{lastNameControl}
			</Col>
		</Row>
	);

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
		<Form.Group className="my-2 fs-5 fw-bolder  ">
			<Form.Label htmlFor="signup-emailControl" className="fs-5">
				Email
			</Form.Label>
			<EmailFormControl
				id="signup-emailControl"
				address={email.address}
				clName="p-3"
				validateEmail={validateEmail}
				required={false}
			/>
			{!email.isValid && (
				<Form.Text className="text-muted">
					<span className="text-danger">{email.message}</span>
				</Form.Text>
			)}
		</Form.Group>
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
		<Form.Group className="my-4 fs-5 fw-bolder  ">
			<Form.Label htmlFor="signup-phoneControl" className="fs-5">
				Phone
			</Form.Label>
			<PhoneFormControl
				id="signup-phoneControl"
				number={phone.number}
				validatePhone={validatePhone}
				clName="p-3"
				required={false}
			/>
			{!phone.isValid && (
				<Form.Text className="text-muted">
					<span className="text-danger">{phone.message}</span>
				</Form.Text>
			)}
		</Form.Group>
	);

	const addressFormControl = <GoogleAutoComplete />;

	const signupForm = (
		<Form>
			{namesControl}
			{emailFormControl}
			{phoneFormControl}
			{addressFormControl}
		</Form>
	);

	const app = (
		<Container
			fluid
			className={`${formatFrames ? "bg-success " : ""} vh-100 tedkvn-center `}
		>
			<Row className={`${formatFrames ? "bg-primary" : ""}  tedkvn-center `}>
				<Col
					xs={12}
					className={`${formatFrames ? "bg-danger " : ""} overflow-auto border`}
					id="classicSignupFormCol"
					style={{
						maxHeight: "80vh",
					}}
				>
					{backButton}
					{businessRegisterButton}
					<div className="text-center m-5">
						<Image src={thainowLogo} width="100" />
					</div>
					{signupForm}
				</Col>
			</Row>
		</Container>
	);

	return app;
}

export default ClassicSignup;
